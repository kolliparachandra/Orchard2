(function ($) {

    $.fn.strength = function (options) {

        var settings = $.extend({
            minLength: 8,
            upperCase: false,
            lowerCase: false,
            numbers: false,
            specialchars: false,
            target: '',
            style: ''
        }, options);


        var capitalletters = 0;
        var lowerletters = 0;
        var numbers = 0;
        var specialchars = 0;

        var upperCase = new RegExp('[A-Z]');
        var lowerCase = new RegExp('[a-z]');
        var number = new RegExp('[0-9]');
        var specialchar = new RegExp('([!,%,&,@,#,$,^,*,?,_,~])');

        createProgressBar(0, '');

        function getPercentage(a, b) {
            return ((b / a) * 100).toFixed(0);
        }

        function getLevel(value) {

            if (value >= 100) {
                return "progress-success";
            }

            if (value >= 50) {
                return "progress-warning";
            }

            if (value == 0) {
                return ''; // grayed
            }

            return "progress-danger";
        }

        function checkStrength(value) {

            console.log('val: ' + value);

            minLength = value.length >= settings.minLength ? 1 : 0;
            capitalletters = !settings.upperCase || value.match(upperCase) ? 1 : 0;
            lowerletters = !settings.lowerCase || value.match(lowerCase) ? 1 : 0;
            numbers = !settings.numbers || value.match(number) ? 1 : 0;
            specialchars = !settings.specialchars || value.match(specialchar) ? 1 : 0;

            console.log({ 'capitalletter': capitalletters, 'lowerletters': lowerletters, 'numbers': numbers, 'specialchars': specialchars });

            var total = minLength + capitalletters + lowerletters + numbers + specialchars;
            var percentage = getPercentage(5, total);

            console.log({ 'total': total, 'percentage': percentage });

            createProgressBar(percentage, getLevel(percentage));
        }

        function createProgressBar(percentage, level) {
            console.log([percentage, level]);
            var el = $('<progress class="progress ' + level + '" value="' + percentage + '" style="' + settings.style + '" max="100" aria-describedby=""><div class="progress"><span class="progress-bar" style="width: ' + percentage + '%;"></span></div></progress>');
            var target = $(settings.target);
            target.empty();
            target.append(el);
        }

        this.bind('keyup keydown', function (event) {
            checkStrength($(this).val());
        });
    };
}(jQuery));
    
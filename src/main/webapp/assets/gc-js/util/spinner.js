var spinner;
    var spinnerTarget;
    var opts;
    $(function () {
        opts = {
            lines: 10, // The number of lines to draw
            length: 1, // The length of each line
            width: 15, // The line thickness
            radius: 20, // The radius of the inner circle
            scale: 1, // Scales overall size of the spinner
            corners: 1, // Corner roundness (0..1)
            color: '#0096ff', // CSS color or array of colors
            fadeColor: 'transparent', // CSS color or array of colors
            speed: 1.5, // Rounds per second
            rotate: 27, // The rotation offset
            animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
            direction: 1, // 1: clockwise, -1: counterclockwise
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            className: 'spinner', // The CSS class to assign to the spinner
            top: '50%', // Top position relative to parent
            left: '50%', // Left position relative to parent
            shadow: '0 0 1px transparent', // Box-shadow for the lines
            position: 'absolute' // Element positioning
        };
        spinnerTarget = document.getElementById('spinner');
        spinner = new Spinner(opts).spin(spinnerTarget);
        spinner.stop();
    });
    function showSpinner() {
        spinner = new Spinner(opts).spin(spinnerTarget);
        $.blockUI({message: null});
        $('div[id^="modal"]').css("z-index", "-1");
    }

    function hideSpinner() {
        spinner.stop();
        $.unblockUI();
        $('div[id^="modal"]').css("z-index", "1");
    }
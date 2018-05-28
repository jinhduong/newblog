(function () {
    fetch('https://wt-021b7f362991cec68dd62033c2455e46-0.sandbox.auth0-extend.com/index')
        .then(function (result) {
            data = result.json()
                .then(function (data) {
                    var $quote = $('<div>')
                        .addClass('box');
                    $quote.append($('<span>').text(data.text).css('display', 'block'))
                    $quote.append($('<b>').text(data.author))

                    $('section.main').prepend($quote);
                })
        });
})();
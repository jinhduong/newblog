(function () {
    fetch('https://dev-quotes.jinhduong.com')
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
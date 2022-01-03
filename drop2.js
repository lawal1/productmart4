/**
 * Created by OLUWATIMILEYIN on 1/2/2022.
 */

/**
 * Created by OLUWATIMILEYIN on 12/28/2021.
 */
$(".dropdown-trigger").dropdown();

$(document).ready(function(){
    $('input.autocomplete').autocomplete({
        data: {
            "Apple": null,
            "Microsoft": null,
            "Google": 'https://placehold.it/250x250'
        }
    });
});

$('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
});

var el = document.querySelector('.tabs');
var instance = M.Tabs.init(el, {});

$(document).ready(function() {
    $('.collapsible').collapsible();
})


$(document).ready(function(){
    $('.modal').modal();
});
(function ($) {
    $(function () {

        //initialize all modals
        $('.modal').modal();


        //or by click on trigger
        $('.trigger-modal').modal();

    }); // end of document ready
})(jQuery); // end of jQuery name space

var splide = new Splide( '.splide', {
    type   : 'loop',
    perPage: 1,
    perMove: 0
} );

splide.mount();

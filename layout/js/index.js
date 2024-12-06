
$(document).ready(function () {
    const dropDownToggleContent = $('.dropdown__item > .dropdown__toggle__content')
    const dropDownItem = $('.dropdown__item')

    // Prepare about us dropdown items
    $(dropDownToggleContent).hide();
    // Open each first element in dropdown list
    $('.dropdown__list').each(function () {
        $(this).children('.dropdown__item').first().children('.dropdown__toggle__content').show();
    })
    // Toggle about us dropdown
    $(dropDownItem).click(function () {
        $(this).children('.dropdown__toggle__content').toggle('slow');
        $(this).children('.dropdown__item__details').children('.dropdown__item__logo').toggleClass('active')
    })

    const swiper = new Swiper('.gallery__slider', {
        direction: 'horizontal',
        spaceBetween: 35,
        loop: true,
        navigation: {
            nextEl: '.gallery__next__button',
            prevEl: '.gallery__prev__button',
          },
        autoplay: {
            delay: 5000,
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                centeredSlides: true,
            },
            960: {
                slidesPerView: 3,
                centeredSlides: true,
            },
            1140: {
                slidesPerView: 3,
            },
          }
    });
    // Swiper popup image preview
    $('.swiper-wrapper').magnificPopup({gallery: {enabled: true}, delegate: "a", type:'image'});
    // About us thumbnail image preview
    $('.about__us__thumbnail').magnificPopup({type:'image'});
})



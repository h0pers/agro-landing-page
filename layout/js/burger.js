

$(document).ready(function () {
    $('.burger').click(function () {
        $(this).toggleClass("active")
        $('.burger__menu').toggleClass("active")
    })
})
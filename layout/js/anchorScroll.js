$('a[href^="#"]').click(function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    if ($(this).parent('.navbar')) {
        const navbar = $('.navbar')
        $(navbar).find('.burger__menu').removeClass('active');
        $(navbar).find('.burger').removeClass('active');
    }
    $('html, body').animate({
        scrollTop:$(href).offset().top - 100
    },'slow');
});
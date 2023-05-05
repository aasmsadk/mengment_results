function printbox()
{
    $('.printbox').click(function() {
        if ($(this).is('a'))
        {
            $($(this).attr('href')).printArea();
        }
    });
}
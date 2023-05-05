function allmediabox()
{
  if (!($.browser.msie && parseFloat($.browser.version) < 9) && !($.browser.safari && parseFloat($.browser.version) < 4) && !($.browser.firefox && parseFloat($.browser.version) < 4) && !($.browser.opera && parseFloat($.browser.version) < 10))
  {
    $('video,audio').each(function () {
      if (!$(this).parent().hasClass('showAsDialog'))
      {
        $(this).mediaelementplayer();
      }
    });
  }
  $('a.fancybox').fancybox({
    beforeShow: function ()
    {
      if (!($.browser.msie && parseFloat($.browser.version) < 9) && !($.browser.safari && parseFloat($.browser.version) < 4) && !($.browser.firefox && parseFloat($.browser.version) < 4) && !($.browser.opera && parseFloat($.browser.version) < 10))
      {
        $('.fancybox-inner video,fancybox-inner audio').mediaelementplayer();
      }
    }
  });
}

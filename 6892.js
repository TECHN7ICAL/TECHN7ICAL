function destory() {
    $('html')['html']('عفواً ، لن يمكنك إستخدام الموقع .. هذا التوقف يحدث تلقائياً بعد العبث بحقوق ملكية التصميم ');
    setTimeout(function () {
        window['location']['assign']('https://wdbloog.blogspot.com')
    }, 5000)
}
function redirect() {
    $('html')['html']('نأسف ولكن لا تملك رخصة إستخدام هذا القالب تواصل ما صاحب القالب <a href=\https://wdbloog.blogspot.com\>من هنا</a> للحصول على تفعيل القالب');
    setTimeout(function () {
        window['location']['assign']('https://wdbloog.blogspot.com')
    }, 2000e3)
}
var Loct = window['location']['hostname']['toLowerCase']();
var Link = window['location']['href']['toLowerCase']();
var Cont = '';
var Cont2 = '';
  Cont += '<a href=\'https://wdbloog.blogspot.com\' target=\'_blank\'>تصميم : عالم المدون</a>';
if ($('#powered')['length'] !== 0) {
    if (Loct['indexOf']('xfost') != -1) {
        $('#powered')['addClass']('impo')['append'](Cont2)
    } else {
        $('#powered')['addClass']('impo')['append'](Cont)
    };
    $('footer')['addClass']('impo');
    setInterval(function () {
        $('.impo')['each'](function () {
            if ($(this)['css']('opacity') < 1 || $(this)['css']('visibility') == 'hidden' || $(this)['is'](':hidden')) {
                destory()
            }
        })
    }, 5000)
} else {
    destory()
};
if (Link['indexOf']('post-preview') == -1 && Link['indexOf']('www.blogger') == -1 && Link['indexOf']('b/preview') == -1 && Link['indexOf']('template-editor') == -1 && Loct['indexOf']('wdbloog.blogspot.com') == -1 && Loct['indexOf']('wdbloog.blogspot.com') == -1 && Loct['indexOf']('wdbloog.blogspot.com') == -1) {
    redirect()
}

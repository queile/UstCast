function loadScript( src )
{
    var head = document.getElementsByTagName('head')[0], script = document.createElement('script');
    script.setAttribute('src', src);
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('charset', 'utf-8');
    head.insertBefore(script, head.firstChild);
}
loadScript( "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js" );
loadScript( chrome.extension.getURL('ustcast.js') );
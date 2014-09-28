var cid = $("meta[name='ustream:channel_id']").attr("content");
var session = null;
var CAST_API_INITIALIZATION_DELAY = 1000;
	window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
      if (loaded) {
        initializeCastApi();
      } else {
        console.log(errorInfo);
      }
	};
	function initializeCastApi() {
    console.log("initialize");
      var sessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
      var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
      sessionListener,
      receiverListener);
      chrome.cast.initialize(apiConfig, onInitSuccess, onError);
  }

	function sessionListener(e) {
      session = e;
      if (session.media.length !== 0) {
        onMediaDiscovered('onRequestSessionSuccess', session.media[0]);
      }
    }

	function receiverListener(e) {
      if( e === chrome.cast.ReceiverAvailability.AVAILABLE) {
      }
  }

	function onInitSuccess(){
		console.log("init success");
    addButton();
  }

	function onError(){
		console.log("on error");
	}

  function onRequestSessionSuccess(e) {
      session = e;
      loadMedia();
  }

  function onLaunchError(){
    console.log("on launch error");
  }

  function onMediaDiscovered(how, media) {
    console.log("on media odiscovered");
  }

  function onMediaError(){
    console.log("error");
  }

  function loadMedia(){
    var mediaInfo = new chrome.cast.media.MediaInfo("http://www.corsproxy.com/iphone-streaming.ustream.tv/uhls/"+cid+"/streams/live/iphone/playlist.m3u8");
      mediaInfo.contentType = 'application/x-mpegurl';
      mediaInfo.streamType = chrome.cast.media.StreamType.LIVE;
      var request = new chrome.cast.media.LoadRequest(mediaInfo);
      session.loadMedia(request,
        onMediaDiscovered.bind(this, 'loadMedia'),
        onMediaError);
  }
  function addButton(){
    console.log("add button");
    var button = $("<button>Cast</button>").click(function(){
      chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
    });
    button.appendTo(".share-buttons");
  }
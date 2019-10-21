let bgPort = browser.runtime.connect();
bgPort.onMessage.addListener(message => {
  let mk = window.wrappedJSObject.MusicKit.getInstance();
  switch (message.command) {
    case "pause":
      if (mk.isPlaying) {
        mk.pause();
      } else {
        mk.play();
      }
      break;
    case "next":
      mk.skipToNextItem();
      break;
    case "previous":
      mk.skipToPreviousItem();
      break;
    case "seekForward":
    case "seekBackward": {
      let adjustment = message.command == "seekForward" ? 5 : -5;
      let newTime = mk.currentPlaybackTime  + adjustment;
      if (newTime < 0) {
        newTime = 0;
      }
      mk.seekToTime(newTime);
      break;
    }
    case "volumeUp":
    case "volumeDown": {
      let adjustment = message.command == "volumeUp" ? 0.02 : -0.02;
      mk.volume += adjustment;
      break;
    }
  }
});

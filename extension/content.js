function playAudio(file) {
  const url = browser.runtime.getURL(file);
  const audio = new Audio(url);
  audio.play();
}

let observer = null;
const bgPort = browser.runtime.connect();
bgPort.onMessage.addListener(message => {
  if (window.location.host == "music.apple.com") {
    const mk = window.wrappedJSObject.MusicKit.getInstance();
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
  } else if (window.location.host == "meet.google.com") {
    if (message.command == "micMute") {
      const muteButton = document.querySelector("[data-is-muted]");
      if (!muteButton) {
        return;
      }
      if (!observer) {
        observer = new MutationObserver(mutations => {
          for (const mutation of mutations) {
            playAudio(mutation.target.dataset.isMuted == "true" ?
              "mute.mp3" : "unmute.mp3"
            );
          }
        });
      }
      observer.observe(muteButton, {
        attributes: true, attributeFilter: ["data-is-muted"]
      });
      muteButton.click();
    }
  } else if (window.location.host == "app.zoom.us") {
    if (message.command == "micMute") {
      const muteButton = document.querySelector(".join-audio-container__btn");
      if (!muteButton) {
        return;
      }
      if (!observer) {
        observer = new MutationObserver(mutations => {
          for (const mutation of mutations) {
            playAudio(mutation.target.querySelector(".SvgAudioMute") ? "unmute.mp3" : "mute.mp3");
          }
        });
      }
      observer.observe(muteButton, {
        attributes: true, attributeFilter: ["aria-label"]
      });
      muteButton.click();
    }
  }
});

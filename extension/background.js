let contentPort;

browser.runtime.onConnect.addListener(port => {
  contentPort = port;
});

let nativePort = browser.runtime.connectNative("net.jantrid.mediaGlobalKeys");
nativePort.onMessage.addListener(message => {
  if (contentPort) {
    contentPort.postMessage(message);
  }
});

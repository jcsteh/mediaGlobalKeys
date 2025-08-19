const contentPorts = new Set();

browser.runtime.onConnect.addListener(port => {
  contentPorts.add(port);
  port.onDisconnect.addListener(() => contentPorts.delete(port));
});

const nativePort = browser.runtime.connectNative("net.jantrid.mediaGlobalKeys");
nativePort.onMessage.addListener(message => {
  for (const contentPort of contentPorts) {
    contentPort.postMessage(message);
  }
});

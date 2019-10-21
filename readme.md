# Media Global Keys

- Author: james Teh &lt;jamie@jantrid.net&gt;
- Copyright: 2019 James Teh
- License: GNU General Public License version 2.0

Media Global keys is a Mozilla Firefox extension which allows you to control Apple Music with global shortcut keys on Windows.
You can pause/play, skip next/previous, seek forward/backward and adjust volume up/down.

## Installation
Before you install the Firefox extension, you need to build and install the native helper application.
This application listens for global keyboard shortcuts and sends them to Firefox.
The application is an [AutoHotkey](https://www.autohotkey.com/) script.

1. Install AutoHotkey if you haven't already.
2. If you wish to change the keyboard shortcuts, edit the file `native\mediaGlobalKeysNative.ahk`.
3. Compile the `native\mediaGlobalKeysNative.ahk` script.
    You can do this by browsing to the file in File Explorer, opening the context menu and choosing Compile Script.
    This will produce `mediaGlobalKeysNative.exe`.
4. In the `native` directory, run the script `install.bat`.
5. Now install the Firefox extension.

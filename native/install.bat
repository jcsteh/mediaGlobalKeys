@echo off
reg add HKEY_CURRENT_USER\SOFTWARE\Mozilla\NativeMessagingHosts\net.jantrid.mediaGlobalKeys /d %CD%\manifest.json /f
pause

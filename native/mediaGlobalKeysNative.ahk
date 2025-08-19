#NoTrayIcon
#SingleInstance Force

global stdout := FileOpen("*", "w")
stdout.Encoding := "CP0"

sendCommand(command) {
  stdout.WriteUInt(15 + StrLen(command))
  stdout.Write("{`"command`": `"")
  stdout.Write(command)
  stdout.Write("`"}")
  stdout.Read(0) ; Flush the write buffer.
}

; Win+alt+p: Play/Pause
#!p::
{
  sendCommand("pause")
  Return
}

; Win+alt+down: Next
#!Down::
{
  sendCommand("next")
  Return
}

; Win+alt+up: Previous
#!Up::
{
  sendCommand("previous")
  Return
}

; Win+alt+right: Seek forward
#!Right::
{
  sendCommand("seekForward")
  Return
}

; Win+alt+left: Seek backward
#!Left::
{
  sendCommand("seekBackward")
  Return
}

; shift+volumeUp: Volume up
+Volume_Up::
{
  sendCommand("volumeUp")
  Return
}

; shift+volumeDown: Volume down
+Volume_Down::
{
  sendCommand("volumeDown")
  Return
}

; Win+alt+m: Microphone mute
#!m::
{
  sendCommand("micMute")
  Return
}

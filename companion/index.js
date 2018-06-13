import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me } from "companion";

let KEY_FCOLOR = "myForeground";
let KEY_BCOLOR = "myBackground";
let KEY_FONT = "myFont";
let KEY_TIMEOUT = "myTimeout";

// Settings have been changed
settingsStorage.onchange = function(evt) {
  sendValue(evt.key, evt.newValue);
}

// Settings were changed while the companion was not running
if (me.launchReasons.settingsChanged) {
  // Send the value of the setting
  sendValue(KEY_FCOLOR, settingsStorage.getItem(KEY_FCOLOR));
  sendValue(KEY_BCOLOR, settingsStorage.getItem(KEY_BCOLOR));
  sendValue(KEY_FONT, settingsStorage.getItem(KEY_FONT));
  sendValue(KEY_TIMEOUT, settingsStorage.getItem(KEY_TIMEOUT));
}

function sendValue(key, val) {
  if (val) {
    sendSettingData({
      key: key,
      value: JSON.parse(val)
    });
  }
}

function sendSettingData(data) {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
}
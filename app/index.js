import { me } from "appbit";
import clock from "clock";
import document from "document";
import * as fs from "fs";
import * as messaging from "messaging";
import { preferences } from "user-settings";
import * as util from "../common/utils";

// Debug.
const debug = false;

// Load settings from the filesystem.
const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";
let settings = loadSettings();

// Key names for settings.
const KEY_FCOLOR = "myForeground";
const KEY_BCOLOR = "myBackground";
const KEY_FONT = "myFont";
const KEY_TIMEOUT = "myTimeout";

// Set default settings if new install.
if(settings[KEY_FCOLOR] == undefined) {
  settings[KEY_FCOLOR] = "black";
}
if(settings[KEY_BCOLOR] == undefined) {
  settings[KEY_BCOLOR] = "white";
}
if(settings[KEY_FONT] == undefined) {
  settings[KEY_FONT] = {"selected":[0],"values":[{"name":"SquareFace","value":"2"}]};
}
if(settings[KEY_FONT] == undefined) {
  settings[KEY_FONT] = {"selected":[0],"values":[{"name":"1 second","value":"1"}]};
}

// Update all element colours on launch.
let items = document.getElementsByClassName("foreground");
items.forEach(function(item) {
  item.style.fill = settings[KEY_FCOLOR];
});
let items = document.getElementsByClassName("background");
items.forEach(function(item) {
  item.style.fill = settings[KEY_BCOLOR];
});

// Setup screen element function to display date on click.
let hours1 = document.getElementById("hours1");
hours1.onclick = function(e) {
  displayDate();
}
let hours2 = document.getElementById("hours2");
hours2.onclick = function(e) {
  displayDate();
}
let mins1 = document.getElementById("mins1");
mins1.onclick = function(e) {
  displayDate();
}
let mins2 = document.getElementById("mins2");
mins2.onclick = function(e) {
  displayDate();
}

// Update display every minute.
clock.granularity = "minutes";

// When tick received update display.
clock.ontick = evt => {
  displayUpdate(evt);
}

// Update display.
function displayUpdate(evt) {  
  // Check if either evt or evt.date is undefined (eg: when font is changed).
  if(evt == undefined || evt.date == undefined) {
    // Get the current time.
    let d = new Date();
  } else {
    // Use the event's time.
    let d = evt.date;
  }

  // HOURS
  let hours = d.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  setHours(hours);

  // MINUTES
  let minute = ("0" + d.getMinutes()).slice(-2);
  setMins(minute);
}

// Update display with the date.
function displayDate() { 
  let d = new Date();

  // Day
  let day = d.getDate();

  // Month
  let month = d.getMonth();
  
  // Displayt the date. Hours section used for day and Minutes section for month.
  setHours(day);
  setMins(month);
  
  // Wait timeout seconds and then re-display the time.
  setTimeout(displayUpdate, settings[KEY_TIMEOUT].values[0].value * 1000);
}

function setHours(val) {
  if (val > 9) {
    drawDigit(Math.floor(val / 10), hours1);
  } else {
    drawDigit("X", hours1);
  }
  drawDigit(Math.floor(val % 10), hours2);
}

function setMins(val) {
  drawDigit(Math.floor(val / 10), mins1);
  drawDigit(Math.floor(val % 10), mins2);
}

function drawDigit(val, place) {
  if(val == "X") {
    // No digit in this place so use empty.
    place.image = "font" + settings[KEY_FONT].values[0].value + "_empty.png";
    
  } else {
    place.image = "font" + settings[KEY_FONT].values[0].value + "_" + val + ".png";
  }
}

// Received message containing settings data.
messaging.peerSocket.addEventListener("message", function(evt) {  
  // Store new settings value.
  settings[evt.data.key] = evt.data.value;
  
  if ( evt.data.key == KEY_FCOLOR ) {
    // Foreground colour changed.
    let myForeground = evt.data.value;
    
    // Update all foreground elements.
    let items = document.getElementsByClassName("foreground");
    items.forEach(function(item) {
      item.style.fill = myForeground;
    });
  } else if ( evt.data.key == KEY_BCOLOR ) {
    // Background colour changed.
    let myBackground = evt.data.value;
    
    // Update all background elements.
    let items = document.getElementsByClassName("background");
    items.forEach(function(item) {
      item.style.fill = myBackground;
    });
  } else if ( evt.data.key == KEY_FONT ) {
    // Font changed.
    let myFont = evt.data.value.values[0].value;
    
    // Update font by updating the displayed time.
    displayUpdate();
  }
})

// Register for the unload event and save settings.
me.addEventListener("unload", saveSettings);

// Load settings from filesystem.
function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    return {};
  }
}

// Save settings to the filesystem.
function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}
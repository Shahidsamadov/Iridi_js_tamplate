var VolumeDisplayModule = function(crestron, sm) {
var that = this;
this.crestron = crestron;
this.sm = sm;
this.setFinished = false;

this.popupVolume;
this.sliderH;
this.sliderV;
this.txtH;
this.txtV;

this.roomArray = [];
this.currentRoomName;
this.volumePopupTimeoutID;

this.setItems = function(popupVolume, slider, txt) {
   this.popupVolume = popupVolume;
   this.sliderH = this.popupVolume.itemH.GetItem(slider);
   this.sliderV = this.popupVolume.itemV.GetItem(slider);
   this.txtH = this.popupVolume.itemH.GetItem(txt);
   this.txtV = this.popupVolume.itemV.GetItem(txt);
}

this.addRoom = function(roomName, volFb, volUpCmd, volDownCmd, volMuteCmd) {
   var memory = 0;
   this.roomArray.push([roomName, volFb, volUpCmd, volDownCmd, volMuteCmd, memory]);   
}

this.getRoomIndex = function(roomName) {
   var index;
   for (var i=0; i<this.roomArray.length; i++) {
      if (this.roomArray[i][0] == roomName)
         index = i;      
   }
   return index;
}

this.finishSet = function() {
   this.setFinished = true;
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.crestron.device, function (name,value) {
      for (var i=0; i<that.roomArray.length; i++) {
         if (name == that.roomArray[i][1]) {
            if (that.roomArray[i][0] == that.currentRoomName) {
               that.sliderH.Value = value;
               that.sliderV.Value = value;
               that.txtH.Value = value;
               that.txtV.Value = value;
            }
            that.roomArray[i][5] = value;      
         }
      }   
   });
}

this.displayRoom = function(roomName) {
   this.currentRoomName = roomName;
   var index = this.getRoomIndex(roomName);
   this.sliderH.Value = this.roomArray[index][5];
   this.sliderV.Value = this.roomArray[index][5];
   this.txtH.Value = this.roomArray[index][5];
   this.txtV.Value = this.roomArray[index][5];  
}

this.show = function() {
   IR.ClearInterval(this.volumePopupTimeoutID);
   this.sm.openPopup(this.popupVolume);   
}

this.hide = function() {
   this.volumePopupTimeoutID = IR.SetTimeout(1000, function() {
      that.sm.closePopup(that.popupVolume);
   });
}
this.volumeUpPress = function() {
   var index = this.getRoomIndex(this.currentRoomName);
   this.crestron.press(this.roomArray[index][2]);
}
this.volumeUpRelease = function() {
   var index = this.getRoomIndex(this.currentRoomName);
   this.crestron.release(this.roomArray[index][2]);
}
this.volumeDownPress = function() {
   var index = this.getRoomIndex(this.currentRoomName);
   this.crestron.press(this.roomArray[index][3]);
}
this.volumeDownRelease = function() {
   var index = this.getRoomIndex(this.currentRoomName);
   this.crestron.release(this.roomArray[index][3]);
}
this.volumeMutePress = function() {
   var index = this.getRoomIndex(this.currentRoomName);
   this.crestron.press(this.roomArray[index][4]);
}
this.volumeMuteRelease = function() {
   var index = this.getRoomIndex(this.currentRoomName);
   this.crestron.release(this.roomArray[index][4]);
}

}
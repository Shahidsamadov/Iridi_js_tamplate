//class device
var Device = function(name, device/*mc3.device*/, room, type, cmdA, fbA) {
   var that = this;
   this.name = name;
   this.device = device;
   this.room = room;
   this.type = type; //0 - RGBW Light, 1 - DimLight, 2 - RelayLight, 3 - RGB Light, 4 - Dim Motion Lock Light, 5 - RGBW Motion Lock Light
                     //6 - ShadeRulon, 7 - ShadePulse, 8 - Fan, 9 - Socket
                     //10 - mediaRoom (FM1, FM2)
                     //11 - mediaRoom (FM1, Humax, XBMC, AppleTV)
                     //12 - mediaRoom (FM1, FM2, Humax, XBMC, AppleTV)
   this.cmdA = cmdA;
   this.fbA = fbA;
   this.isOn = false;
   
   //media specific
   this.isMute = false;
   this.isFM1On = false;
   this.isFM2On = false;
   this.isHumaxOn = false;
   this.isXBMCOn = false;
   this.isAppleTVOn = false;
   
   this.sendPulse = function(cmd, time) {
      this.device.Set(cmd, true);
      IR.SetTimeout(time, this.device.Set(cmd, false));   
   }
   
   IR.AddListener(IR.EVENT_TAG_CHANGE, device, function(name,value) {
      if (that.type < 10 && name == that.fbA[0]) {
         that.isOn = value;
         that.room.updateState();
      } else if (that.type >= 10 && (name == that.fbA[0] || name == that.fbA[1] || name == that.fbA[2] || name == that.fbA[3] || name == that.fbA[4] || name == that.fbA[5])) {
         IR.Log("DEV " + that.type + "state changed");
         if (name == that.fbA[0])
            that.isMute = value;
         if (name == that.fbA[1])
            that.isFM1On = value;
         if (name == that.fbA[2])
            that.isFM2On = value;
         if (name == that.fbA[3])
            that.isHumaxOn = value;
         if (name == that.fbA[4])
            that.isXBMCOn = value;
         if (name == that.fbA[5])
            that.isAppleTVOn = value;
         that.isOn = (that.isFM1On || that.isFM2On || that.isHumaxOn || that.isXBMCOn || that.isAppleTVOn);
         that.room.updateState();         
      }   
   });
     
}
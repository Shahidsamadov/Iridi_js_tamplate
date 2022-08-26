var Crestron = function(driverName) {
   var that = this;
   IR.Log("Crestron module started");
   this.driverName = driverName;
   this.device = IR.GetDevice(driverName);
   
   this.getConnectionStatus = function() {
      return 1; //IR.GetVariable("Drivers.Crestron.Online");
   }
   
   this.pulse = function(channel) {
      IR.Log("pulse 10 at:" + channel);
      this.device.Set(channel, 1);
      IR.SetTimeout(10, function() {
         that.device.Set(channel, 0);
      });
   }
   
   this.press = function(channel) {
      IR.Log("press at:" + channel);
      this.device.Set(channel, 1);
   }
   
   this.release = function(channel) {
      IR.Log("release at:" + channel);
      this.device.Set(channel, 0);
   }
   
   this.getValue = function(channel) {
      var value;
      value = this.device.GetFeedback(channel);
      IR.Log("value at channel " + channel + " is: " +value);
      return value;
   }

}


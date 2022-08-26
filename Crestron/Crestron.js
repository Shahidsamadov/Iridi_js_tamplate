var Crestron = function(driverName) {
   var that = this;
   IR.Log("Crestron module started");
   this.driverName = driverName;
   this.device = IR.GetDevice(driverName);
   
   this.getConnectionStatus = function() {
      return IR.GetVariable("Drivers.Crestron.Online");
   }
   
   this.pulse = function(channel) {
      this.device.Set(channel, 1);
      IR.SetTimeout(10, function() {
         that.device.Set(channel, 0);
      });
   }
   
   this.press = function(channel) {
      this.device.Set(channel, 1);
   }
   
   this.release = function(channel) {
      this.device.Set(channel, 0);
   }
   
   this.getValue = function(channel) {
      var value;
      value = this.device.GetFeedback(channel);
      return value;
   }
   
   this.setValue = function(channel, value) {
      this.device.Set(channel, value);
   }

}
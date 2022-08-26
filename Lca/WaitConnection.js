var WaitConnection = function(crestron, connectionStatus, sm, popupWait) {
   IR.Log("Wait connection module started");
   var that = this;
   this.crestron = crestron;
   this.popupWait = popupWait;
   
   IR.AddListener(IR.EVENT_OFFLINE, this.crestron.device, function() {
      IR.Log("OFFLINE");
      IR.ShowPopup(that.popupWait);    
   });
   
   IR.AddListener(IR.EVENT_ONLINE, this.crestron.device, function() {
      IR.Log("ONLINE");
      IR.HidePopup(that.popupWait);
      that.crestron.device.Connect();      
   });
   
   if (!connectionStatus) {
      IR.ShowPopup(that.popupWait);
   }
}
var WaitConnection = function(device, connectionStatus, screenManager, popupWait, popupMain) {  //method showpopup(true||false, orientation);
   IR.Log("Wait connection module started");
   var that = this;
   this.popupWait = popupWait;
   this.popupMain = popupMain;
   this.rooms = rooms;
   
   IR.AddListener(IR.EVENT_OFFLINE, device, function() {
      IR.Log("OFFLINE");
      screenManager.openPopup(that.popupWait);    
   });
   
   IR.AddListener(IR.EVENT_ONLINE, device, function() {
      IR.Log("ONLINE");
      screenManager.closePopup(that.popupWait);
      device.Connect();      
   });
   
   if (!connectionStatus) {
      IR.Log("OFFLINE");
      screenManager.openPopup(that.popupWait);
   }  
}
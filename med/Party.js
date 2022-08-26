var PartyMode = function(device, screenManager, popupParty, popupPartySwitching, popupPartyCantSelect, popupPartyCantSwitch, popupDMCI1BusyP, popupDMCI1BusyK, partySwitching, partyCantSelect, partyCantSwitch, busyP, busyK, partyOpenSourceA, sourceA, wait2) {
   var that = this;
   this.device = device;
   this.screenManager = screenManager;
   this.popupParty = popupParty;
   this.popupPartySwitching = popupPartySwitching;
   this.popupPartyCantSelect = popupPartyCantSelect;
   this.partySwitching = partySwitching;
   this.partyCantSelect = partyCantSelect;
   this.partyCantSwitch = partyCantSwitch;
   this.popupPartyCantSwitch = popupPartyCantSwitch;
   this.partyOpenSourceA = partyOpenSourceA;
   this.sourceA = sourceA;
   this.wait2 = wait2;
   
   this.busyP = busyP;
   this.busyK = busyK;
   this.popupDMCI1BusyK = popupDMCI1BusyK;
   this.popupDMCI1BusyP = popupDMCI1BusyP;
   
   this.autoCloseID = 0;
   
   this.openParty = function() {
      
   }
   
   this.autoClose = function() {
      IR.ClearInterval(this.autoCloseID);
      this.autoCloseID = IR.SetTimeout(30000, autoCloseFinish);
   }
   
   function autoCloseFinish() {
      that.screenManager.closePopup(that.popupPartySwitching);
      that.screenManager.closePopup(that.popupPartyCantSelect);
      that.screenManager.closePopup(that.popupPartyCantSwitch);
      that.screenManager.closePopup(that.popupDMCI1BusyK);
      that.screenManager.closePopup(that.popupDMCI1BusyP);
   }
   
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.device, function(name, value) {
      if (name == that.partySwitching) {        // switching
         if (value) {
            IR.Log("PM SWITCHING ON!!!!");
            that.wait2.showTopInfo2("Идет переключение источников для режима \"Party\"");
         } else {
            IR.Log("PM SWITCHING OFF!!!!");
            that.wait2.hideTopInfo2();
         }
      } else if (name == that.partyCantSelect) {// cant select
         if (value) {
            that.wait2.showTopInfo2("Комната уже используется");
         } else {
            that.wait2.hideTopInfo2();
         }
      } else if (name == that.partyCantSwitch) {
         if (value) {
            that.screenManager.openPopup(that.popupPartyCantSwitch);
            that.autoClose();
         } else {
            that.screenManager.closePopup(that.popupPartyCantSwitch);
         }
      } else if (name == "dmci1BusyParty") {
         IR.Log("DMCI1 BUSY PARTY");
         if (value) {
            that.wait2.showTopInfo2("DMCI1 уже используется в режиме \"Party\"");
         } else {
            that.wait2.hideTopInfo2();
         }
      } else if (name == "dmci1BusyKuhnya") {
         if (value) {
            that.wait2.showTopInfo2("DMCI1 уже используется на кухне");
         } else {
            that.wait2.hideTopInfo2();
         }
      }
   });
}
var BluRayModule = function(sm) {
var that = this;
this.sm = sm;
this.setFinished = false;

this.popupBluRay;
this.popupFlat;
this.btnBackH;
this.btnBackV;
this.btnCloseH;
this.btnCloseV;

this.finishSet = function() {
   this.setFinished = true;
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnBackH, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupBluRay.backPopup);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnCloseH, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnBackV, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupBluRay.backPopup);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnCloseV, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
}

this.setItems = function(popupBluRay, popupFlat, btnBack, btnClose) {
   this.popupBluRay = popupBluRay;
   this.popupFlat = popupFlat;
   this.btnBackH = this.popupBluRay.itemH.GetItem(btnBack);
   this.btnBackV = this.popupBluRay.itemV.GetItem(btnBack);
   this.btnCloseH = this.popupBluRay.itemH.GetItem(btnClose);
   this.btnCloseV = this.popupBluRay.itemV.GetItem(btnClose);
}
   
}
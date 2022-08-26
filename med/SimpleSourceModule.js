var SimpleSourceModule = function(sm) {
var that = this;
this.sm = sm;
this.setFinished = false;

this.popupSimpleSource;
this.popupFlat;
this.btnBackH;
this.btnBackV;
this.btnCloseH;
this.btnCloseV;

this.finishSet = function() {
   this.setFinished = true;
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnBackH, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupSimpleSource.backPopup);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnCloseH, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnBackV, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupSimpleSource.backPopup);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnCloseV, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
}

this.setItems = function(popupSimpleSource, popupFlat, btnBack, btnClose) {
   this.popupSimpleSource = popupSimpleSource;
   this.popupFlat = popupFlat;
   this.btnBackH = this.popupSimpleSource.itemH.GetItem(btnBack);
   this.btnBackV = this.popupSimpleSource.itemV.GetItem(btnBack);
   this.btnCloseH = this.popupSimpleSource.itemH.GetItem(btnClose);
   this.btnCloseV = this.popupSimpleSource.itemV.GetItem(btnClose);
}
   
}
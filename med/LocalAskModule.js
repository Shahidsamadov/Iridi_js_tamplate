var LocalAskModule = function(crestron, sm) {
var that = this;
this.crestron = crestron;
this.sm = sm;

this.popupLocalAskBack;
this.popupAskArray = [];

this.btnFunc = function() {}

this.setItems = function(popupLocalAskBack) {
   this.popupLocalAskBack = popupLocalAskBack;
   
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.popupLocalAskBack.itemH, function() {
      that.hide();
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.popupLocalAskBack.itemV, function() {
      that.hide();
   });
}

this.addShowSignal = function(showSignal, okSignal, txt, popupFMAsk, btn) {
   this.popupAskArray.push(popupFMAsk);
   var btnH = popupFMAsk.itemH.GetItem(btn);
   var btnV = popupFMAsk.itemV.GetItem(btn);
   IR.AddListener(IR.EVENT_ITEM_RELEASE, btnH, function() {
      that.btnFunc();
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, btnV, function() {
      that.btnFunc();
   });
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.crestron.device, function(name,value) {
      if (name == showSignal && value == 1) {
         btnH.Text = txt;
         btnV.Text = txt;
         that.btnFunc = function() {
            that.crestron.pulse(okSignal);
            that.sm.closePopup(popupFMAsk);
            that.sm.closePopup(that.popupLocalAskBack);
         };
         that.sm.openPopup(that.popupLocalAskBack);
         that.sm.openPopup(popupFMAsk);
      }
   });
}

this.hide = function() {
   for (var i=0; i<this.popupAskArray.length; i++) {
      this.sm.closePopup(this.popupAskArray[i]);
   }
   this.sm.closePopup(this.popupLocalAskBack);
}

}
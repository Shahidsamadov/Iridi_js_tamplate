function ButtonExt(popupItem, item, func) {
   var that = this;
   this.itemObject = popupItem.GetItem(item);
   this.func = func;
   this.release = function() {
      that.itemObject.Value = 0;
   }
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.itemObject, function() {
      that.itemObject.Value = 1;
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.itemObject, function() {
      IR.SetTimeout(100, function() {
         that.itemObject.Value = 0;
         that.func();
      });
   });
}
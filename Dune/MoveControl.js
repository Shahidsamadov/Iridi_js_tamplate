var MoveControl = function(popupName, itemName, deviceName) {
   var that = this;
   
   this.popupName = popupName;
   this.itemName = itemName;
   this.item = IR.GetPopup(this.popupName).GetItem(this.itemName);
   this.deviceName = deviceName;
   
   this.leftCMD;
   this.rightCMD;
   this.upCMD;
   this.downCMD;
   this.pressCMD;
   
   this.leftItem;
   this.rightItem;
   this.upItem;
   this.downItem;
   this.pressItem;
   
   this.pressDif = 30;
   this.moveDif = 50;
   this.canSendPeriod = 500;
   
   this.pressX = 0;
   this.pressY = 0;
   this.lastX = 0;
   this.lastY = 0;
   this.curX = 0;
   this.curY = 0;
   
   this.difX = 0;
   this.difY = 0;
   
   this.canSendCMD = true;
   this.canSendID = -1;
   
   //IR.AddListener(IR.EVENT_MOUSE_DOWN, this.item, function() {
   IR.AddListener(IR.EVENT_TOUCH_DOWN, this.item, function() {
      that.pressX = that.item.ValueX;   
      that.pressY = that.item.ValueY;
      that.lastX = that.item.ValueX;   
      that.lastY = that.item.ValueY;
      that.curX = that.item.ValueX;
      that.curY = that.item.ValueY;
   });
   
   //IR.AddListener(IR.EVENT_MOUSE_UP, this.item, function() {
   IR.AddListener(IR.EVENT_TOUCH_UP, this.item, function() {
      that.curX = that.item.ValueX;
      that.curY = that.item.ValueY;
      that.difX = Math.abs(that.curX - that.pressX);
      that.difY = Math.abs(that.curY - that.pressY);
      
      if (that.difX <= that.pressDif && that.difY <= that.pressDif) {
         //press
         that.sendCMD(that.pressCMD);
      }
   });
   
   //IR.AddListener(IR.EVENT_MOUSE_MOVE, this.item, function() {
   IR.AddListener(IR.EVENT_TOUCH_MOVE, this.item, function() {
      that.curX = that.item.ValueX;
      that.curY = that.item.ValueY;
      that.difX = that.curX - that.lastX;
      that.difY = that.curY - that.lastY;
      //up
      if (that.difY <= -that.moveDif) {
         that.sendCMD(that.upCMD);
         that.lastX = that.curX;
         that.lastY = that.curY;
         that.pressX = -2*that.moveDif;
         that.pressY = -2*that.moveDif;   
      }
      //down
      if (that.difY >= that.moveDif) {
         that.sendCMD(that.downCMD);
         that.lastX = that.curX;
         that.lastY = that.curY;
         that.pressX = -2*that.moveDif;
         that.pressY = -2*that.moveDif;   
      }
      //left
      if (that.difX <= -that.moveDif) {
         that.sendCMD(that.leftCMD);
         that.lastX = that.curX;
         that.lastY = that.curY;  
         that.pressX = -2*that.moveDif;
         that.pressY = -2*that.moveDif; 
      }
      //right
      if (that.difX >= that.moveDif) {
         that.sendCMD(that.rightCMD);
         that.lastX = that.curX;
         that.lastY = that.curY;
         that.pressX = -2*that.moveDif;
         that.pressY = -2*that.moveDif;   
      }
   });
   
   this.setCMD = function(up, down, left, right, press) {
      this.upCMD = up;
      this.downCMD = down;
      this.leftCMD = left;
      this.rightCMD = right;
      this.pressCMD = press;   
   }
      
   this.sendCMD = function(cmd) {
      if (this.canSendCMD) {
         IR.Log("send cmd:" + cmd);
         IR.PlaySound('Flashlight Turned On 01.wav',0,80);
         IR.GetDevice(this.deviceName).Set(cmd, "");
         this.visualize(cmd);
         this.canSendCMD = false;
         IR.SetTimeout(this.canSendPeriod, function() {
            that.canSendCMD = true;
         });
      }
   }
   
   this.setVisualizeItems = function(upItem, downItem, leftItem, rightItem, pressItem) {
      this.upItem = IR.GetPopup(this.popupName).GetItem(upItem);
      this.downItem = IR.GetPopup(this.popupName).GetItem(downItem);
      this.leftItem = IR.GetPopup(this.popupName).GetItem(leftItem);
      this.rightItem = IR.GetPopup(this.popupName).GetItem(rightItem);
      this.pressItem = IR.GetPopup(this.popupName).GetItem(pressItem);
   }
   
   this.visualize = function(cmd) {
      if (cmd == this.leftCMD) {
         this.leftItem.Visible = true;
         IR.SetTimeout(this.canSendPeriod-100, function() {that.leftItem.Visible = false;});
      } else if (cmd == this.rightCMD) {
         this.rightItem.Visible = true;                       
         IR.SetTimeout(this.canSendPeriod-100, function() {that.rightItem.Visible = false;});
      } else if (cmd == this.upCMD) {
         this.upItem.Visible = true;                          
         IR.SetTimeout(this.canSendPeriod-100, function() {that.upItem.Visible = false;});
      } else if (cmd == this.downCMD) {
         this.downItem.Visible = true;                        
         IR.SetTimeout(this.canSendPeriod-100, function() {that.downItem.Visible = false;});
      } else if (cmd == this.pressCMD) {
         this.pressItem.Visible = true;                       
         IR.SetTimeout(this.canSendPeriod-100, function() {that.pressItem.Visible = false;});
      }
   }
   
}
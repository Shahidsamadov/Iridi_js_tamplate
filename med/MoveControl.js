

var MoveControl = function(popupName, itemName, crestron, canSend, moveDif) {
   var that = this;
   
   this.popupName = popupName;
   this.itemName = itemName;
   this.item = IR.GetPopup(this.popupName).GetItem(this.itemName);
   this.crestron = crestron;
   
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
   this.moveDif = moveDif;
   this.canSendPeriod = canSend;
   this.animTimeout = 1000;
   
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
         this.crestron.pulse(cmd);
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
   
   this.leftID, this.rightID, this.downID, this.upID, this.pressID;
   this.visualize = function(cmd) {
      if (cmd == this.leftCMD) {
         this.visualize_allInvisible();
         this.visualize_clearAllIDs();
         this.leftItem.Visible = true;
         this.leftID = IR.SetTimeout(this.animTimeout, function() {that.leftItem.Visible = false;});
      } else if (cmd == this.rightCMD) {
         this.visualize_allInvisible();
         this.visualize_clearAllIDs();
         this.rightItem.Visible = true;                       
         this.rightID = IR.SetTimeout(this.animTimeout, function() {that.rightItem.Visible = false;});
      } else if (cmd == this.upCMD) {
         this.visualize_allInvisible();
         this.visualize_clearAllIDs();
         this.upItem.Visible = true;                          
         this.upID = IR.SetTimeout(this.animTimeout, function() {that.upItem.Visible = false;});
      } else if (cmd == this.downCMD) {
         this.visualize_allInvisible();
         this.visualize_clearAllIDs();
         this.downItem.Visible = true;                        
         this.downID = IR.SetTimeout(this.animTimeout, function() {that.downItem.Visible = false;});
      } else if (cmd == this.pressCMD) {
         this.visualize_allInvisible();
         this.visualize_clearAllIDs();
         this.pressItem.Visible = true;                       
         this.pressID = IR.SetTimeout(this.animTimeout, function() {that.pressItem.Visible = false;});
      }
   }
   
   this.visualize_clearAllIDs = function() {
      IR.ClearInterval(this.leftID);
      IR.ClearInterval(this.rightID);
      IR.ClearInterval(this.upID);
      IR.ClearInterval(this.downID);
      IR.ClearInterval(this.pressID);
   }
   
   this.visualize_allInvisible = function() {
      that.leftItem.Visible = false;
      that.rightItem.Visible = false;
      that.upItem.Visible = false;
      that.downItem.Visible = false;
      that.pressItem.Visible = false;
   }
}
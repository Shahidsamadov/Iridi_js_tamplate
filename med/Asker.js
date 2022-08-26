//Class asker
var Asker = function(screenManager, popupAsker, question, answer1, answer2) {
   var that = this;   
   this.screenManager = screenManager;
   this.popupAsker = popupAsker;   
   this.questionH = popupAsker.itemH.GetItem(question);
   this.questionV = popupAsker.itemV.GetItem(question);
   this.answer1H = popupAsker.itemH.GetItem(answer1);
   this.answer1V = popupAsker.itemV.GetItem(answer1);
   this.answer2H = popupAsker.itemH.GetItem(answer2);
   this.answer2V = popupAsker.itemV.GetItem(answer2);
   this.func1 = 0;
   this.func2 = 0;
   
   this.open = function() {
      this.screenManager.openPopup(popupAsker);      
   }
   
   this.close = function() {
      this.screenManager.closePopup(popupAsker);      
   }
   
   this.setFunction1 = function(func) {
      this.func1 = func;  
   }
   
   this.setFunction2 = function(func) {
      this.func2 = func;  
   }
   
   this.setQuestion = function(text) {
      this.questionH.Text = text;
      this.questionV.Text = text;
   }
   
   this.setAnswer1 = function(text) {
      this.answer1H.Text = text;
      this.answer1V.Text = text;
   }
   
   this.setAnswer2 = function(text) {
      this.answer2H.Text = text;
      this.answer2V.Text = text;
   }
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.answer1H, function() {
      if (that.func1 != 0)
         that.func1();
      that.close();
   });
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.answer1V, function() {
      if (that.func1 != 0)
         that.func1();
      that.close();
   });
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.answer2H, function() {
      if (that.func2 != 0)
         that.func2();
      that.close();
   });
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.answer2V, function() {
      if (that.func2 != 0)
         that.func2();
      that.close();
   });
}
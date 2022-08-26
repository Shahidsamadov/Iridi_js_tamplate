var RadioModule = function(crestron, sm) {
var that = this;
this.crestron = crestron;
this.sm = sm;
this.setFinished = false;

this.popupFM;
this.popupFlat;
this.btnBackH;
this.btnBackV;
this.btnCloseH;
this.btnCloseV;
this.labelFMNumH;
this.labelFMNumV;
this.listH;
this.listV;
this.listItem;
this.labelTitleH;
this.labelTitleV;
this.labelFreqH;
this.labelFreqV;
this.imageH;
this.imageV;   

this.fmNumfb;
this.titleArray = [];
this.freqArray = [];
this.picArray = [];
this.picMiniArray = [];
this.picMiniMiniArray = [];
this.cmdArray = [];
this.fbArray = [];

//fav
this.loaded1_signal;
this.loaded2_signal;
this.loaded3_signal;
this.loaded4_signal;
this.loaded5_signal;
this.loaded6_signal;
this.fav1_itemH;
this.fav2_itemH;
this.fav3_itemH;
this.fav4_itemH;
this.fav5_itemH;
this.fav6_itemH;
this.fav1_itemV;
this.fav2_itemV;
this.fav3_itemV;
this.fav4_itemV;
this.fav5_itemV;
this.fav6_itemV;

this.finishSet = function() {
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnBackH, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFM.backPopup);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnCloseH, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnBackV, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFM.backPopup);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnCloseV, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
   this.setFinished = true;
}

this.setItems = function(popupFM, popupFlat, btnBack, btnClose, labelFMNum, list, listItem, labelTitle, labelFreq, image, /**/ fmNumfb) {
   this.popupFM = popupFM;
   this.popupFlat = popupFlat;
   this.btnBackH = this.popupFM.itemH.GetItem(btnBack);
   this.btnBackV = this.popupFM.itemV.GetItem(btnBack);
   this.btnCloseH = this.popupFM.itemH.GetItem(btnClose);
   this.btnCloseV = this.popupFM.itemV.GetItem(btnClose);
   this.labelFMNumH = this.popupFM.itemH.GetItem(labelFMNum);
   this.labelFMNumV = this.popupFM.itemV.GetItem(labelFMNum);
   this.listH = this.popupFM.itemH.GetItem(list);
   this.listV = this.popupFM.itemV.GetItem(list);
   this.listItem = listItem;
   this.labelTitleH = this.popupFM.itemH.GetItem(labelTitle);
   this.labelTitleV = this.popupFM.itemV.GetItem(labelTitle);
   this.labelFreqH = this.popupFM.itemH.GetItem(labelFreq);
   this.labelFreqV = this.popupFM.itemV.GetItem(labelFreq);
   this.imageH = this.popupFM.itemH.GetItem(image);
   this.imageV = this.popupFM.itemV.GetItem(image);
   this.fmNumfb = fmNumfb;       
}

this.setFavItems = function(fav1Item, fav2Item, fav3Item, fav4Item, fav5Item, fav6Item) {
   this.fav1_itemH = this.popupFM.itemH.GetItem(fav1Item);
   this.fav1_itemV = this.popupFM.itemV.GetItem(fav1Item);
   this.fav2_itemH = this.popupFM.itemH.GetItem(fav2Item);
   this.fav2_itemV = this.popupFM.itemV.GetItem(fav2Item);
   this.fav3_itemH = this.popupFM.itemH.GetItem(fav3Item);
   this.fav3_itemV = this.popupFM.itemV.GetItem(fav3Item);
   this.fav4_itemH = this.popupFM.itemH.GetItem(fav4Item);
   this.fav4_itemV = this.popupFM.itemV.GetItem(fav4Item);
   this.fav5_itemH = this.popupFM.itemH.GetItem(fav5Item);
   this.fav5_itemV = this.popupFM.itemV.GetItem(fav5Item);
   this.fav6_itemH = this.popupFM.itemH.GetItem(fav6Item);
   this.fav6_itemV = this.popupFM.itemV.GetItem(fav6Item);
} 

this.setFavSignals = function(loaded1_Signal, loaded2_Signal, loaded3_Signal, loaded4_Signal, loaded5_Signal, loaded6_Signal) {
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.crestron.device, function(name, value) {
      switch(name) {
         case loaded1_Signal:
            that.fav1_itemH.GetState(0).Image = that.picMiniArray[value];
            that.fav1_itemV.GetState(0).Image = that.picMiniArray[value];
         break;
         case loaded2_Signal:
            that.fav2_itemH.GetState(0).Image = that.picMiniArray[value];
            that.fav2_itemV.GetState(0).Image = that.picMiniArray[value];
         break;
         case loaded3_Signal:
            that.fav3_itemH.GetState(0).Image = that.picMiniArray[value];
            that.fav3_itemV.GetState(0).Image = that.picMiniArray[value];
         break;
         case loaded4_Signal:
            that.fav4_itemH.GetState(0).Image = that.picMiniArray[value];
            that.fav4_itemV.GetState(0).Image = that.picMiniArray[value];
         break;
         case loaded5_Signal:
            that.fav5_itemH.GetState(0).Image = that.picMiniArray[value];
            that.fav5_itemV.GetState(0).Image = that.picMiniArray[value];
         break;
         case loaded6_Signal:
            that.fav6_itemH.GetState(0).Image = that.picMiniArray[value];
            that.fav6_itemV.GetState(0).Image = that.picMiniArray[value];
         break;
      }   
   });
}

this.addStation = function(title, freq, pic, pic_mini, pic_minimini, cmd, fb) {
   this.titleArray.push(title);
   this.freqArray.push(freq);
   this.picArray.push(pic);
   this.picMiniArray.push(pic_mini);
   this.picMiniMiniArray.push(pic_minimini);
   this.cmdArray.push(cmd);
   this.fbArray.push(fb);
}

this.buildList = function() {
   this.listH.Clear();
   this.listV.Clear();
   for (var i=0; i<this.titleArray.length; i++) {
      this.listH.Template = this.listItem;
      this.listH.CreateItem(i, 1, {Text: this.titleArray[i]});
      this.listH.CreateItem(i, 2, {Image: this.picMiniMiniArray[i]});
      this.listV.Template = this.listItem;
      this.listV.CreateItem(i, 1, {Text: this.titleArray[i]});
      this.listV.CreateItem(i, 2, {Image: this.picMiniMiniArray[i]});
   }
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, this.listH, function(item, subitem, type, object) {
      if (type == 12) {
         that.crestron.pulse(that.cmdArray[item]);
      }      
   });
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, this.listV, function(item, subitem, type, object) {
      if (type == 12) {
         that.crestron.pulse(that.cmdArray[item]);
      }
   });
}

this.rebuildList = function(selectedInt) {
   for (var i=0; i<this.titleArray.length; i++) {
      if (i != selectedInt) {
         this.listH.Template = this.listItem;
         this.listH.CreateItem(i, 3, {Image: "clear.png"});
         this.listV.Template = this.listItem;
         this.listV.CreateItem(i, 3, {Image: "clear.png"});
      } else {
         this.listH.Template = this.listItem;
         this.listH.CreateItem(i, 3, {Image: "speaker.png"});
         this.listV.Template = this.listItem;
         this.listV.CreateItem(i, 3, {Image: "speaker.png"});
      }
   }
}

IR.AddListener(IR.EVENT_TAG_CHANGE, this.crestron.device, function (name,value) {
   if (that.setFinished == true) {
   if (name == that.fmNumfb) {
      that.labelFMNumH.Text = value;
      that.labelFMNumV.Text = value;
   }
   for (var i=0; i<that.fbArray.length; i++) {
      if (name == that.fbArray[i] && value == true) {
         that.rebuildList(i);
         that.labelTitleH.Text = that.titleArray[i];
         that.labelTitleV.Text = that.titleArray[i];
         that.labelFreqH.Text = that.freqArray[i];
         that.labelFreqV.Text = that.freqArray[i];
         that.imageH.GetState(0).Image = that.picArray[i];
         that.imageV.GetState(0).Image = that.picArray[i];      
      }   
   }
   }
}); 
   
}
var NetRadioModule = function(crestron, sm) {
var that = this;
this.crestron = crestron;
this.sm = sm;
this.setFinished = false;

this.popupNetRadio;
this.popupFlat;
this.btnBackH;
this.btnBackV;
this.btnCloseH;
this.btnCloseV;
this.listH;
this.listV;
this.listItem;
this.labelMenuH;
this.labelMenuV;
this.labelTitleH;
this.labelTitleV;
this.labelStatusH;
this.labelStatusV;

this.line1;
this.line2;
this.line3;
this.line4;
this.line5;
this.line6;
this.line7;
this.line8;
this.line9;
this.txt1;
this.txt2;
this.txt3;
this.txt4;
this.txt5;
this.txt6;
this.txt7;
this.txt8;
this.txt9;
this.txtMenu;
this.txtTitle;
this.txtStatus;

this.txt1buf;
this.txt2buf;
this.txt3buf;
this.txt4buf;
this.txt5buf;
this.txt6buf;
this.txt7buf;
this.txt8buf;
this.txt9buf;
   

this.finishSet = function() {
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnBackH, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupNetRadio.backPopup);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnCloseH, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnBackV, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupNetRadio.backPopup);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnCloseV, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, this.listH, function(item, subitem, type, object) {
      if (type == 12) {
         switch (item)
         {
           case 0:
            that.crestron.pulse(that.line1);
           break;
           case 1:
            that.crestron.pulse(that.line2);
           break;
           case 2:
            that.crestron.pulse(that.line3);
           break;
           case 3:
            that.crestron.pulse(that.line4);
           break;
           case 4:
            that.crestron.pulse(that.line5);
           break;
           case 5:
            that.crestron.pulse(that.line6);
           break;
           case 6:
            that.crestron.pulse(that.line7);
           break;
           case 7:
            that.crestron.pulse(that.line8);
           break;
           case 8:
            that.crestron.pulse(that.line9);
           break;
         }
      }      
   });
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, this.listV, function(item, subitem, type, object) {
      if (type == 12) {
         switch (item)
         {
           case 0:
            that.crestron.pulse(that.line1);
           break;
           case 1:
            that.crestron.pulse(that.line2);
           break;
           case 2:
            that.crestron.pulse(that.line3);
           break;
           case 3:
            that.crestron.pulse(that.line4);
           break;
           case 4:
            that.crestron.pulse(that.line5);
           break;
           case 5:
            that.crestron.pulse(that.line6);
           break;
           case 6:
            that.crestron.pulse(that.line7);
           break;
           case 7:
            that.crestron.pulse(that.line8);
           break;
           case 8:
            that.crestron.pulse(that.line9);
           break;
         }
      }      
   });
   this.setFinished = true;
}

this.setItems = function(popupNetRadio, popupFlat, btnBack, btnClose, list, listItem, labelMenu, labelTitle, labelStatus) {
   this.popupNetRadio = popupNetRadio;
   this.popupFlat = popupFlat;
   this.btnBackH = this.popupNetRadio.itemH.GetItem(btnBack);
   this.btnBackV = this.popupNetRadio.itemV.GetItem(btnBack);
   this.btnCloseH = this.popupNetRadio.itemH.GetItem(btnClose);
   this.btnCloseV = this.popupNetRadio.itemV.GetItem(btnClose);
   this.listH = this.popupNetRadio.itemH.GetItem(list);
   this.listV = this.popupNetRadio.itemV.GetItem(list);
   this.listItem = listItem;
   this.labelMenuH = this.popupNetRadio.itemH.GetItem(labelMenu);
   this.labelMenuV = this.popupNetRadio.itemV.GetItem(labelMenu);
   this.labelTitleH = this.popupNetRadio.itemH.GetItem(labelTitle);
   this.labelTitleV = this.popupNetRadio.itemV.GetItem(labelTitle);
   this.labelStatusH = this.popupNetRadio.itemH.GetItem(labelStatus);
   this.labelStatusV = this.popupNetRadio.itemV.GetItem(labelStatus);       
}

this.setSignals = function(line1, line2, line3, line4, line5, line6, line7, line8, line9, txt1, txt2, txt3, txt4, txt5, txt6, txt7, txt8, txt9, txtMenu, txtTitle, txtStatus) {
   this.line1 = line1;
   this.line2 = line2;
   this.line3 = line3;
   this.line4 = line4;
   this.line5 = line5;
   this.line6 = line6;
   this.line7 = line7;
   this.line8 = line8;
   this.line9 = line9;
   this.txt1 = txt1;
   this.txt2 = txt2;
   this.txt3 = txt3;
   this.txt4 = txt4;
   this.txt5 = txt5;
   this.txt6 = txt6;
   this.txt7 = txt7;
   this.txt8 = txt8;
   this.txt9 = txt9;
   this.txtMenu = txtMenu;
   this.txtTitle = txtTitle;
   this.txtStatus = txtStatus;
}

this.buildList = function() {
   IR.Log("buildList");
   this.listH.Clear();
   this.listV.Clear();
   this.listH.Template = this.listItem;
   this.listH.CreateItem(0, 1, {Text: this.txt1buf});
   this.listH.CreateItem(1, 1, {Text: this.txt2buf});
   this.listH.CreateItem(2, 1, {Text: this.txt3buf});
   this.listH.CreateItem(3, 1, {Text: this.txt4buf});
   this.listH.CreateItem(4, 1, {Text: this.txt5buf});
   this.listH.CreateItem(5, 1, {Text: this.txt6buf});
   this.listH.CreateItem(6, 1, {Text: this.txt7buf});
   this.listH.CreateItem(7, 1, {Text: this.txt8buf});
   this.listH.CreateItem(8, 1, {Text: this.txt9buf});
   this.listV.Template = this.listItem;
   this.listV.CreateItem(0, 1, {Text: this.txt1buf});
   this.listV.CreateItem(1, 1, {Text: this.txt2buf});
   this.listV.CreateItem(2, 1, {Text: this.txt3buf});
   this.listV.CreateItem(3, 1, {Text: this.txt4buf});
   this.listV.CreateItem(4, 1, {Text: this.txt5buf});
   this.listV.CreateItem(5, 1, {Text: this.txt6buf});
   this.listV.CreateItem(6, 1, {Text: this.txt7buf});
   this.listV.CreateItem(7, 1, {Text: this.txt8buf});
   this.listV.CreateItem(8, 1, {Text: this.txt9buf});
}

IR.AddListener(IR.EVENT_TAG_CHANGE, this.crestron.device, function (name,value) {
   if (that.setFinished == true) {
   switch (name)
   {
     case that.txtMenu:
      that.labelMenuH.Text = value;
      that.labelMenuV.Text = value;
     break;
     case that.txtTitle:
      that.labelTitleH.Text = value;
      that.labelTitleV.Text = value;
     break;
     case that.txtStatus:
      that.labelStatusH.Text = value;
      that.labelStatusV.Text = value;
     break;
   }
   if (that.labelTitleH.Text == "" || that.labelTitleV.Text == "") {
      that.labelTitleH.Text = "---";
      that.labelTitleV.Text = "---";
   }
   switch (name)
   {
     case that.txt1:
      that.txt1buf = value;
     break;
     case that.txt2:
      that.txt2buf = value;
     break;
     case that.txt3:
      that.txt3buf = value;
     break;
     case that.txt4:
      that.txt4buf = value;
     break;
     case that.txt5:
      that.txt5buf = value;
     break;
     case that.txt6:
      that.txt6buf = value;
     break;
     case that.txt7:
      that.txt7buf = value;
     break;
     case that.txt8:
      that.txt8buf = value;
     break;
     case that.txt9:
      that.txt9buf = value;
     break;
   }
   if (name == that.txt1 || name == that.txt2 || name == that.txt3 || name == that.txt4 || name == that.txt5 || name == that.txt6 || name == that.txt7 || name == that.txt8 || name == that.txt9) {
      that.buildList();
   }
   }
}); 
   
}
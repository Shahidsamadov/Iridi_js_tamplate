var RadioManager = function(device, screenManager, popupRadio, popupWaitSwitch, FMStationsTxt, FMStationsFreq, FMStationsImg, FM1CMD, FM2CMD, title, name, freq, img, list, listItem, listItemSelected, FM1FreqJ, FM2FreqJ, popupKuhnyaMedia, popupGostinayaMedia, popupSpalnyaMedia, popupBalkonMedia, popupVannayaMedia, popupSanuzelMedia, popupParty) {
   var that = this;
   this.device = device;
   this.screenManager = screenManager;
   this.popupRadio = popupRadio;
   this.popupWaitSwitch = popupWaitSwitch;
   
   this.popupKuhnyaMedia = popupKuhnyaMedia;
   this.popupGostinayaMedia = popupGostinayaMedia;
   this.popupSpalnyaMedia = popupSpalnyaMedia;
   this.popupBalkonMedia = popupBalkonMedia;
   this.popupVannayaMedia = popupVannayaMedia;
   this.popupSanuzelMedia = popupSanuzelMedia;
   this.popupParty = popupParty;
   
   this.FMStationsTxt = FMStationsTxt;
   this.FMStationsFreq = FMStationsFreq;
   this.FMStationsImg = FMStationsImg;
   this.FM1CMD = FM1CMD;
   this.FM2CMD = FM2CMD;
   this.titleH = popupRadio.itemH.GetItem(title);
   this.nameH = popupRadio.itemH.GetItem(name);
   this.freqH = popupRadio.itemH.GetItem(freq);
   this.imgH = popupRadio.itemH.GetItem(img);
   this.listH = popupRadio.itemH.GetItem(list);
   this.titleV = popupRadio.itemV.GetItem(title);
   this.nameV = popupRadio.itemV.GetItem(name);
   this.freqV = popupRadio.itemV.GetItem(freq);
   this.imgV = popupRadio.itemV.GetItem(img);
   this.listV = popupRadio.itemV.GetItem(list);
   this.listItem = listItem;
   this.listItemSelected = listItemSelected;
   this.FM1FreqJ = FM1FreqJ;
   this.FM2FreqJ = FM2FreqJ;
   this.FM1FreqTxt;
   this.FM1FreqFreq;
   this.FM1FreqImg;
   this.FM2FreqTxt;
   this.FM2FreqFreq;
   this.FM2FreqImg;
   
   this.lastCMD;   
   this.FMnum;
   this.devMedia;
   this.backPopup;
   
   this.openFM = function(FMnum, devMedia) {
      this.FMnum = FMnum;
      this.devMedia = devMedia;
      this.sendFMOnCMD();
   }
   
   this.back = function() {
      this.screenManager.closeAllPopups();
      this.screenManager.openPopup(this.backPopup);
   }
   
   this.buildList = function() {
      this.listH.Clear();
      this.listV.Clear();
      for (var i=0; i<this.FMStationsTxt.length; i++) {
         this.listH.Template = this.listItem;
         this.listH.CreateItem(i, 1, {Text: this.FMStationsTxt[i]});
         this.listV.Template = this.listItem;
         this.listV.CreateItem(i, 1, {Text: this.FMStationsTxt[i]});
      }
   }
   
   this.updateCurrentStation = function() {
      if (this.FMnum == 1) {
         this.nameH.Text = this.FM1FreqTxt;
         this.freqH.Text = this.FM1FreqFreq + " МГц";
         this.imgH.GetState(0).Image = this.FM1FreqImg;
         this.nameV.Text = this.FM1FreqTxt;
         this.freqV.Text = this.FM1FreqFreq + " МГц";
         this.imgV.GetState(0).Image = this.FM1FreqImg;
      }
      else if (this.FMnum == 2) {
         this.nameH.Text = this.FM2FreqTxt;
         this.freqH.Text = this.FM2FreqFreq + " МГц";
         this.imgH.GetState(0).Image = this.FM2FreqImg;
         this.nameV.Text = this.FM2FreqTxt;
         this.freqV.Text = this.FM2FreqFreq + " МГц";
         this.imgV.GetState(0).Image = this.FM2FreqImg;
      }   
   }
   
   this.sendFMOnCMD = function() {
      if (this.FMnum == 1)
         this.device.Set(this.devMedia.cmdA[5], true);
      else if (this.FMnum == 2)
         this.device.Set(this.devMedia.cmdA[6], true);
      IR.SetTimeout(10, sendFMonCMDFinish);
   }
   function sendFMonCMDFinish() {
      if (that.FMnum == 1)
         that.device.Set(that.devMedia.cmdA[5], false);
      else if (that.FMnum == 2)
         that.device.Set(that.devMedia.cmdA[6], false);
   }
   
   this.sendFMCMD = function(num) {
      var cmd;
      if (this.FMnum == 1)
         cmd = this.FM1CMD[num];
      else if (this.FMnum == 2)
         cmd = this.FM2CMD[num];
      this.device.Set(cmd, true)
      this.lastCMD = cmd;
      IR.SetTimeout(10, sendFMCMDFinish);      
   }
   function sendFMCMDFinish() {
      that.device.Set(that.lastCMD, false);   
   }
   
   //FM Freq change
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.device, function(name,value) {
      if (name == that.FM1FreqJ || name == that.FM2FreqJ) {
         if (name == that.FM1FreqJ) {
            that.FM1FreqTxt = that.FMStationsTxt[value-1];
            that.FM1FreqFreq = that.FMStationsFreq[value-1];
            that.FM1FreqImg = that.FMStationsImg[value-1];
         }
         if (name == that.FM2FreqJ) {
            that.FM2FreqTxt = that.FMStationsTxt[value-1];
            that.FM2FreqFreq = that.FMStationsFreq[value-1];
            that.FM2FreqImg = that.FMStationsImg[value-1];
         }
         that.updateCurrentStation();
      }
   });
   
   this.pressOnStation = function(type, item) {
      if (type==12) {
         that.sendFMCMD(item);   
      }   
   } 
   //Press on station
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, this.listH, function(item, subitem, type, object) {
      that.pressOnStation(type, item);   
   });
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, this.listV, function(item, subitem, type, object) {
      that.pressOnStation(type, item);
   });
   
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.device, function (name,value) {
      if (value) {
         switch(name) {
         case "kuhnyaOpenFM1":
            if (that.popupKuhnyaMedia.isOpened) {
               that.FMnum = 1;
               that.titleH.Text = "FM радио №" + that.FMnum;
               that.titleV.Text = "FM радио №" + that.FMnum;
               that.updateCurrentStation();
               that.buildList();
               that.backPopup = that.popupKuhnyaMedia;
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupRadio);    
            }       
         break;
         case "kuhnyaOpenFM2":
            if (that.popupKuhnyaMedia.isOpened) {
               that.FMnum = 2;
               that.titleH.Text = "FM радио №" + that.FMnum;
               that.titleV.Text = "FM радио №" + that.FMnum;
               that.updateCurrentStation();
               that.buildList();
               that.backPopup = that.popupKuhnyaMedia;
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupRadio);     
            }       
         break;
         case "gostOpenFM1":
            if (that.popupGostinayaMedia.isOpened) {
               that.FMnum = 1;
               that.titleH.Text = "FM радио №" + that.FMnum;
               that.titleV.Text = "FM радио №" + that.FMnum;
               that.updateCurrentStation();
               that.buildList();
               that.backPopup = that.popupGostinayaMedia;
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupRadio);
            }          
         break;
         case "gostOpenFM2":
            if (that.popupGostinayaMedia.isOpened) {
               that.FMnum = 2;
               that.titleH.Text = "FM радио №" + that.FMnum;
               that.titleV.Text = "FM радио №" + that.FMnum;
               that.updateCurrentStation();
               that.buildList();
               that.backPopup = that.popupGostinayaMedia;
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupRadio);
            }          
         break;
         case "spalnyaOpenFM1":
            if (that.popupSpalnyaMedia.isOpened) {
               that.FMnum = 1;
               that.titleH.Text = "FM радио №" + that.FMnum;
               that.titleV.Text = "FM радио №" + that.FMnum;
               that.updateCurrentStation();
               that.buildList();
               that.backPopup = that.popupSpalnyaMedia;
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupRadio);
            }          
         break;
         case "spalnyaOpenFM2":
            if (that.popupSpalnyaMedia.isOpened) {
               that.FMnum = 2;
               that.titleH.Text = "FM радио №" + that.FMnum;
               that.titleV.Text = "FM радио №" + that.FMnum;
               that.updateCurrentStation();
               that.buildList();
               that.backPopup = that.popupSpalnyaMedia;
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupRadio);
            }          
         break;
         //
         case "balkonOpenFM1":
            if (that.popupBalkonMedia.isOpened) {
               that.FMnum = 1;
               that.titleH.Text = "FM радио №" + that.FMnum;
               that.titleV.Text = "FM радио №" + that.FMnum;
               that.updateCurrentStation();
               that.buildList();
               that.backPopup = that.popupBalkonMedia;
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupRadio);
            }          
         break;
         case "balkonOpenFM2":
            if (that.popupBalkonMedia.isOpened) {
               that.FMnum = 2;
               that.titleH.Text = "FM радио №" + that.FMnum;
               that.titleV.Text = "FM радио №" + that.FMnum;
               that.updateCurrentStation();
               that.buildList();
               that.backPopup = that.popupBalkonMedia;
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupRadio);
            }          
         break;
         //
         case "vannayaOpenFM1":
            if (that.popupVannayaMedia.isOpened) {
               that.FMnum = 1;
               that.titleH.Text = "FM радио №" + that.FMnum;
               that.titleV.Text = "FM радио №" + that.FMnum;
               that.updateCurrentStation();
               that.buildList();
               that.backPopup = that.popupBalkonMedia;
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupRadio);
            }          
         break;
         case "vannayaOpenFM2":
            if (that.popupVannayaMedia.isOpened) {
               that.FMnum = 2;
               that.titleH.Text = "FM радио №" + that.FMnum;
               that.titleV.Text = "FM радио №" + that.FMnum;
               that.updateCurrentStation();
               that.buildList();
               that.backPopup = that.popupBalkonMedia;
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupRadio);
            }          
         break;
         //
         case "sanuzelOpenFM1":
            if (that.popupSanuzelMedia.isOpened) {
               that.FMnum = 1;
               that.titleH.Text = "FM радио №" + that.FMnum;
               that.titleV.Text = "FM радио №" + that.FMnum;
               that.updateCurrentStation();
               that.buildList();
               that.backPopup = that.popupSanuzelMedia;
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupRadio);
            }          
         break;
         case "sanuzelOpenFM2":
            if (that.popupSanuzelMedia.isOpened) {
               that.FMnum = 2;
               that.titleH.Text = "FM радио №" + that.FMnum;
               that.titleV.Text = "FM радио №" + that.FMnum;
               that.updateCurrentStation();
               that.buildList();
               that.backPopup = that.popupSanuzelMedia;
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupRadio);
            }          
         break;
         //
         case "partyOpenSrc1Page":
            if (that.popupParty.isOpened) {
               that.FMnum = 1;
               that.titleH.Text = "FM радио №" + that.FMnum;
               that.titleV.Text = "FM радио №" + that.FMnum;
               that.updateCurrentStation();
               that.buildList();
               that.backPopup = that.popupParty;
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupRadio);
            }          
         break;
         case "partyOpenSrc2Page":
            if (that.popupParty.isOpened) {
               that.FMnum = 2;
               that.titleH.Text = "FM радио №" + that.FMnum;
               that.titleV.Text = "FM радио №" + that.FMnum;
               that.updateCurrentStation();
               that.buildList();
               that.backPopup = that.popupParty;
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupRadio);
            }          
         break;
         }
      }  
   });
}
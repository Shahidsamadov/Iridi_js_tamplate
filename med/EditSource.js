//EditSource class
var EditSource = function(screenManager, popupEditSource, txtScen, txtRoom, txtSource, btnAdd, btnCancel, txtItem1, txtItem2, txtItem3, txtItem4, txtItem5, txtItem6, txtItem7, txtItem8, txtItem9, lvlItem1, lvlItem2, lvlItem3, lvlItem4, lvlItem5, btnToggle1, btnToggle2, btnToggle3, btnToggle4, btnToggle5, btnToggle6, btnToggle7, listRadio, listRadioItem, listRadioItemSelected, FMStations, FM1StationsCMD, FM2StationsCMD) {
   var that = this;
   //mode - false -> add new
   //mode - true -> edit
   this.orientation = IR.GetVariable("System.ViewOrientation");
   
   this.screenManager = screenManager;
   this.popupEditSource = popupEditSource;
   this.txtScenH = this.popupEditSource.itemH.GetItem(txtScen);
   this.txtRoomH = this.popupEditSource.itemH.GetItem(txtRoom);
   this.txtSourceH = this.popupEditSource.itemH.GetItem(txtSource);
   this.btnAddH = this.popupEditSource.itemH.GetItem(btnAdd);
   this.btnCancelH = this.popupEditSource.itemH.GetItem(btnCancel);
   this.txtScenV = this.popupEditSource.itemV.GetItem(txtScen);
   this.txtRoomV = this.popupEditSource.itemV.GetItem(txtRoom);
   this.txtSourceV = this.popupEditSource.itemV.GetItem(txtSource);
   this.btnAddV = this.popupEditSource.itemV.GetItem(btnAdd);
   this.btnCancelV = this.popupEditSource.itemV.GetItem(btnCancel);
   
   this.txtItem1H = this.popupEditSource.itemH.GetItem(txtItem1);
   this.txtItem2H = this.popupEditSource.itemH.GetItem(txtItem2);
   this.txtItem3H = this.popupEditSource.itemH.GetItem(txtItem3);
   this.txtItem4H = this.popupEditSource.itemH.GetItem(txtItem4);
   this.txtItem5H = this.popupEditSource.itemH.GetItem(txtItem5);
   this.txtItem6H = this.popupEditSource.itemH.GetItem(txtItem6);
   this.txtItem7H = this.popupEditSource.itemH.GetItem(txtItem7);
   this.txtItem8H = this.popupEditSource.itemH.GetItem(txtItem8);
   this.txtItem9H = this.popupEditSource.itemH.GetItem(txtItem9);
   this.lvlItem1H = this.popupEditSource.itemH.GetItem(lvlItem1);
   this.lvlItem2H = this.popupEditSource.itemH.GetItem(lvlItem2);
   this.lvlItem3H = this.popupEditSource.itemH.GetItem(lvlItem3);
   this.lvlItem4H = this.popupEditSource.itemH.GetItem(lvlItem4);
   this.lvlItem5H = this.popupEditSource.itemH.GetItem(lvlItem5);
   this.btnToggle1H = this.popupEditSource.itemH.GetItem(btnToggle1);
   this.btnToggle2H = this.popupEditSource.itemH.GetItem(btnToggle2);
   this.btnToggle3H = this.popupEditSource.itemH.GetItem(btnToggle3);
   this.btnToggle4H = this.popupEditSource.itemH.GetItem(btnToggle4);
   this.btnToggle5H = this.popupEditSource.itemH.GetItem(btnToggle5);
   this.btnToggle6H = this.popupEditSource.itemH.GetItem(btnToggle6);
   this.btnToggle7H = this.popupEditSource.itemH.GetItem(btnToggle7);
   this.listRadioH = this.popupEditSource.itemH.GetItem(listRadio);
   this.txtItem1V = this.popupEditSource.itemV.GetItem(txtItem1);
   this.txtItem2V = this.popupEditSource.itemV.GetItem(txtItem2);
   this.txtItem3V = this.popupEditSource.itemV.GetItem(txtItem3);
   this.txtItem4V = this.popupEditSource.itemV.GetItem(txtItem4);
   this.txtItem5V = this.popupEditSource.itemV.GetItem(txtItem5);
   this.txtItem6V = this.popupEditSource.itemV.GetItem(txtItem6);
   this.txtItem7V = this.popupEditSource.itemV.GetItem(txtItem7);
   this.txtItem8V = this.popupEditSource.itemV.GetItem(txtItem8);
   this.txtItem9V = this.popupEditSource.itemV.GetItem(txtItem9);
   this.lvlItem1V = this.popupEditSource.itemV.GetItem(lvlItem1);
   this.lvlItem2V = this.popupEditSource.itemV.GetItem(lvlItem2);
   this.lvlItem3V = this.popupEditSource.itemV.GetItem(lvlItem3);
   this.lvlItem4V = this.popupEditSource.itemV.GetItem(lvlItem4);
   this.lvlItem5V = this.popupEditSource.itemV.GetItem(lvlItem5);
   this.btnToggle1V = this.popupEditSource.itemV.GetItem(btnToggle1);
   this.btnToggle2V = this.popupEditSource.itemV.GetItem(btnToggle2);
   this.btnToggle3V = this.popupEditSource.itemV.GetItem(btnToggle3);
   this.btnToggle4V = this.popupEditSource.itemV.GetItem(btnToggle4);
   this.btnToggle5V = this.popupEditSource.itemV.GetItem(btnToggle5);
   this.btnToggle6V = this.popupEditSource.itemV.GetItem(btnToggle6);
   this.btnToggle7V = this.popupEditSource.itemV.GetItem(btnToggle7);
   this.listRadioV = this.popupEditSource.itemV.GetItem(listRadio);
   
   this.txtItem1;
   this.txtItem2;
   this.txtItem3;
   this.txtItem4;
   this.txtItem5;
   this.txtItem6;
   this.txtItem7;
   this.txtItem8;
   this.txtItem9;
   this.lvlItem1;
   this.lvlItem2;
   this.lvlItem3;
   this.lvlItem4;
   this.lvlItem5;
   this.btnToggle1;
   this.btnToggle2;
   this.btnToggle3;
   this.btnToggle4;
   this.btnToggle5;
   this.btnToggle6;
   this.btnToggle7;
   this.listRadio;
   
   this.listRadioItem = listRadioItem;
   this.listRadioItemSelected = listRadioItemSelected;
   this.FMStations = FMStations;
   this.FM1StationsCMD = FM1StationsCMD;
   this.FM2StationsCMD = FM2StationsCMD;
   
   this.sceneArray;
   this.id;
   this.source;
   this.editScene;
   this.mode;
   this.actionID;
   
   this.radioSelectedID;
   
   this.open = function() {
      this.screenManager.openPopup(this.popupEditSource);   
   }
   
   this.setScene = function(sceneArray, id, source, editScene, actionID, mode) {
      this.sceneArray = sceneArray;
      this.id = id;
      this.actionID = actionID;
      this.source = source;
      this.editScene = editScene;
      this.mode = mode;
      this.txtScenH.Text = sceneArray[id][0][0];
      this.txtRoomH.Text = this.source.room.name;
      this.txtSourceH.Text = source.name;
      this.txtScenV.Text = sceneArray[id][0][0];
      this.txtRoomV.Text = this.source.room.name;
      this.txtSourceV.Text = source.name;
      switch (this.source.type) {
      case 0:
         if (!mode)
            this.set0Default();
         else this.set0Load();
      break;
      case 1:
         if (!mode)
            this.set1Default();
         else this.set1Load();
      break;
      case 2:
         if (!mode)
            this.set2Default();
         else this.set2Load();
      break;
      case 3:
         if (!mode)
            this.set3Default();
         else this.set3Load();
      break;
      case 4:
         if (!mode)
            this.set4Default();
         else this.set4Load();
      break;
      case 5:
         if (!mode)
            this.set5Default();
         else this.set5Load();
      break;
      case 6:
         if (!mode)
            this.set6Default();
         else this.set6Load();
      break;
      case 7:
         if (!mode)
            this.set7Default();
         else this.set7Load();
      break;
      case 8:
         if (!mode)
            this.set8Default();
         else this.set8Load();
      break;
      case 9:
         if (!mode)
            this.set9Default();
         else this.set9Load();
      break;
      case 10:
         if (!mode)
            this.set10Default();
         else this.set10Load();
      break;
      case 11:
         if (!mode)
            this.set11Default();
         else this.set11Load();
      break;
      case 12:
         if (!mode)
            this.set12Default();
         else this.set12Load();
      break;
      }     
   }
   
   //MEDIA
   this.buildFMList = function() {
      this.listRadioH.Clear();
      this.listRadioV.Clear();
      for (var i=0; i<this.FMStations.length; i++) {
         this.listRadioH.Template = this.listRadioItem;
         this.listRadioH.CreateItem(i, 1, {Text: this.FMStations[i]});
         this.listRadioV.Template = this.listRadioItem;
         this.listRadioV.CreateItem(i, 1, {Text: this.FMStations[i]});
      }
   }
   this.updateSelectedRadio = function() {
      this.txtItem9H.Text = this.FMStations[this.radioSelectedID];
      this.txtItem9V.Text = this.FMStations[this.radioSelectedID];
   }
   this.listRadioChangeFunc = function(type, item) {
      if (type == 12) {
         IR.Log("press radio");
         that.radioSelectedID = item;
         that.updateSelectedRadio();
      }   
   }
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, this.listRadioH, function(item, subitem, type, object) {
      that.listRadioChangeFunc(type, item);   
   });
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, this.listRadioV, function(item, subitem, type, object) {
      that.listRadioChangeFunc(type, item);   
   });
   ///
   this.printAction = function() {
      IR.Log("print action");
      for (var i=0; i<this.sceneArray[this.id][this.actionID].length; i++) {
         IR.Log("#"+i + " " + this.sceneArray[this.id][this.actionID][i]);
      }
   }
   this.clearAction = function() {
      IR.Log("clear action");
      this.sceneArray[this.id][this.actionID].splice(0,this.sceneArray[this.id][this.actionID].length);
   }
   ///
   
   this.set12Default = function() {
      IR.Log("SET MEDIA FM1,FM2,HUMAX,XBMC,APPLETV,OFF DEFAULT");
      //H
      this.txtItem3H.Visible = true;
      this.txtItem3H.Text = "FM радио №1";
      this.txtItem3H.X = 464;
      this.txtItem3H.Y = 603;
      this.txtItem4H.Text = "FM радио №2";
      this.txtItem4H.Visible = true;
      this.txtItem4H.X = 464;
      this.txtItem4H.Y = 663;
      this.txtItem5H.Visible = true;
      this.txtItem5H.Text = "Спутниковое ТВ";
      this.txtItem5H.X = 464;
      this.txtItem5H.Y = 723;
      this.txtItem6H.Visible = true;
      this.txtItem6H.Text = "Медиаплеер";
      this.txtItem6H.X = 464;
      this.txtItem6H.Y = 783;
      this.txtItem7H.Visible = true;
      this.txtItem7H.Text = "AppleTV";
      this.txtItem7H.X = 464;
      this.txtItem7H.Y = 843;
      this.txtItem2H.Visible = false;
      this.txtItem1H.Text = "Выключить";
      this.txtItem1H.X = 464;
      this.txtItem1H.Y = 903;
      this.txtItem1H.Visible = true;
      this.txtItem8H.Visible = false;
      this.txtItem8H.Text = "Выбрано: ";
      this.txtItem8H.X = 800;
      this.txtItem8H.Y = 980;
      this.txtItem9H.Visible = false;
      this.txtItem9H.GetState(0).TextAlign = 1;
      this.txtItem9H.X = 1100;
      this.txtItem9H.Y = 980;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle3H.Visible = true;
      this.btnToggle3H.X = 762;
      this.btnToggle3H.Y = 590;
      this.btnToggle3H.Value = false;
      this.btnToggle4H.Visible = true;
      this.btnToggle4H.X = 762;
      this.btnToggle4H.Y = 659;
      this.btnToggle4H.Value = false;
      this.btnToggle5H.Visible = true;
      this.btnToggle5H.Value = false;
      this.btnToggle5H.X = 762;
      this.btnToggle5H.Y = 719;
      this.btnToggle6H.Visible = true;
      this.btnToggle6H.Value = false;
      this.btnToggle6H.X = 762;
      this.btnToggle6H.Y = 779;
      this.btnToggle7H.Visible = true;
      this.btnToggle7H.Value = false;
      this.btnToggle7H.X = 762;
      this.btnToggle7H.Y = 839;
      this.btnToggle2H.Visible = false;
      this.btnToggle2H.Value = false;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.X = 762;
      this.btnToggle1H.Y = 899;
      this.btnToggle1H.Value = true;
      this.listRadioH.Visible = false;
      //V
      this.txtItem3V.Visible = true;
      this.txtItem3V.Text = "FM радио №1";
      this.txtItem3V.X = 464-256;
      this.txtItem3V.Y = 603+256;
      this.txtItem4V.Text = "FM радио №2";
      this.txtItem4V.Visible = true;
      this.txtItem4V.X = 464-256;
      this.txtItem4V.Y = 663+256;
      this.txtItem5V.Visible = true;
      this.txtItem5V.Text = "Спутниковое ТВ";
      this.txtItem5V.X = 464-256;
      this.txtItem5V.Y = 723+256;
      this.txtItem6V.Visible = true;
      this.txtItem6V.Text = "Медиаплеер";
      this.txtItem6V.X = 464-256;
      this.txtItem6V.Y = 783+256;
      this.txtItem7V.Visible = true;
      this.txtItem7V.Text = "AppleTV";
      this.txtItem7V.X = 464-256;
      this.txtItem7V.Y = 843+256;
      this.txtItem2V.Visible = false;
      this.txtItem1V.Text = "Выключить";
      this.txtItem1V.X = 464-256;
      this.txtItem1V.Y = 903+256;
      this.txtItem1V.Visible = true;
      this.txtItem8V.Visible = false;
      this.txtItem8V.Text = "Выбрано: ";
      this.txtItem8V.X = 800-256;
      this.txtItem8V.Y = 980+256;
      this.txtItem9V.Visible = false;
      this.txtItem9V.GetState(0).TextAlign = 1;
      this.txtItem9V.X = 1100-256;
      this.txtItem9V.Y = 980+256;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle3V.Visible = true;
      this.btnToggle3V.X = 762-256;
      this.btnToggle3V.Y = 590+256;
      this.btnToggle3V.Value = false;
      this.btnToggle4V.Visible = true;
      this.btnToggle4V.X = 762-256;
      this.btnToggle4V.Y = 659+256;
      this.btnToggle4V.Value = false;
      this.btnToggle5V.Visible = true;
      this.btnToggle5V.Value = false;
      this.btnToggle5V.X = 762-256;
      this.btnToggle5V.Y = 719+256;
      this.btnToggle6V.Visible = true;
      this.btnToggle6V.Value = false;
      this.btnToggle6V.X = 762-256;
      this.btnToggle6V.Y = 779+256;
      this.btnToggle7V.Visible = true;
      this.btnToggle7V.Value = false;
      this.btnToggle7V.X = 762-256;
      this.btnToggle7V.Y = 839+256;
      this.btnToggle2V.Visible = false;
      this.btnToggle2V.Value = false;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.X = 762-256;
      this.btnToggle1V.Y = 899+256;
      this.btnToggle1V.Value = true;
      this.listRadioV.Visible = false;
      this.radioSelectedID = 0;
      this.updateSelectedRadio();
      this.buildFMList();   
   }
   
   this.set12Load = function() {
      this.printAction();
      IR.Log("LOAD MEDIA FM1,FM2,HUMAX,XBMC,APPLETV,OFF DEFAULT");
      //H
      this.txtItem3H.Visible = true;
      this.txtItem3H.Text = "FM радио №1";
      this.txtItem3H.X = 464;
      this.txtItem3H.Y = 603;
      this.txtItem4H.Text = "FM радио №2";
      this.txtItem4H.Visible = true;
      this.txtItem4H.X = 464;
      this.txtItem4H.Y = 663;
      this.txtItem5H.Visible = true;
      this.txtItem5H.Text = "Спутниковое ТВ";
      this.txtItem5H.X = 464;
      this.txtItem5H.Y = 723;
      this.txtItem6H.Visible = true;
      this.txtItem6H.Text = "Медиаплеер";
      this.txtItem6H.X = 464;
      this.txtItem6H.Y = 783;
      this.txtItem7H.Visible = true;
      this.txtItem7H.Text = "AppleTV";
      this.txtItem7H.X = 464;
      this.txtItem7H.Y = 843;
      this.txtItem2H.Visible = false;
      this.txtItem1H.Text = "Выключить";
      this.txtItem1H.X = 464;
      this.txtItem1H.Y = 903;
      this.txtItem1H.Visible = true;
      this.txtItem8H.Text = "Выбрано: ";
      this.txtItem8H.X = 800;
      this.txtItem8H.Y = 980;
      this.txtItem9H.GetState(0).TextAlign = 1;
      this.txtItem9H.X = 1100;
      this.txtItem9H.Y = 980;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle3H.Visible = true;
      this.btnToggle3H.X = 762;
      this.btnToggle3H.Y = 590;
      this.btnToggle3H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[3];
      this.btnToggle4H.Visible = true;
      this.btnToggle4H.X = 762;
      this.btnToggle4H.Y = 659;
      this.btnToggle4H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[4];
      this.btnToggle5H.Visible = true;
      this.btnToggle5H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[5];
      this.btnToggle5H.X = 762;
      this.btnToggle5H.Y = 719;
      this.btnToggle6H.Visible = true;
      this.btnToggle6H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[6];
      this.btnToggle6H.X = 762;
      this.btnToggle6H.Y = 779;
      this.btnToggle7H.Visible = true;
      this.btnToggle7H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[7];
      this.btnToggle7H.X = 762;
      this.btnToggle7H.Y = 839;
      this.btnToggle2H.Visible = false;
      this.btnToggle2H.Value = false;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.X = 762;
      this.btnToggle1H.Y = 899;
      this.btnToggle1H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      //V
      this.txtItem3V.Visible = true;
      this.txtItem3V.Text = "FM радио №1";
      this.txtItem3V.X = 464-256;
      this.txtItem3V.Y = 603+256;
      this.txtItem4V.Text = "FM радио №2";
      this.txtItem4V.Visible = true;
      this.txtItem4V.X = 464-256;
      this.txtItem4V.Y = 663+256;
      this.txtItem5V.Visible = true;
      this.txtItem5V.Text = "Спутниковое ТВ";
      this.txtItem5V.X = 464-256;
      this.txtItem5V.Y = 723+256;
      this.txtItem6V.Visible = true;
      this.txtItem6V.Text = "Медиаплеер";
      this.txtItem6V.X = 464-256;
      this.txtItem6V.Y = 783+256;
      this.txtItem7V.Visible = true;
      this.txtItem7V.Text = "AppleTV";
      this.txtItem7V.X = 464-256;
      this.txtItem7V.Y = 843+256;
      this.txtItem2V.Visible = false;
      this.txtItem1V.Text = "Выключить";
      this.txtItem1V.X = 464-256;
      this.txtItem1V.Y = 903+256;
      this.txtItem1V.Visible = true;
      this.txtItem8V.Text = "Выбрано: ";
      this.txtItem8V.X = 800-256;
      this.txtItem8V.Y = 980+256;
      this.txtItem9V.GetState(0).TextAlign = 1;
      this.txtItem9V.X = 1100-256;
      this.txtItem9V.Y = 980+256;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle3V.Visible = true;
      this.btnToggle3V.X = 762-256;
      this.btnToggle3V.Y = 590+256;
      this.btnToggle3V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[3];
      this.btnToggle4V.Visible = true;
      this.btnToggle4V.X = 762-256;
      this.btnToggle4V.Y = 659+256;
      this.btnToggle4V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[4];
      this.btnToggle5V.Visible = true;
      this.btnToggle5V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[5];
      this.btnToggle5V.X = 762-256;
      this.btnToggle5V.Y = 719+256;
      this.btnToggle6V.Visible = true;
      this.btnToggle6V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[6];
      this.btnToggle6V.X = 762-256;
      this.btnToggle6V.Y = 779+256;
      this.btnToggle7V.Visible = true;
      this.btnToggle7V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[7];
      this.btnToggle7V.X = 762-256;
      this.btnToggle7V.Y = 839+256;
      this.btnToggle2V.Visible = false;
      this.btnToggle2V.Value = false;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.X = 762-256;
      this.btnToggle1V.Y = 899+256;
      this.btnToggle1V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      if (this.btnToggle3H.Value || this.btnToggle4H.Value || this.btnToggle3V.Value || this.btnToggle4V.Value) {
         //H
         this.txtItem8H.Visible = true;
         this.txtItem8H.Text = "Выбрано: ";
         this.txtItem8H.X = 800;
         this.txtItem8H.Y = 980;
         this.txtItem9H.Visible = true;
         this.txtItem9H.GetState(0).TextAlign = 1;
         this.txtItem9H.X = 1100;
         this.txtItem9H.Y = 980;
         this.listRadioH.Visible = true;
         //V
         this.txtItem8V.Visible = true;
         this.txtItem8V.Text = "Выбрано: ";
         this.txtItem8V.X = 800-256;
         this.txtItem8V.Y = 980+256;
         this.txtItem9V.Visible = true;
         this.txtItem9V.GetState(0).TextAlign = 1;
         this.txtItem9V.X = 1100-256;
         this.txtItem9V.Y = 980+256;
         this.radioSelectedID = this.sceneArray[this.id][this.actionID][3].split(" ")[2];
         this.updateSelectedRadio();
         this.listRadio.Visible = true;
      } else {
         //H
         this.txtItem8H.Visible = false;
         this.txtItem8H.Text = "Выбрано: ";
         this.txtItem8H.X = 800;
         this.txtItem8H.Y = 980;
         this.txtItem9H.Visible = false;
         this.txtItem9H.GetState(0).TextAlign = 1;
         this.txtItem9H.X = 1100;
         this.txtItem9H.Y = 980;
         this.listRadioH.Visible = false;
         //V
         this.txtItem8V.Visible = false;
         this.txtItem8V.Text = "Выбрано: ";
         this.txtItem8V.X = 800-256;
         this.txtItem8V.Y = 980+256;
         this.txtItem9V.Visible = false;
         this.txtItem9V.GetState(0).TextAlign = 1;
         this.txtItem9V.X = 1100-256;
         this.txtItem9V.Y = 980+256;
         this.listRadioV.Visible = false;
         this.radioSelectedID = 0;
         this.updateSelectedRadio();
         
      }
      this.buildFMList();   
   }
   
   this.set11Default = function() {
      IR.Log("SET MEDIA FM1,HUMAX,XBMC,APPLETV,OFF DEFAULT");
      //H
      this.txtItem3H.Visible = true;
      this.txtItem3H.Text = "FM радио №1";
      this.txtItem3H.X = 464;
      this.txtItem3H.Y = 603;
      this.txtItem4H.Visible = false;
      this.txtItem5H.Visible = true;
      this.txtItem5H.Text = "Спутниковое ТВ";
      this.txtItem5H.X = 464;
      this.txtItem5H.Y = 663;
      this.txtItem6H.Visible = true;
      this.txtItem6H.Text = "Медиаплеер";
      this.txtItem6H.X = 464;
      this.txtItem6H.Y = 723;
      this.txtItem7H.Visible = true;
      this.txtItem7H.Text = "AppleTV";
      this.txtItem7H.X = 464;
      this.txtItem7H.Y = 783;
      this.txtItem2H.Visible = false;
      this.txtItem1H.Text = "Выключить";
      this.txtItem1H.X = 464;
      this.txtItem1H.Y = 843;
      this.txtItem1H.Visible = true;
      this.txtItem8H.Visible = false;
      this.txtItem8H.Text = "Выбрано: ";
      this.txtItem8H.X = 800;
      this.txtItem8H.Y = 980;
      this.txtItem9H.Visible = false;
      this.txtItem9H.GetState(0).TextAlign = 1;
      this.txtItem9H.X = 1100;
      this.txtItem9H.Y = 980;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle3H.Visible = true;
      this.btnToggle3H.X = 762;
      this.btnToggle3H.Y = 590;
      this.btnToggle3H.Value = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle4H.Value = false;
      this.btnToggle5H.Visible = true;
      this.btnToggle5H.Value = false;
      this.btnToggle5H.X = 762;
      this.btnToggle5H.Y = 659;
      this.btnToggle6H.Visible = true;
      this.btnToggle6H.Value = false;
      this.btnToggle6H.X = 762;
      this.btnToggle6H.Y = 719;
      this.btnToggle7H.Visible = true;
      this.btnToggle7H.Value = false;
      this.btnToggle7H.X = 762;
      this.btnToggle7H.Y = 779;
      this.btnToggle2H.Visible = false;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.X = 762;
      this.btnToggle1H.Y = 839;
      this.btnToggle1H.Value = true;
      this.listRadioH.Visible = false;
      //V
      this.txtItem3V.Visible = true;
      this.txtItem3V.Text = "FM радио №1";
      this.txtItem3V.X = 464-256;
      this.txtItem3V.Y = 603+256;
      this.txtItem4V.Visible = false;
      this.txtItem5V.Visible = true;
      this.txtItem5V.Text = "Спутниковое ТВ";
      this.txtItem5V.X = 464-256;
      this.txtItem5V.Y = 663+256;
      this.txtItem6V.Visible = true;
      this.txtItem6V.Text = "Медиаплеер";
      this.txtItem6V.X = 464-256;
      this.txtItem6V.Y = 723+256;
      this.txtItem7V.Visible = true;
      this.txtItem7V.Text = "AppleTV";
      this.txtItem7V.X = 464-256;
      this.txtItem7V.Y = 783+256;
      this.txtItem2V.Visible = false;
      this.txtItem1V.Text = "Выключить";
      this.txtItem1V.X = 464-256;
      this.txtItem1V.Y = 843+256;
      this.txtItem1V.Visible = true;
      this.txtItem8V.Visible = false;
      this.txtItem8V.Text = "Выбрано: ";
      this.txtItem8V.X = 800-256;
      this.txtItem8V.Y = 980+256;
      this.txtItem9V.Visible = false;
      this.txtItem9V.GetState(0).TextAlign = 1;
      this.txtItem9V.X = 1100-256;
      this.txtItem9V.Y = 980+256;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle3V.Visible = true;
      this.btnToggle3V.X = 762-256;
      this.btnToggle3V.Y = 590+256;
      this.btnToggle3V.Value = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle4V.Value = false;
      this.btnToggle5V.Visible = true;
      this.btnToggle5V.Value = false;
      this.btnToggle5V.X = 762-256;
      this.btnToggle5V.Y = 659+256;
      this.btnToggle6V.Visible = true;
      this.btnToggle6V.Value = false;
      this.btnToggle6V.X = 762-256;
      this.btnToggle6V.Y = 719+256;
      this.btnToggle7V.Visible = true;
      this.btnToggle7V.Value = false;
      this.btnToggle7V.X = 762-256;
      this.btnToggle7V.Y = 779+256;
      this.btnToggle2V.Visible = false;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.X = 762-256;
      this.btnToggle1V.Y = 839+256;
      this.btnToggle1V.Value = true;
      this.listRadioV.Visible = false;
      this.buildFMList();
      this.radioSelectedID = 0;
      this.updateSelectedRadio();   
   }
   
   this.set11Load = function() {
      this.printAction();
      IR.Log("LOAD MEDIA FM1,HUMAX,XBMC,APPLETV,OFF DEFAULT");
      //H
      this.txtItem3H.Visible = true;
      this.txtItem3H.Text = "FM радио №1";
      this.txtItem3H.X = 464;
      this.txtItem3H.Y = 603;
      this.txtItem4H.Visible = false;
      this.txtItem5H.Visible = true;
      this.txtItem5H.Text = "Спутниковое ТВ";
      this.txtItem5H.X = 464;
      this.txtItem5H.Y = 663;
      this.txtItem6H.Visible = true;
      this.txtItem6H.Text = "Медиаплеер";
      this.txtItem6H.X = 464;
      this.txtItem6H.Y = 723;
      this.txtItem7H.Visible = true;
      this.txtItem7H.Text = "AppleTV";
      this.txtItem7H.X = 464;
      this.txtItem7H.Y = 783;
      this.txtItem2H.Visible = false;
      this.txtItem1H.Text = "Выключить";
      this.txtItem1H.X = 464;
      this.txtItem1H.Y = 843;
      this.txtItem1H.Visible = true;
      this.txtItem8H.Text = "Выбрано: ";
      this.txtItem8H.X = 800;
      this.txtItem8H.Y = 980;
      this.txtItem9H.GetState(0).TextAlign = 1;
      this.txtItem9H.X = 1100;
      this.txtItem9H.Y = 980;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle3H.Visible = true;
      this.btnToggle3H.X = 762;
      this.btnToggle3H.Y = 590;
      this.btnToggle3H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[3];
      this.btnToggle4H.Visible = false;
      this.btnToggle4H.Value = false;
      this.btnToggle5H.Visible = true;
      this.btnToggle5H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[5];
      this.btnToggle5H.X = 762;
      this.btnToggle5H.Y = 659;
      this.btnToggle6H.Visible = true;
      this.btnToggle6H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[6];
      this.btnToggle6H.X = 762;
      this.btnToggle6H.Y = 719;
      this.btnToggle7H.Visible = true;
      this.btnToggle7H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[7];
      this.btnToggle7H.X = 762;
      this.btnToggle7H.Y = 779;
      this.btnToggle2H.Visible = false;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.X = 762;
      this.btnToggle1H.Y = 839;
      this.btnToggle1H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      //V
      this.txtItem3V.Visible = true;
      this.txtItem3V.Text = "FM радио №1";
      this.txtItem3V.X = 464-256;
      this.txtItem3V.Y = 603+256;
      this.txtItem4V.Visible = false;
      this.txtItem5V.Visible = true;
      this.txtItem5V.Text = "Спутниковое ТВ";
      this.txtItem5V.X = 464-256;
      this.txtItem5V.Y = 663+256;
      this.txtItem6V.Visible = true;
      this.txtItem6V.Text = "Медиаплеер";
      this.txtItem6V.X = 464-256;
      this.txtItem6V.Y = 723+256;
      this.txtItem7V.Visible = true;
      this.txtItem7V.Text = "AppleTV";
      this.txtItem7V.X = 464-256;
      this.txtItem7V.Y = 783+256;
      this.txtItem2V.Visible = false;
      this.txtItem1V.Text = "Выключить";
      this.txtItem1V.X = 464-256;
      this.txtItem1V.Y = 843+256;
      this.txtItem1V.Visible = true;
      this.txtItem8V.Text = "Выбрано: ";
      this.txtItem8V.X = 800-256;
      this.txtItem8V.Y = 980+256;
      this.txtItem9V.GetState(0).TextAlign = 1;
      this.txtItem9V.X = 1100-256;
      this.txtItem9V.Y = 980+256;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle3V.Visible = true;
      this.btnToggle3V.X = 762-256;
      this.btnToggle3V.Y = 590+256;
      this.btnToggle3V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[3];
      this.btnToggle4V.Visible = false;
      this.btnToggle4V.Value = false;
      this.btnToggle5V.Visible = true;
      this.btnToggle5V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[5];
      this.btnToggle5V.X = 762-256;
      this.btnToggle5V.Y = 659+256;
      this.btnToggle6V.Visible = true;
      this.btnToggle6V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[6];
      this.btnToggle6V.X = 762-256;
      this.btnToggle6V.Y = 719+256;
      this.btnToggle7V.Visible = true;
      this.btnToggle7V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[7];
      this.btnToggle7V.X = 762-256;
      this.btnToggle7V.Y = 779+256;
      this.btnToggle2V.Visible = false;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.X = 762-256;
      this.btnToggle1V.Y = 839+256;
      this.btnToggle1V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      if (this.btnToggle3H.Value || this.btnToggle4H.Value || this.btnToggle3V.Value || this.btnToggle4V.Value) {
         IR.Log("TRUE");
         this.txtItem8H.Visible = true;
         this.txtItem8H.Text = "Выбрано: ";
         this.txtItem8H.X = 800;
         this.txtItem8H.Y = 980;
         this.txtItem9H.Visible = true;
         this.txtItem9H.GetState(0).TextAlign = 1;
         this.txtItem9H.X = 1100;
         this.txtItem9H.Y = 980;
         this.listRadioH.Visible = true;
         //V
         this.txtItem8V.Visible = true;
         this.txtItem8V.Text = "Выбрано: ";
         this.txtItem8V.X = 800-256;
         this.txtItem8V.Y = 980+256;
         this.txtItem9V.Visible = true;
         this.txtItem9V.GetState(0).TextAlign = 1;
         this.txtItem9V.X = 1100-256;
         this.txtItem9V.Y = 980+256;
         this.listRadioV.Visible = true;
         this.radioSelectedID = this.sceneArray[this.id][this.actionID][3].split(" ")[2];
         this.updateSelectedRadio();
      } else {
         IR.Log("FALSE");
         this.txtItem8H.Visible = false;
         this.txtItem8H.Text = "Выбрано: ";
         this.txtItem8H.X = 800;
         this.txtItem8H.Y = 980;
         this.txtItem9H.Visible = false;
         this.txtItem9H.GetState(0).TextAlign = 1;
         this.txtItem9H.X = 1100;
         this.txtItem9H.Y = 980;
         this.listRadioH.Visible = false;
         //V
         this.txtItem8V.Visible = false;
         this.txtItem8V.Text = "Выбрано: ";
         this.txtItem8V.X = 800-256;
         this.txtItem8V.Y = 980+256;
         this.txtItem9V.Visible = false;
         this.txtItem9V.GetState(0).TextAlign = 1;
         this.txtItem9V.X = 1100-256;
         this.txtItem9V.Y = 980+256;
         this.listRadioV.Visible = false;
         this.radioSelectedID = 0;
         this.updateSelectedRadio();
      }
      this.buildFMList();   
   }
   
   this.set10Default = function() {
      IR.Log("SET MEDIA FM1,FM2,OFF DEFAULT");
      this.txtItem3H.Visible = true;
      this.txtItem3H.Text = "FM радио №1";
      this.txtItem3H.X = 464;
      this.txtItem3H.Y = 603;
      this.txtItem4H.Text = "FM радио №2";
      this.txtItem4H.Visible = true;
      this.txtItem4H.X = 464;
      this.txtItem4H.Y = 663;
      this.txtItem2H.Visible = false;
      this.txtItem1H.Text = "Выключить";
      this.txtItem1H.X = 464;
      this.txtItem1H.Y = 723;
      this.txtItem1H.Visible = true;
      this.txtItem8H.Visible = false;
      this.txtItem8H.Text = "Выбрано: ";
      this.txtItem8H.X = 800;
      this.txtItem8H.Y = 980;
      this.txtItem9H.Visible = false;
      this.txtItem9H.GetState(0).TextAlign = 1;
      this.txtItem9H.X = 1100;
      this.txtItem9H.Y = 980;
      this.txtItem5H.Visible = false;
      this.txtItem6H.Visible = false;
      this.txtItem7H.Visible = false;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle3H.Visible = true;
      this.btnToggle3H.X = 762;
      this.btnToggle3H.Y = 590;
      this.btnToggle3H.Value = false;
      this.btnToggle4H.Visible = true;
      this.btnToggle4H.X = 762;
      this.btnToggle4H.Y = 659;
      this.btnToggle4H.Value = false;
      this.btnToggle2H.Visible = false;
      this.btnToggle2H.Value = false;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.X = 762;
      this.btnToggle1H.Y = 719;
      this.btnToggle1H.Value = true;
      this.btnToggle5H.Visible = false;
      this.btnToggle5H.Value = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle6H.Value = false;
      this.btnToggle7H.Visible = false;
      this.btnToggle7H.Value = false;
      this.listRadioH.Visible = false;
      //V
      this.txtItem3V.Visible = true;
      this.txtItem3V.Text = "FM радио №1";
      this.txtItem3V.X = 464-256;
      this.txtItem3V.Y = 603+256;
      this.txtItem4V.Text = "FM радио №2";
      this.txtItem4V.Visible = true;
      this.txtItem4V.X = 464-256;
      this.txtItem4V.Y = 663+256;
      this.txtItem2V.Visible = false;
      this.txtItem1V.Text = "Выключить";
      this.txtItem1V.X = 464-256;
      this.txtItem1V.Y = 723+256;
      this.txtItem1V.Visible = true;
      this.txtItem8V.Visible = false;
      this.txtItem8V.Text = "Выбрано: ";
      this.txtItem8V.X = 800-256;
      this.txtItem8V.Y = 980+256;
      this.txtItem9V.Visible = false;
      this.txtItem9V.GetState(0).TextAlign = 1;
      this.txtItem9V.X = 1100-256;
      this.txtItem9V.Y = 980+256;
      this.txtItem5V.Visible = false;
      this.txtItem6V.Visible = false;
      this.txtItem7V.Visible = false;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle3V.Visible = true;
      this.btnToggle3V.X = 762-256;
      this.btnToggle3V.Y = 590+256;
      this.btnToggle3V.Value = false;
      this.btnToggle4V.Visible = true;
      this.btnToggle4V.X = 762-256;
      this.btnToggle4V.Y = 659+256;
      this.btnToggle4V.Value = false;
      this.btnToggle2V.Visible = false;
      this.btnToggle2V.Value = false;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.X = 762-256;
      this.btnToggle1V.Y = 719+256;
      this.btnToggle1V.Value = true;
      this.btnToggle5V.Visible = false;
      this.btnToggle5V.Value = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle6V.Value = false;
      this.btnToggle7V.Visible = false;
      this.btnToggle7V.Value = false;
      this.listRadioV.Visible = false;
      this.radioSelectedID = 0;
      this.updateSelectedRadio();
      this.buildFMList();   
   }
   
   this.set10Load = function() {
      this.printAction();
      IR.Log("SET MEDIA FM1,FM2,OFF LOAD");
      this.txtItem3H.Visible = true;
      this.txtItem3H.Text = "FM радио №1";
      this.txtItem3H.X = 464;
      this.txtItem3H.Y = 603;
      this.txtItem4H.Text = "FM радио №2";
      this.txtItem4H.Visible = true;
      this.txtItem4H.X = 464;
      this.txtItem4H.Y = 663;
      this.txtItem2H.Visible = false;
      this.txtItem1H.Text = "Выключить";
      this.txtItem1H.X = 464;
      this.txtItem1H.Y = 723;
      this.txtItem1H.Visible = true;
      this.txtItem8H.Text = "Выбрано: ";
      this.txtItem8H.X = 800;
      this.txtItem8H.Y = 980;
      this.txtItem9H.GetState(0).TextAlign = 1;
      this.txtItem5H.Visible = false;
      this.txtItem6H.Visible = false;
      this.txtItem7H.Visible = false;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle2H.Visible = false;
      this.btnToggle2H.Value = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle5H.Value = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle6H.Value = false;
      this.btnToggle7H.Visible = false;
      this.btnToggle7H.Value = false;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.X = 762;
      this.btnToggle1H.Y = 719;
      this.btnToggle1H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      this.btnToggle3H.Visible = true;
      this.btnToggle3H.X = 762;
      this.btnToggle3H.Y = 590;
      this.btnToggle3H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[3];
      this.btnToggle4H.Visible = true;
      this.btnToggle4H.X = 762;
      this.btnToggle4H.Y = 659;
      this.btnToggle4H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[4];
      //V
      this.txtItem3V.Visible = true;
      this.txtItem3V.Text = "FM радио №1";
      this.txtItem3V.X = 464-256;
      this.txtItem3V.Y = 603+256;
      this.txtItem4V.Text = "FM радио №2";
      this.txtItem4V.Visible = true;
      this.txtItem4V.X = 464-256;
      this.txtItem4V.Y = 663+256;
      this.txtItem2V.Visible = false;
      this.txtItem1V.Text = "Выключить";
      this.txtItem1V.X = 464-256;
      this.txtItem1V.Y = 723+256;
      this.txtItem1V.Visible = true;
      this.txtItem8V.Text = "Выбрано: ";
      this.txtItem8V.X = 800-256;
      this.txtItem8V.Y = 980+256;
      this.txtItem9V.GetState(0).TextAlign = 1;
      this.txtItem5V.Visible = false;
      this.txtItem6V.Visible = false;
      this.txtItem7V.Visible = false;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle2V.Visible = false;
      this.btnToggle2V.Value = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle5V.Value = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle6V.Value = false;
      this.btnToggle7V.Visible = false;
      this.btnToggle7V.Value = false;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.X = 762-256;
      this.btnToggle1V.Y = 719+256;
      this.btnToggle1V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      this.btnToggle3V.Visible = true;
      this.btnToggle3V.X = 762-256;
      this.btnToggle3V.Y = 590+256;
      this.btnToggle3V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[3];
      this.btnToggle4V.Visible = true;
      this.btnToggle4V.X = 762-256;
      this.btnToggle4V.Y = 659+256;
      this.btnToggle4V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[4];
      if (this.btnToggle3.Value || this.btnToggle4.Value) {
         IR.Log("TRUE");
         this.txtItem8H.Visible = true;
         this.txtItem8H.Text = "Выбрано: ";
         this.txtItem8H.X = 800;
         this.txtItem8H.Y = 980;
         this.txtItem9H.Visible = true;
         this.txtItem9H.GetState(0).TextAlign = 1;
         this.txtItem9H.X = 1100;
         this.txtItem9H.Y = 980;
         this.listRadioH.Visible = true;
         //V
         this.txtItem8V.Visible = true;
         this.txtItem8V.Text = "Выбрано: ";
         this.txtItem8V.X = 800-256;
         this.txtItem8V.Y = 980+256;
         this.txtItem9V.Visible = true;
         this.txtItem9V.GetState(0).TextAlign = 1;
         this.txtItem9V.X = 1100-256;
         this.txtItem9V.Y = 980+256;
         this.listRadioV.Visible = true;
         this.radioSelectedID = this.sceneArray[this.id][this.actionID][3].split(" ")[2];
         this.updateSelectedRadio();
      } else {
         IR.Log("FALSE");
         this.txtItem8H.Visible = false;
         this.txtItem8H.Text = "Выбрано: ";
         this.txtItem8H.X = 800;
         this.txtItem8H.Y = 980;
         this.txtItem9H.Visible = false;
         this.txtItem9H.GetState(0).TextAlign = 1;
         this.txtItem9H.X = 1100;
         this.txtItem9H.Y = 980;
         this.listRadioH.Visible = false;
         //V
         this.txtItem8V.Visible = false;
         this.txtItem8V.Text = "Выбрано: ";
         this.txtItem8V.X = 800;
         this.txtItem8V.Y = 980;
         this.txtItem9V.Visible = false;
         this.txtItem9V.GetState(0).TextAlign = 1;
         this.txtItem9V.X = 1100;
         this.txtItem9V.Y = 980;
         this.listRadioV.Visible = false;
         this.radioSelectedID = 0;
         this.updateSelectedRadio();
      }
      this.buildFMList();
   }
   
   this.set9Default = function() {
      IR.Log("SET SOCKET UI DEFAULT");
      this.txtItem1H.Text = "Выкл./Вкл.";
      this.txtItem1H.Visible = true;
      this.txtItem1H.X = 620;
      this.txtItem1H.Y = 800;
      this.txtItem2H.Visible = false;
      this.txtItem3H.Visible = false;
      this.txtItem4H.Visible = false;
      this.txtItem5H.Visible = false;
      this.txtItem6H.Visible = false;
      this.txtItem7H.Visible = false;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.Value = false;
      this.btnToggle1H.X = 948;
      this.btnToggle1H.Y = 800;
      this.btnToggle2H.Visible = false;
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //V 
      this.txtItem1V.Text = "Выкл./Вкл.";
      this.txtItem1V.Visible = true;
      this.txtItem1V.X = 620-256;
      this.txtItem1V.Y = 800+256;
      this.txtItem2V.Visible = false;
      this.txtItem3V.Visible = false;
      this.txtItem4V.Visible = false;
      this.txtItem5V.Visible = false;
      this.txtItem6V.Visible = false;
      this.txtItem7V.Visible = false;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.Value = false;
      this.btnToggle1V.X = 948-256;
      this.btnToggle1V.Y = 800+256;
      this.btnToggle2V.Visible = false;
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;  
   }
   
   this.set9Load = function() {
      IR.Log("SET SOCKET UI DEFAULT");
      this.txtItem1H.Text = "Выкл./Вкл.";
      this.txtItem1H.Visible = true;
      this.txtItem1H.X = 620;
      this.txtItem1H.Y = 800;
      this.txtItem2H.Visible = false;
      this.txtItem3H.Visible = false;
      this.txtItem4H.Visible = false;
      this.txtItem5H.Visible = false;
      this.txtItem6H.Visible = false;
      this.txtItem7H.Visible = false;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      this.btnToggle1H.X = 948;
      this.btnToggle1H.Y = 800;
      this.btnToggle2H.Visible = false;
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;  
      //V
      this.txtItem1V.Text = "Выкл./Вкл.";
      this.txtItem1V.Visible = true;
      this.txtItem1V.X = 620-256;
      this.txtItem1V.Y = 800+256;
      this.txtItem2V.Visible = false;
      this.txtItem3V.Visible = false;
      this.txtItem4V.Visible = false;
      this.txtItem5V.Visible = false;
      this.txtItem6V.Visible = false;
      this.txtItem7V.Visible = false;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      this.btnToggle1V.X = 948-256;
      this.btnToggle1V.Y = 800+256;
      this.btnToggle2V.Visible = false;
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;  
   }
   
   this.set8Default = function() {
      IR.Log("SET FAN UI DEFAULT");
      this.txtItem1H.Text = "Выкл./Вкл.";
      this.txtItem1H.Visible = true;
      this.txtItem1H.X = 620;
      this.txtItem1H.Y = 800;
      this.txtItem2H.Visible = false;
      this.txtItem3H.Visible = false;
      this.txtItem4H.Visible = false;
      this.txtItem5H.Visible = false;
      this.txtItem6H.Visible = false;
      this.txtItem7H.Visible = false;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.Value = false;
      this.btnToggle1H.X = 948;
      this.btnToggle1H.Y = 800;
      this.btnToggle2H.Visible = false;
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //V
      this.txtItem1V.Text = "Выкл./Вкл.";
      this.txtItem1V.Visible = true;
      this.txtItem1V.X = 620-256;
      this.txtItem1V.Y = 800+256;
      this.txtItem2V.Visible = false;
      this.txtItem3V.Visible = false;
      this.txtItem4V.Visible = false;
      this.txtItem5V.Visible = false;
      this.txtItem6V.Visible = false;
      this.txtItem7V.Visible = false;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.Value = false;
      this.btnToggle1V.X = 948-256;
      this.btnToggle1V.Y = 800+256;
      this.btnToggle2V.Visible = false;
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;   
   }
   
   this.set8Load = function() {
      IR.Log("SET FAN UI DEFAULT");
      this.txtItem1H.Text = "Выкл./Вкл.";
      this.txtItem1H.Visible = true;
      this.txtItem1H.X = 620;
      this.txtItem1H.Y = 800;
      this.txtItem2H.Visible = false;
      this.txtItem3H.Visible = false;
      this.txtItem4H.Visible = false;
      this.txtItem5H.Visible = false;
      this.txtItem6H.Visible = false;
      this.txtItem7H.Visible = false;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      this.btnToggle1H.X = 948;
      this.btnToggle1H.Y = 800;
      this.btnToggle2H.Visible = false;
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //V 
      this.txtItem1V.Text = "Выкл./Вкл.";
      this.txtItem1V.Visible = true;
      this.txtItem1V.X = 620-256;
      this.txtItem1V.Y = 800+256;
      this.txtItem2V.Visible = false;
      this.txtItem3V.Visible = false;
      this.txtItem4V.Visible = false;
      this.txtItem5V.Visible = false;
      this.txtItem6V.Visible = false;
      this.txtItem7V.Visible = false;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      this.btnToggle1V.X = 948-256;
      this.btnToggle1V.Y = 800+256;
      this.btnToggle2V.Visible = false;
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;  
   }
   
   this.set7Default = function() {
      IR.Log("SET SHADEPULSE UI DEFAULT");
      this.txtItem1H.Text = "Закрыть/Открыть";
      this.txtItem1H.Visible = true;
      this.txtItem1H.X = 620;
      this.txtItem1H.Y = 800;
      this.txtItem2H.Visible = false;
      this.txtItem3H.Visible = false;
      this.txtItem4H.Visible = false;
      this.txtItem5H.Visible = false;
      this.txtItem6H.Visible = false;
      this.txtItem7H.Visible = false;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.Value = false;
      this.btnToggle1H.X = 948;
      this.btnToggle1H.Y = 800;
      this.btnToggle2H.Visible = false;
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //V
      this.txtItem1V.Text = "Закрыть/Открыть";
      this.txtItem1V.Visible = true;
      this.txtItem1V.X = 620-256;
      this.txtItem1V.Y = 800+256;
      this.txtItem2V.Visible = false;
      this.txtItem3V.Visible = false;
      this.txtItem4V.Visible = false;
      this.txtItem5V.Visible = false;
      this.txtItem6V.Visible = false;
      this.txtItem7V.Visible = false;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.Value = false;
      this.btnToggle1V.X = 948-256;
      this.btnToggle1V.Y = 800+256;
      this.btnToggle2V.Visible = false;
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;   
   }
   
   this.set7Load = function() {
      IR.Log("SET SHADEPULSE UI DEFAULT");
      this.txtItem1H.Text = "Закрыть/Открыть";
      this.txtItem1H.Visible = true;
      this.txtItem1H.X = 620;
      this.txtItem1H.Y = 800;
      this.txtItem2H.Visible = false;
      this.txtItem3H.Visible = false;
      this.txtItem4H.Visible = false;
      this.txtItem5H.Visible = false;
      this.txtItem6H.Visible = false;
      this.txtItem7H.Visible = false;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      this.btnToggle1H.X = 948;
      this.btnToggle1H.Y = 800;
      this.btnToggle2H.Visible = false;
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //V
      this.txtItem1V.Text = "Закрыть/Открыть";
      this.txtItem1V.Visible = true;
      this.txtItem1V.X = 620-256;
      this.txtItem1V.Y = 800+256;
      this.txtItem2V.Visible = false;
      this.txtItem3V.Visible = false;
      this.txtItem4V.Visible = false;
      this.txtItem5V.Visible = false;
      this.txtItem6V.Visible = false;
      this.txtItem7V.Visible = false;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      this.btnToggle1V.X = 948-256;
      this.btnToggle1V.Y = 800+256;
      this.btnToggle2V.Visible = false;
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;   
   }
   
   this.set6Default = function() {
      IR.Log("SET SHADERULON UI DEFAULT");
      this.txtItem1H.Text = "Закрыть/Открыть";
      this.txtItem1H.Visible = true;
      this.txtItem1H.X = 620;
      this.txtItem1H.Y = 800;
      this.txtItem2H.Visible = false;
      this.txtItem3H.Visible = false;
      this.txtItem4H.Visible = false;
      this.txtItem5H.Visible = false;
      this.txtItem6H.Visible = false;
      this.txtItem7H.Visible = false;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.Value = false;
      this.btnToggle1H.X = 948;
      this.btnToggle1H.Y = 800;
      this.btnToggle2H.Visible = false;
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //V
      this.txtItem1V.Text = "Закрыть/Открыть";
      this.txtItem1V.Visible = true;
      this.txtItem1V.X = 620-256;
      this.txtItem1V.Y = 800+256;
      this.txtItem2V.Visible = false;
      this.txtItem3V.Visible = false;
      this.txtItem4V.Visible = false;
      this.txtItem5V.Visible = false;
      this.txtItem6V.Visible = false;
      this.txtItem7V.Visible = false;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.Value = false;
      this.btnToggle1V.X = 948-256;
      this.btnToggle1V.Y = 800+256;
      this.btnToggle2V.Visible = false;
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;   
   }
   
   this.set6Load = function() {
      IR.Log("SET SHADERULON UI DEFAULT");
      this.txtItem1H.Text = "Закрыть/Открыть";
      this.txtItem1H.Visible = true;
      this.txtItem1H.X = 620;
      this.txtItem1H.Y = 800;
      this.txtItem2H.Visible = false;
      this.txtItem3H.Visible = false;
      this.txtItem4H.Visible = false;
      this.txtItem5H.Visible = false;
      this.txtItem6H.Visible = false;
      this.txtItem7H.Visible = false;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      this.btnToggle1H.X = 948;
      this.btnToggle1H.Y = 800;
      this.btnToggle2H.Visible = false;
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //V
      this.txtItem1V.Text = "Закрыть/Открыть";
      this.txtItem1V.Visible = true;
      this.txtItem1V.X = 620-256;
      this.txtItem1V.Y = 800+256;
      this.txtItem2V.Visible = false;
      this.txtItem3V.Visible = false;
      this.txtItem4V.Visible = false;
      this.txtItem5V.Visible = false;
      this.txtItem6V.Visible = false;
      this.txtItem7V.Visible = false;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      this.btnToggle1V.X = 948-256;
      this.btnToggle1V.Y = 800+256;
      this.btnToggle2V.Visible = false;
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;   
   }
   
   this.set5Default = function() {
      IR.Log("SET RGBW LOCK MOTION DEFAULT");
      this.txtItem1H.Visible = false;
      this.txtItem2H.Text = "Яркость белого";
      this.txtItem2H.Visible = true;
      this.txtItem2H.X = 464;
      this.txtItem2H.Y = 663;
      this.txtItem3H.Text = "Яркость цветного";
      this.txtItem3H.Visible = true;
      this.txtItem3H.X = 464;
      this.txtItem3H.Y = 723;
      this.txtItem4H.Text = "Насыщенность";
      this.txtItem4H.Visible = true;
      this.txtItem4H.X = 464;
      this.txtItem4H.Y = 783;
      this.txtItem5H.Text = "Цвет";
      this.txtItem5H.Visible = true;
      this.txtItem5H.GetState(0).TextAlign = 3;
      this.txtItem5H.X = 464;
      this.txtItem5H.Y = 843;
      this.txtItem6H.Text = "Режим \"Лава\"";
      this.txtItem6H.Visible = true;
      this.txtItem6H.X = 464;
      this.txtItem6H.Y = 903;
      this.txtItem7H.Text = "Блокировка";
      this.txtItem7H.X = 464;
      this.txtItem7H.Y = 603;
      this.txtItem7H.Visible = true;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = true;
      this.lvlItem2H.X = 782;
      this.lvlItem2H.Y = 663;
      this.lvlItem2H.Value = 0;
      this.lvlItem3H.Visible = true;
      this.lvlItem3H.X = 782;
      this.lvlItem3H.Y = 723;
      this.lvlItem3H.Value = 0;
      this.lvlItem4H.Visible = true;
      this.lvlItem4H.X = 782;
      this.lvlItem4H.Y = 783;
      this.lvlItem4H.Value = 0;
      this.lvlItem5H.Visible = true;
      this.lvlItem5H.X = 782;
      this.lvlItem5H.Y = 843;
      this.lvlItem5H.Value = 0;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.X = 762;
      this.btnToggle1H.Y = 903;
      this.btnToggle1H.Value = false;
      this.btnToggle2H.Visible = true;
      this.btnToggle2H.X = 762
      this.btnToggle2H.Y = 593;
      this.btnToggle2H.Value = false;
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //V
      this.txtItem1V.Visible = false;
      this.txtItem2V.Text = "Яркость белого";
      this.txtItem2V.Visible = true;
      this.txtItem2V.X = 464-256;
      this.txtItem2V.Y = 663+256;
      this.txtItem3V.Text = "Яркость цветного";
      this.txtItem3V.Visible = true;
      this.txtItem3V.X = 464-256;
      this.txtItem3V.Y = 723+256;
      this.txtItem4V.Text = "Насыщенность";
      this.txtItem4V.Visible = true;
      this.txtItem4V.X = 464-256;
      this.txtItem4V.Y = 783+256;
      this.txtItem5V.Text = "Цвет";
      this.txtItem5V.Visible = true;
      this.txtItem5V.GetState(0).TextAlign = 3;
      this.txtItem5V.X = 464-256;
      this.txtItem5V.Y = 843+256;
      this.txtItem6V.Text = "Режим \"Лава\"";
      this.txtItem6V.Visible = true;
      this.txtItem6V.X = 464-256;
      this.txtItem6V.Y = 903+256;
      this.txtItem7V.Text = "Блокировка";
      this.txtItem7V.X = 464-256;
      this.txtItem7V.Y = 603+256;
      this.txtItem7V.Visible = true;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = true;
      this.lvlItem2V.X = 782-256;
      this.lvlItem2V.Y = 663+256;
      this.lvlItem2V.Value = 0;
      this.lvlItem3V.Visible = true;
      this.lvlItem3V.X = 782-256;
      this.lvlItem3V.Y = 723+256;
      this.lvlItem3V.Value = 0;
      this.lvlItem4V.Visible = true;
      this.lvlItem4V.X = 782-256;
      this.lvlItem4V.Y = 783+256;
      this.lvlItem4V.Value = 0;
      this.lvlItem5V.Visible = true;
      this.lvlItem5V.X = 782-256;
      this.lvlItem5V.Y = 843+256;
      this.lvlItem5V.Value = 0;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.X = 762-256;
      this.btnToggle1V.Y = 903+256;
      this.btnToggle1V.Value = false;
      this.btnToggle2V.Visible = true;
      this.btnToggle2V.X = 762-256;
      this.btnToggle2V.Y = 593+256;
      this.btnToggle2V.Value = false;
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;   
   }
   
   this.set5Load = function() {
      IR.Log("SET RGBW LOCK MOTION DEFAULT");
      this.txtItem1H.Visible = false;
      this.txtItem2H.Text = "Яркость белого";
      this.txtItem2H.Visible = true;
      this.txtItem2H.X = 464;
      this.txtItem2H.Y = 663;
      this.txtItem3H.Text = "Яркость цветного";
      this.txtItem3H.Visible = true;
      this.txtItem3H.X = 464;
      this.txtItem3H.Y = 723;
      this.txtItem4H.Text = "Насыщенность";
      this.txtItem4H.Visible = true;
      this.txtItem4H.X = 464;
      this.txtItem4H.Y = 783;
      this.txtItem5H.Text = "Цвет";
      this.txtItem5H.Visible = true;
      this.txtItem5H.GetState(0).TextAlign = 3;
      this.txtItem5H.X = 464;
      this.txtItem5H.Y = 843;
      this.txtItem6H.Text = "Режим \"Лава\"";
      this.txtItem6H.Visible = true;
      this.txtItem6H.X = 464;
      this.txtItem6H.Y = 903;
      this.txtItem7H.Text = "Блокировка";
      this.txtItem7H.X = 464;
      this.txtItem7H.Y = 603;
      this.txtItem7H.Visible = true;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = true;
      this.lvlItem2H.X = 782;
      this.lvlItem2H.Y = 663;
      this.lvlItem2H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[1];
      this.lvlItem3H.Visible = true;
      this.lvlItem3H.X = 782;
      this.lvlItem3H.Y = 723;
      this.lvlItem3H.Value = this.sceneArray[this.id][this.actionID][3].split(" ")[1];
      this.lvlItem4H.Visible = true;
      this.lvlItem4H.X = 782;
      this.lvlItem4H.Y = 783;
      this.lvlItem4H.Value = this.sceneArray[this.id][this.actionID][4].split(" ")[1];
      this.lvlItem5H.Visible = true;
      this.lvlItem5H.X = 782;
      this.lvlItem5H.Y = 843;
      this.lvlItem5H.Value = this.sceneArray[this.id][this.actionID][5].split(" ")[1];
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.X = 762;
      this.btnToggle1H.Y = 903;
      this.btnToggle1H.Value = this.sceneArray[this.id][this.actionID][6].split(" ")[2]; 
      this.btnToggle2H.Visible = true;
      this.btnToggle2H.X = 762
      this.btnToggle2H.Y = 593;
      this.btnToggle2H.Value = this.sceneArray[this.id][this.actionID][7].split(" ")[2];
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //V
      this.txtItem1V.Visible = false;
      this.txtItem2V.Text = "Яркость белого";
      this.txtItem2V.Visible = true;
      this.txtItem2V.X = 464-256;
      this.txtItem2V.Y = 663+256;
      this.txtItem3V.Text = "Яркость цветного";
      this.txtItem3V.Visible = true;
      this.txtItem3V.X = 464-256;
      this.txtItem3V.Y = 723+256;
      this.txtItem4V.Text = "Насыщенность";
      this.txtItem4V.Visible = true;
      this.txtItem4V.X = 464-256;
      this.txtItem4V.Y = 783+256;
      this.txtItem5V.Text = "Цвет";
      this.txtItem5V.Visible = true;
      this.txtItem5V.GetState(0).TextAlign = 3;
      this.txtItem5V.X = 464-256;
      this.txtItem5V.Y = 843+256;
      this.txtItem6V.Text = "Режим \"Лава\"";
      this.txtItem6V.Visible = true;
      this.txtItem6V.X = 464-256;
      this.txtItem6V.Y = 903+256;
      this.txtItem7V.Text = "Блокировка";
      this.txtItem7V.X = 464-256;
      this.txtItem7V.Y = 603+256;
      this.txtItem7V.Visible = true;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = true;
      this.lvlItem2V.X = 782-256;
      this.lvlItem2V.Y = 663+256;
      this.lvlItem2V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[1];
      this.lvlItem3V.Visible = true;
      this.lvlItem3V.X = 782-256;
      this.lvlItem3V.Y = 723+256;
      this.lvlItem3V.Value = this.sceneArray[this.id][this.actionID][3].split(" ")[1];
      this.lvlItem4V.Visible = true;
      this.lvlItem4V.X = 782-256;
      this.lvlItem4V.Y = 783+256;
      this.lvlItem4V.Value = this.sceneArray[this.id][this.actionID][4].split(" ")[1];
      this.lvlItem5V.Visible = true;
      this.lvlItem5V.X = 782-256;
      this.lvlItem5V.Y = 843+256;
      this.lvlItem5V.Value = this.sceneArray[this.id][this.actionID][5].split(" ")[1];
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.X = 762-256;
      this.btnToggle1V.Y = 903+256;
      this.btnToggle1V.Value = this.sceneArray[this.id][this.actionID][6].split(" ")[2]; 
      this.btnToggle2V.Visible = true;
      this.btnToggle2V.X = 762-256;
      this.btnToggle2V.Y = 593+256;
      this.btnToggle2V.Value = this.sceneArray[this.id][this.actionID][7].split(" ")[2];
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false; 
   }
   
   this.set4Default = function() {
      IR.Log("SET DIM MOTION LOCK DEFAULT");
      this.txtItem1H.Text = "Яркость";
      this.txtItem1H.Visible = true;
      this.txtItem1H.X = 460;
      this.txtItem1H.Y = 800;
      this.txtItem2H.Text = "Блокировка";
      this.txtItem2H.Visible = true;
      this.txtItem2H.X = 460;
      this.txtItem2H.Y = 860;
      this.txtItem3H.Visible = false;
      this.txtItem4H.Visible = false;
      this.txtItem5H.Visible = false;
      this.txtItem6H.Visible = false;
      this.txtItem7H.Visible = false;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = true;
      this.lvlItem1H.X = 788;
      this.lvlItem1H.Y = 800;
      this.lvlItem1H.Value = 0;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle2H.Visible = false;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.X = 762;
      this.btnToggle1H.Y = 860;
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //V
      this.txtItem1V.Text = "Яркость";
      this.txtItem1V.Visible = true;
      this.txtItem1V.X = 460-256;
      this.txtItem1V.Y = 800+256;
      this.txtItem2V.Text = "Блокировка";
      this.txtItem2V.Visible = true;
      this.txtItem2V.X = 460-256;
      this.txtItem2V.Y = 860+256;
      this.txtItem3V.Visible = false;
      this.txtItem4V.Visible = false;
      this.txtItem5V.Visible = false;
      this.txtItem6V.Visible = false;
      this.txtItem7V.Visible = false;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = true;
      this.lvlItem1V.X = 788-256;
      this.lvlItem1V.Y = 800+256;
      this.lvlItem1V.Value = 0;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle2V.Visible = false;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.X = 762-256;
      this.btnToggle1V.Y = 860+256;
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;   
   }
   
   this.set4Load = function() {
      IR.Log("SET DIM MOTION LOCK LOAD");
      this.txtItem1H.Text = "Яркость";
      this.txtItem1H.Visible = true;
      this.txtItem1H.X = 460;
      this.txtItem1H.Y = 800;
      this.txtItem2H.Text = "Блокировка";
      this.txtItem2H.Visible = true;
      this.txtItem2H.X = 460;
      this.txtItem2H.Y = 860;
      this.txtItem3H.Visible = false;
      this.txtItem4H.Visible = false;
      this.txtItem5H.Visible = false;
      this.txtItem6H.Visible = false;
      this.txtItem7H.Visible = false;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = true;
      this.lvlItem1H.X = 788;
      this.lvlItem1H.Y = 800;
      this.lvlItem1H.Value = this.sceneArray[this.id][this.actionID][3].split(" ")[1];
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle2H.Visible = false;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.X = 762;
      this.btnToggle1H.Y = 860;
      this.btnToggle1H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //V
      this.txtItem1V.Text = "Яркость";
      this.txtItem1V.Visible = true;
      this.txtItem1V.X = 460-256;
      this.txtItem1V.Y = 800+256;
      this.txtItem2V.Text = "Блокировка";
      this.txtItem2V.Visible = true;
      this.txtItem2V.X = 460-256;
      this.txtItem2V.Y = 860+256;
      this.txtItem3V.Visible = false;
      this.txtItem4V.Visible = false;
      this.txtItem5V.Visible = false;
      this.txtItem6V.Visible = false;
      this.txtItem7V.Visible = false;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = true;
      this.lvlItem1V.X = 788-256;
      this.lvlItem1V.Y = 800+256;
      this.lvlItem1V.Value = this.sceneArray[this.id][this.actionID][3].split(" ")[1];
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle2V.Visible = false;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.X = 762-256;
      this.btnToggle1V.Y = 860+256;
      this.btnToggle1V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;   
   }
   
   this.set3Default = function() {
      IR.Log("SET RGB UI DEFAULT");
      this.txtItem1H.Text = "Яркость";
      this.txtItem1H.Visible = true;
      this.txtItem1H.X = 464;
      this.txtItem1H.Y = 603;
      this.txtItem2H.Visible = false;
      this.txtItem3H.Visible = false;
      this.txtItem4H.Text = "Насыщенность";
      this.txtItem4H.Visible = true;
      this.txtItem4H.X = 464;
      this.txtItem4H.Y = 663;
      this.txtItem5H.Text = "Цвет";
      this.txtItem5H.Visible = true;
      this.txtItem5H.GetState(0).TextAlign = 3;
      this.txtItem5H.X = 464;
      this.txtItem5H.Y = 723;
      this.txtItem6H.Text = "Режим \"Лава\"";
      this.txtItem6H.Visible = true;
      this.txtItem6H.X = 464;
      this.txtItem6H.Y = 783;
      this.txtItem7H.Visible = false;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = true;
      this.lvlItem1H.X = 782;
      this.lvlItem1H.Y = 603;
      this.lvlItem1H.Value = 0;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = true;
      this.lvlItem4H.X = 782;
      this.lvlItem4H.Y = 663;
      this.lvlItem4H.Value = 0;
      this.lvlItem5H.Visible = true;
      this.lvlItem5H.X = 782;
      this.lvlItem5H.Y = 723;
      this.lvlItem5H.Value = 0;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.X = 762;
      this.btnToggle1H.Y = 783;
      this.btnToggle1H.Value = false;
      this.btnToggle2H.Visible = false;
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //V
      this.txtItem1V.Text = "Яркость";
      this.txtItem1V.Visible = true;
      this.txtItem1V.X = 464-256;
      this.txtItem1V.Y = 603+256;
      this.txtItem2V.Visible = false;
      this.txtItem3V.Visible = false;
      this.txtItem4V.Text = "Насыщенность";
      this.txtItem4V.Visible = true;
      this.txtItem4V.X = 464-256;
      this.txtItem4V.Y = 663+256;
      this.txtItem5V.Text = "Цвет";
      this.txtItem5V.Visible = true;
      this.txtItem5V.GetState(0).TextAlign = 3;
      this.txtItem5V.X = 464-256;
      this.txtItem5V.Y = 723+256;
      this.txtItem6V.Text = "Режим \"Лава\"";
      this.txtItem6V.Visible = true;
      this.txtItem6V.X = 464-256;
      this.txtItem6V.Y = 783+256;
      this.txtItem7V.Visible = false;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = true;
      this.lvlItem1V.X = 782-256;
      this.lvlItem1V.Y = 603+256;
      this.lvlItem1V.Value = 0;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = true;
      this.lvlItem4V.X = 782-256;
      this.lvlItem4V.Y = 663+256;
      this.lvlItem4V.Value = 0;
      this.lvlItem5V.Visible = true;
      this.lvlItem5V.X = 782-256;
      this.lvlItem5V.Y = 723+256;
      this.lvlItem5V.Value = 0;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.X = 762-256;
      this.btnToggle1V.Y = 783+256;
      this.btnToggle1V.Value = false;
      this.btnToggle2V.Visible = false;
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;   
   }
   
   this.set3Load = function() {
      IR.Log("SET RGB UI DEFAULT");
      this.txtItem1H.Text = "Яркость";
      this.txtItem1H.Visible = true;
      this.txtItem1H.X = 464;
      this.txtItem1H.Y = 603;
      this.txtItem2H.Visible = false;
      this.txtItem3H.Visible = false;
      this.txtItem4H.Text = "Насыщенность";
      this.txtItem4H.Visible = true;
      this.txtItem4H.X = 464;
      this.txtItem4H.Y = 663;
      this.txtItem5H.Text = "Цвет";
      this.txtItem5H.Visible = true;
      this.txtItem5H.GetState(0).TextAlign = 3;
      this.txtItem5H.X = 464;
      this.txtItem5H.Y = 723;
      this.txtItem6H.Text = "Режим \"Лава\"";
      this.txtItem6H.Visible = true;
      this.txtItem6H.X = 464;
      this.txtItem6H.Y = 783;
      this.txtItem7H.Visible = false;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = true;
      this.lvlItem1H.X = 782;
      this.lvlItem1H.Y = 603;
      this.lvlItem1H.Value = this.sceneArray[this.id][this.actionID][3].split(" ")[1];
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = true;
      this.lvlItem4H.X = 782;
      this.lvlItem4H.Y = 663;
      this.lvlItem4H.Value = this.sceneArray[this.id][this.actionID][4].split(" ")[1];
      this.lvlItem5H.Visible = true;
      this.lvlItem5H.X = 782;
      this.lvlItem5H.Y = 723;
      this.lvlItem5H.Value = this.sceneArray[this.id][this.actionID][5].split(" ")[1];
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.X = 762;
      this.btnToggle1H.Y = 783;
      this.btnToggle1H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      this.btnToggle2H.Visible = false;
      this.btnToggle3H.Visible = false; 
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //V
      this.txtItem1V.Text = "Яркость";
      this.txtItem1V.Visible = true;
      this.txtItem1V.X = 464-256;
      this.txtItem1V.Y = 603+256;
      this.txtItem2V.Visible = false;
      this.txtItem3V.Visible = false;
      this.txtItem4V.Text = "Насыщенность";
      this.txtItem4V.Visible = true;
      this.txtItem4V.X = 464-256;
      this.txtItem4V.Y = 663+256;
      this.txtItem5V.Text = "Цвет";
      this.txtItem5V.Visible = true;
      this.txtItem5V.GetState(0).TextAlign = 3;
      this.txtItem5V.X = 464-256;
      this.txtItem5V.Y = 723+256;
      this.txtItem6V.Text = "Режим \"Лава\"";
      this.txtItem6V.Visible = true;
      this.txtItem6V.X = 464-256;
      this.txtItem6V.Y = 783+256;
      this.txtItem7V.Visible = false;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = true;
      this.lvlItem1V.X = 782-256;
      this.lvlItem1V.Y = 603+256;
      this.lvlItem1V.Value = this.sceneArray[this.id][this.actionID][3].split(" ")[1];
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = true;
      this.lvlItem4V.X = 782-256;
      this.lvlItem4V.Y = 663+256;
      this.lvlItem4V.Value = this.sceneArray[this.id][this.actionID][4].split(" ")[1];
      this.lvlItem5V.Visible = true;
      this.lvlItem5V.X = 782-256;
      this.lvlItem5V.Y = 723+256;
      this.lvlItem5V.Value = this.sceneArray[this.id][this.actionID][5].split(" ")[1];
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.X = 762-256;
      this.btnToggle1V.Y = 783+256;
      this.btnToggle1V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      this.btnToggle2V.Visible = false;
      this.btnToggle3V.Visible = false; 
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;   
   }
   
   this.set2Default = function() {
      IR.Log("SET RELAY UI DEFAULT");
      this.txtItem1H.Text = "Выкл./Вкл.";
      this.txtItem1H.Visible = true;
      this.txtItem1H.X = 620;
      this.txtItem1H.Y = 800;
      this.txtItem2H.Visible = false;
      this.txtItem3H.Visible = false;
      this.txtItem4H.Visible = false;
      this.txtItem5H.Visible = false;
      this.txtItem6H.Visible = false;
      this.txtItem7H.Visible = false;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.Value = false;
      this.btnToggle1H.X = 948;
      this.btnToggle1H.Y = 800;
      this.btnToggle2H.Visible = false;
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //V 
      this.txtItem1V.Text = "Выкл./Вкл.";
      this.txtItem1V.Visible = true;
      this.txtItem1V.X = 620-256;
      this.txtItem1V.Y = 800+256;
      this.txtItem2V.Visible = false;
      this.txtItem3V.Visible = false;
      this.txtItem4V.Visible = false;
      this.txtItem5V.Visible = false;
      this.txtItem6V.Visible = false;
      this.txtItem7V.Visible = false;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.Value = false;
      this.btnToggle1V.X = 948-256;
      this.btnToggle1V.Y = 800+256;
      this.btnToggle2V.Visible = false;
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;  
   }
   
   this.set2Load = function() {
      IR.Log("SET RELAY UI LOAD");
      this.txtItem1H.Text = "Выкл./Вкл.";
      this.txtItem1H.Visible = true;
      this.txtItem1H.X = 620;
      this.txtItem1H.Y = 800;
      this.txtItem2H.Visible = false;
      this.txtItem3H.Visible = false;
      this.txtItem4H.Visible = false;
      this.txtItem5H.Visible = false;
      this.txtItem6H.Visible = false;
      this.txtItem7H.Visible = false;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      this.btnToggle1H.X = 948;
      this.btnToggle1H.Y = 800;
      this.btnToggle2H.Visible = false;
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //V
      this.txtItem1V.Text = "Выкл./Вкл.";
      this.txtItem1V.Visible = true;
      this.txtItem1V.X = 620-256;
      this.txtItem1V.Y = 800+256;
      this.txtItem2V.Visible = false;
      this.txtItem3V.Visible = false;
      this.txtItem4V.Visible = false;
      this.txtItem5V.Visible = false;
      this.txtItem6V.Visible = false;
      this.txtItem7V.Visible = false;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      this.btnToggle1V.X = 948-256;
      this.btnToggle1V.Y = 800+256;
      this.btnToggle2V.Visible = false;
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;   
   }
   
   this.set1Default = function() {
      IR.Log("SET DIM UI DEFAULT");
      this.txtItem1H.Text = "Яркость";
      this.txtItem1H.Visible = true;
      this.txtItem1H.X = 460;
      this.txtItem1H.Y = 800;
      this.txtItem2H.Visible = false;
      this.txtItem3H.Visible = false;
      this.txtItem4H.Visible = false;
      this.txtItem5H.Visible = false;
      this.txtItem6H.Visible = false;
      this.txtItem7H.Visible = false;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = true;
      this.lvlItem1H.X = 788;
      this.lvlItem1H.Y = 800;
      this.lvlItem1H.Value = 0;
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle1H.Visible = false;
      this.btnToggle2H.Visible = false;
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //
      this.txtItem1V.Text = "Яркость";
      this.txtItem1V.Visible = true;
      this.txtItem1V.X = 460-256;
      this.txtItem1V.Y = 800+256;
      this.txtItem2V.Visible = false;
      this.txtItem3V.Visible = false;
      this.txtItem4V.Visible = false;
      this.txtItem5V.Visible = false;
      this.txtItem6V.Visible = false;
      this.txtItem7V.Visible = false;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = true;
      this.lvlItem1V.X = 788-256;
      this.lvlItem1V.Y = 800+256;
      this.lvlItem1V.Value = 0;
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle1V.Visible = false;
      this.btnToggle2V.Visible = false;
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;   
   }
   
   this.set1Load = function() {
      IR.Log("SET DIM UI LOAD");
      this.txtItem1H.Text = "Яркость";
      this.txtItem1H.Visible = true;
      this.txtItem1H.X = 460;
      this.txtItem1H.Y = 800;
      this.txtItem2H.Visible = false;
      this.txtItem3H.Visible = false;
      this.txtItem4H.Visible = false;
      this.txtItem5H.Visible = false;
      this.txtItem6H.Visible = false;
      this.txtItem7H.Visible = false;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = true;
      this.lvlItem1H.X = 788;
      this.lvlItem1H.Y = 800;
      this.lvlItem1H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[1];
      this.lvlItem2H.Visible = false;
      this.lvlItem3H.Visible = false;
      this.lvlItem4H.Visible = false;
      this.lvlItem5H.Visible = false;
      this.btnToggle1H.Visible = false;
      this.btnToggle2H.Visible = false;
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //
      this.txtItem1V.Text = "Яркость";
      this.txtItem1V.Visible = true;
      this.txtItem1V.X = 460-256;
      this.txtItem1V.Y = 800+256;
      this.txtItem2V.Visible = false;
      this.txtItem3V.Visible = false;
      this.txtItem4V.Visible = false;
      this.txtItem5V.Visible = false;
      this.txtItem6V.Visible = false;
      this.txtItem7V.Visible = false;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = true;
      this.lvlItem1V.X = 788-256;
      this.lvlItem1V.Y = 800+256;
      this.lvlItem1V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[1];
      this.lvlItem2V.Visible = false;
      this.lvlItem3V.Visible = false;
      this.lvlItem4V.Visible = false;
      this.lvlItem5V.Visible = false;
      this.btnToggle1V.Visible = false;
      this.btnToggle2V.Visible = false;
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;   
   }
   
   this.set0Default = function() {
      IR.Log("SET RGBW UI DEFAULT");
      this.txtItem1H.Visible = false;
      this.txtItem2H.Text = "Яркость белого";
      this.txtItem2H.Visible = true;
      this.txtItem2H.X = 464;
      this.txtItem2H.Y = 663;
      this.txtItem3H.Text = "Яркость цветного";
      this.txtItem3H.Visible = true;
      this.txtItem3H.X = 464;
      this.txtItem3H.Y = 723;
      this.txtItem4H.Text = "Насыщенность";
      this.txtItem4H.Visible = true;
      this.txtItem4H.X = 464;
      this.txtItem4H.Y = 783;
      this.txtItem5H.Text = "Цвет";
      this.txtItem5H.Visible = true;
      this.txtItem5H.GetState(0).TextAlign = 3;
      this.txtItem5H.X = 464;
      this.txtItem5H.Y = 843;
      this.txtItem6H.Text = "Режим \"Лава\"";
      this.txtItem6H.Visible = true;
      this.txtItem6H.X = 464;
      this.txtItem6H.Y = 903;
      this.txtItem7H.Visible = false;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = true;
      this.lvlItem2H.X = 782;
      this.lvlItem2H.Y = 663;
      this.lvlItem2H.Value = 0;
      this.lvlItem3H.Visible = true;
      this.lvlItem3H.X = 782;
      this.lvlItem3H.Y = 723;
      this.lvlItem3H.Value = 0;
      this.lvlItem4H.Visible = true;
      this.lvlItem4H.X = 782;
      this.lvlItem4H.Y = 783;
      this.lvlItem4H.Value = 0;
      this.lvlItem5H.Visible = true;
      this.lvlItem5H.X = 782;
      this.lvlItem5H.Y = 843;
      this.lvlItem5H.Value = 0;
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.X = 762;
      this.btnToggle1H.Y = 903;
      this.btnToggle1H.Value = false;
      this.btnToggle2H.Visible = false;
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //
      this.txtItem1V.Visible = false;
      this.txtItem2V.Text = "Яркость белого";
      this.txtItem2V.Visible = true;
      this.txtItem2V.X = 464-256;
      this.txtItem2V.Y = 663+256;
      this.txtItem3V.Text = "Яркость цветного";
      this.txtItem3V.Visible = true;
      this.txtItem3V.X = 464-256;
      this.txtItem3V.Y = 723+256;
      this.txtItem4V.Text = "Насыщенность";
      this.txtItem4V.Visible = true;
      this.txtItem4V.X = 464-256;
      this.txtItem4V.Y = 783+256;
      this.txtItem5V.Text = "Цвет";
      this.txtItem5V.Visible = true;
      this.txtItem5V.GetState(0).TextAlign = 3;
      this.txtItem5V.X = 464-256;
      this.txtItem5V.Y = 843+256;
      this.txtItem6V.Text = "Режим \"Лава\"";
      this.txtItem6V.Visible = true;
      this.txtItem6V.X = 464-256;
      this.txtItem6V.Y = 903+256;
      this.txtItem7V.Visible = false;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = true;
      this.lvlItem2V.X = 782-256;
      this.lvlItem2V.Y = 663+256;
      this.lvlItem2V.Value = 0;
      this.lvlItem3V.Visible = true;
      this.lvlItem3V.X = 782-256;
      this.lvlItem3V.Y = 723+256;
      this.lvlItem3V.Value = 0;
      this.lvlItem4V.Visible = true;
      this.lvlItem4V.X = 782-256;
      this.lvlItem4V.Y = 783+256;
      this.lvlItem4V.Value = 0;
      this.lvlItem5V.Visible = true;
      this.lvlItem5V.X = 782-256;
      this.lvlItem5V.Y = 843+256;
      this.lvlItem5V.Value = 0;
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.X = 762-256;
      this.btnToggle1V.Y = 903+256;
      this.btnToggle1V.Value = false;
      this.btnToggle2V.Visible = false;
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;   
   }
   
   this.set0Load = function() {
      IR.Log("SET RGBW UI LOAD");
      this.txtItem1H.Visible = false;
      this.txtItem2H.Text = "Яркость W";
      this.txtItem2H.Visible = true;
      this.txtItem2H.X = 464;
      this.txtItem2H.Y = 663;
      this.txtItem3H.Text = "Яркость RGB";
      this.txtItem3H.Visible = true;
      this.txtItem3H.X = 464;
      this.txtItem3H.Y = 723;
      this.txtItem4H.Text = "Насыщенность";
      this.txtItem4H.Visible = true;
      this.txtItem4H.X = 464;
      this.txtItem4H.Y = 783;
      this.txtItem5H.Text = "Цвет";
      this.txtItem5H.Visible = true;
      this.txtItem5H.GetState(0).TextAlign = 3;
      this.txtItem5H.X = 464;
      this.txtItem5H.Y = 843;
      this.txtItem6H.Text = "Режим \"Лава\"";
      this.txtItem6H.Visible = true;
      this.txtItem6H.X = 464;
      this.txtItem6H.Y = 903;
      this.txtItem7H.Visible = false;
      this.txtItem8H.Visible = false;
      this.txtItem9H.Visible = false;
      this.lvlItem1H.Visible = false;
      this.lvlItem2H.Visible = true;
      this.lvlItem2H.X = 782;
      this.lvlItem2H.Y = 663;
      this.lvlItem2H.Value = this.sceneArray[this.id][this.actionID][3].split(" ")[1];
      this.lvlItem3H.Visible = true;
      this.lvlItem3H.X = 782;
      this.lvlItem3H.Y = 723;
      this.lvlItem3H.Value = this.sceneArray[this.id][this.actionID][4].split(" ")[1];
      this.lvlItem4H.Visible = true;
      this.lvlItem4H.X = 782;
      this.lvlItem4H.Y = 783;
      this.lvlItem4H.Value = this.sceneArray[this.id][this.actionID][5].split(" ")[1];
      this.lvlItem5H.Visible = true;
      this.lvlItem5H.X = 782;
      this.lvlItem5H.Y = 843;
      this.lvlItem5H.Value = this.sceneArray[this.id][this.actionID][6].split(" ")[1];
      this.btnToggle1H.Visible = true;
      this.btnToggle1H.X = 762;
      this.btnToggle1H.Y = 903;
      this.btnToggle1H.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      this.btnToggle2H.Visible = false;
      this.btnToggle3H.Visible = false;
      this.btnToggle4H.Visible = false;
      this.btnToggle5H.Visible = false;
      this.btnToggle6H.Visible = false;
      this.btnToggle7H.Visible = false;
      this.listRadioH.Visible = false;
      //
      this.txtItem1V.Visible = false;
      this.txtItem2V.Text = "Яркость W";
      this.txtItem2V.Visible = true;
      this.txtItem2V.X = 464-256;
      this.txtItem2V.Y = 663+256;
      this.txtItem3V.Text = "Яркость RGB";
      this.txtItem3V.Visible = true;
      this.txtItem3V.X = 464-256;
      this.txtItem3V.Y = 723+256;
      this.txtItem4V.Text = "Насыщенность";
      this.txtItem4V.Visible = true;
      this.txtItem4V.X = 464-256;
      this.txtItem4V.Y = 783+256;
      this.txtItem5V.Text = "Цвет";
      this.txtItem5V.Visible = true;
      this.txtItem5V.GetState(0).TextAlign = 3;
      this.txtItem5V.X = 464-256;
      this.txtItem5V.Y = 843+256;
      this.txtItem6V.Text = "Режим \"Лава\"";
      this.txtItem6V.Visible = true;
      this.txtItem6V.X = 464-256;
      this.txtItem6V.Y = 903+256;
      this.txtItem7V.Visible = false;
      this.txtItem8V.Visible = false;
      this.txtItem9V.Visible = false;
      this.lvlItem1V.Visible = false;
      this.lvlItem2V.Visible = true;
      this.lvlItem2V.X = 782-256;
      this.lvlItem2V.Y = 663+256;
      this.lvlItem2V.Value = this.sceneArray[this.id][this.actionID][3].split(" ")[1];
      this.lvlItem3V.Visible = true;
      this.lvlItem3V.X = 782-256;
      this.lvlItem3V.Y = 723+256;
      this.lvlItem3V.Value = this.sceneArray[this.id][this.actionID][4].split(" ")[1];
      this.lvlItem4V.Visible = true;
      this.lvlItem4V.X = 782-256;
      this.lvlItem4V.Y = 783+256;
      this.lvlItem4V.Value = this.sceneArray[this.id][this.actionID][5].split(" ")[1];
      this.lvlItem5V.Visible = true;
      this.lvlItem5V.X = 782-256;
      this.lvlItem5V.Y = 843+256;
      this.lvlItem5V.Value = this.sceneArray[this.id][this.actionID][6].split(" ")[1];
      this.btnToggle1V.Visible = true;
      this.btnToggle1V.X = 762-256;
      this.btnToggle1V.Y = 903+256;
      this.btnToggle1V.Value = this.sceneArray[this.id][this.actionID][2].split(" ")[2];
      this.btnToggle2V.Visible = false;
      this.btnToggle3V.Visible = false;
      this.btnToggle4V.Visible = false;
      this.btnToggle5V.Visible = false;
      this.btnToggle6V.Visible = false;
      this.btnToggle7V.Visible = false;
      this.listRadioV.Visible = false;  
   }
   
   this.btnAddFunc = function() {
      switch (that.source.type) {
      case 0:
         var exist = false;
         for (var i=0; i<that.sceneArray[that.id].length; i++) {
            if (that.sceneArray[that.id][i][0] == that.source.name && that.sceneArray[that.id][i][1] == that.source.room.name) {
               exist = true;   
            }   
         }
         if (!exist && !that.mode) {
            var push = that.sceneArray[that.id].push(new Array()) - 1;
            that.sceneArray[that.id][push][0] = that.source.name;
            that.sceneArray[that.id][push][1] = that.source.room.name;
            if (that.btnToggle1H.Value == false || that.btnToggle1V.Value == false)
               that.sceneArray[that.id][push][2] = that.source.cmdA[1] + " true" + " 0";
            else
               that.sceneArray[that.id][push][2] = that.source.cmdA[0] + " true" + " 1";
            that.sceneArray[that.id][push][3] = that.source.cmdA[2] + " " + that.lvlItem2.Value;
            that.sceneArray[that.id][push][4] = that.source.cmdA[3] + " " + that.lvlItem3.Value;
            that.sceneArray[that.id][push][5] = that.source.cmdA[4] + " " + that.lvlItem4.Value;
            that.sceneArray[that.id][push][6] = that.source.cmdA[5] + " " + that.lvlItem5.Value;
         } else if (that.mode) {
            that.clearAction();
            that.sceneArray[that.id][that.actionID][0] = that.source.name;
            that.sceneArray[that.id][that.actionID][1] = that.source.room.name;
            if (that.btnToggle1.Value == false)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[1] + " true" + " 0";
            else
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[0] + " true" + " 1";
            that.sceneArray[that.id][that.actionID][3] = that.source.cmdA[2] + " " + that.lvlItem2.Value;
            that.sceneArray[that.id][that.actionID][4] = that.source.cmdA[3] + " " + that.lvlItem3.Value;
            that.sceneArray[that.id][that.actionID][5] = that.source.cmdA[4] + " " + that.lvlItem4.Value;
            that.sceneArray[that.id][that.actionID][6] = that.source.cmdA[5] + " " + that.lvlItem5.Value;   
         }
         that.screenManager.closePopup(that.popupEditSource);
         that.editScene.buildListOfActions(that.id);
      break;
      case 1:
         var exist = false;
         for (var i=0; i<that.sceneArray[that.id].length; i++) {
            if (that.sceneArray[that.id][i][0] == that.source.name && that.sceneArray[that.id][i][1] == that.source.room.name) {
               exist = true;   
            }   
         }
         if (!exist && !that.mode) {
            var push = that.sceneArray[that.id].push(new Array()) - 1;
            that.sceneArray[that.id][push][0] = that.source.name;
            that.sceneArray[that.id][push][1] = that.source.room.name;
            that.sceneArray[that.id][push][2] = that.source.cmdA[0] + " " + that.lvlItem1.Value;
         } else if (that.mode) {
            that.clearAction();
            that.sceneArray[that.id][that.actionID][0] = that.source.name;
            that.sceneArray[that.id][that.actionID][1] = that.source.room.name;
            that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[0] + " " + that.lvlItem1.Value;   
         }
         that.screenManager.closePopup(that.popupEditSource);
         that.editScene.buildListOfActions(that.id);
      break;
      case 2:
         var exist = false;
         for (var i=0; i<that.sceneArray[that.id].length; i++) {
            if (that.sceneArray[that.id][i][0] == that.source.name && that.sceneArray[that.id][i][1] == that.source.room.name) {
               exist = true;   
            }   
         }
         if (!exist && !that.mode) {
            var push = that.sceneArray[that.id].push(new Array()) - 1;
            that.sceneArray[that.id][push][0] = that.source.name;
            that.sceneArray[that.id][push][1] = that.source.room.name;
            if (that.btnToggle1.Value == false)
               that.sceneArray[that.id][push][2] = that.source.cmdA[1] + " true" + " 0";
            else
               that.sceneArray[that.id][push][2] = that.source.cmdA[0] + " true" + " 1";
         } else if (that.mode) {
            that.clearAction();
            that.sceneArray[that.id][that.actionID][0] = that.source.name;
            that.sceneArray[that.id][that.actionID][1] = that.source.room.name;
            if (that.btnToggle1.Value == false)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[1] + " true" + " 0";
            else
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[0] + " true" + " 1";   
         }
         that.screenManager.closePopup(that.popupEditSource);
         that.editScene.buildListOfActions(that.id);
      break;
      case 3:
         var exist = false;
         for (var i=0; i<that.sceneArray[that.id].length; i++) {
            if (that.sceneArray[that.id][i][0] == that.source.name && that.sceneArray[that.id][i][1] == that.source.room.name) {
               exist = true;   
            }   
         }
         if (!exist && !that.mode) {
            var push = that.sceneArray[that.id].push(new Array()) - 1;
            that.sceneArray[that.id][push][0] = that.source.name;
            that.sceneArray[that.id][push][1] = that.source.room.name;
            if (that.btnToggle1.Value == false)
               that.sceneArray[that.id][push][2] = that.source.cmdA[1] + " true" + " 0";
            else
               that.sceneArray[that.id][push][2] = that.source.cmdA[0] + " true" + " 1";
            that.sceneArray[that.id][push][3] = that.source.cmdA[2] + " " + that.lvlItem1.Value;
            that.sceneArray[that.id][push][4] = that.source.cmdA[3] + " " + that.lvlItem4.Value;
            that.sceneArray[that.id][push][5] = that.source.cmdA[4] + " " + that.lvlItem5.Value;
         } else if (that.mode) {
            that.clearAction();
            that.sceneArray[that.id][that.actionID][0] = that.source.name;
            that.sceneArray[that.id][that.actionID][1] = that.source.room.name;
            if (that.btnToggle1.Value == false)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[1] + " true" + " 0";
            else
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[0] + " true" + " 1";
            that.sceneArray[that.id][that.actionID][3] = that.source.cmdA[2] + " " + that.lvlItem1.Value;
            that.sceneArray[that.id][that.actionID][4] = that.source.cmdA[3] + " " + that.lvlItem4.Value;
            that.sceneArray[that.id][that.actionID][5] = that.source.cmdA[4] + " " + that.lvlItem5.Value;   
         }
         that.screenManager.closePopup(that.popupEditSource);
         that.editScene.buildListOfActions(that.id);
      break;
      case 4:
         var exist = false;
         for (var i=0; i<that.sceneArray[that.id].length; i++) {
            if (that.sceneArray[that.id][i][0] == that.source.name && that.sceneArray[that.id][i][1] == that.source.room.name) {
               exist = true;   
            }   
         }
         if (!exist && !that.mode) {
            var push = that.sceneArray[that.id].push(new Array()) - 1;
            that.sceneArray[that.id][push][0] = that.source.name;
            that.sceneArray[that.id][push][1] = that.source.room.name;
            if (that.btnToggle1.Value == false)
               that.sceneArray[that.id][push][2] = that.source.cmdA[1] + " true" + " 0";
            else
               that.sceneArray[that.id][push][2] = that.source.cmdA[0] + " true" + " 1";
            that.sceneArray[that.id][push][3] = that.source.cmdA[2] + " " + that.lvlItem1.Value;
         } else if (that.mode) {
            that.clearAction();
            that.sceneArray[that.id][that.actionID][0] = that.source.name;
            that.sceneArray[that.id][that.actionID][1] = that.source.room.name;
            if (that.btnToggle1.Value == false)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[1] + " true" + " 0";
            else
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[0] + " true" + " 1";
            that.sceneArray[that.id][that.actionID][3] = that.source.cmdA[2] + " " + that.lvlItem1.Value;;   
         }
         that.screenManager.closePopup(that.popupEditSource);
         that.editScene.buildListOfActions(that.id);
      break;
      case 5:
         var exist = false;
         for (var i=0; i<that.sceneArray[that.id].length; i++) {
            if (that.sceneArray[that.id][i][0] == that.source.name && that.sceneArray[that.id][i][1] == that.source.room.name) {
               exist = true;   
            }   
         }
         if (!exist && !that.mode) {
            var push = that.sceneArray[that.id].push(new Array()) - 1;
            that.sceneArray[that.id][push][0] = that.source.name;
            that.sceneArray[that.id][push][1] = that.source.room.name;
            if (that.btnToggle1.Value == false)
               that.sceneArray[that.id][push][6] = that.source.cmdA[3] + " true" + " 0";
            else
               that.sceneArray[that.id][push][6] = that.source.cmdA[2] + " true" + " 1";
            if (that.btnToggle2.Value == false)
               that.sceneArray[that.id][push][7] = that.source.cmdA[1] + " true" + " 0";
            else
               that.sceneArray[that.id][push][7] = that.source.cmdA[0] + " true" + " 1";
            that.sceneArray[that.id][push][2] = that.source.cmdA[4] + " " + that.lvlItem2.Value;
            that.sceneArray[that.id][push][3] = that.source.cmdA[5] + " " + that.lvlItem3.Value;
            that.sceneArray[that.id][push][4] = that.source.cmdA[6] + " " + that.lvlItem4.Value;
            that.sceneArray[that.id][push][5] = that.source.cmdA[7] + " " + that.lvlItem5.Value;
         } else if (that.mode) {
            that.clearAction();
            that.sceneArray[that.id][that.actionID][0] = that.source.name;
            that.sceneArray[that.id][that.actionID][1] = that.source.room.name;
            if (that.btnToggle1.Value == false)
               that.sceneArray[that.id][that.actionID][6] = that.source.cmdA[3] + " true" + " 0";
            else
               that.sceneArray[that.id][that.actionID][6] = that.source.cmdA[2] + " true" + " 1";
            if (that.btnToggle2.Value == false)
               that.sceneArray[that.id][that.actionID][7] = that.source.cmdA[1] + " true" + " 0";
            else
               that.sceneArray[that.id][that.actionID][7] = that.source.cmdA[0] + " true" + " 1";
            that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[4] + " " + that.lvlItem2.Value;
            that.sceneArray[that.id][that.actionID][3] = that.source.cmdA[5] + " " + that.lvlItem3.Value;
            that.sceneArray[that.id][that.actionID][4] = that.source.cmdA[6] + " " + that.lvlItem4.Value;
            that.sceneArray[that.id][that.actionID][5] = that.source.cmdA[7] + " " + that.lvlItem5.Value;     
         }
         that.screenManager.closePopup(that.popupEditSource);
         that.editScene.buildListOfActions(that.id);
      break;
      case 6:
         var exist = false;
         for (var i=0; i<that.sceneArray[that.id].length; i++) {
            if (that.sceneArray[that.id][i][0] == that.source.name && that.sceneArray[that.id][i][1] == that.source.room.name) {
               exist = true;   
            }   
         }
         if (!exist && !that.mode) {
            var push = that.sceneArray[that.id].push(new Array()) - 1;
            that.sceneArray[that.id][push][0] = that.source.name;
            that.sceneArray[that.id][push][1] = that.source.room.name;
            if (that.btnToggle1.Value == false)
               that.sceneArray[that.id][push][2] = that.source.cmdA[1] + " true" + " 0";
            else
               that.sceneArray[that.id][push][2] = that.source.cmdA[0] + " true" + " 1";
         } else if (that.mode) {
            that.clearAction();
            that.sceneArray[that.id][that.actionID][0] = that.source.name;
            that.sceneArray[that.id][that.actionID][1] = that.source.room.name;
            if (that.btnToggle1.Value == false)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[1] + " true" + " 0";
            else
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[0] + " true" + " 1";   
         }
         that.screenManager.closePopup(that.popupEditSource);
         that.editScene.buildListOfActions(that.id);
      break;
      case 7:
         var exist = false;
         for (var i=0; i<that.sceneArray[that.id].length; i++) {
            if (that.sceneArray[that.id][i][0] == that.source.name && that.sceneArray[that.id][i][1] == that.source.room.name) {
               exist = true;   
            }   
         }
         if (!exist && !that.mode) {
            var push = that.sceneArray[that.id].push(new Array()) - 1;
            that.sceneArray[that.id][push][0] = that.source.name;
            that.sceneArray[that.id][push][1] = that.source.room.name;
            if (that.btnToggle1.Value == false)
               that.sceneArray[that.id][push][2] = that.source.cmdA[1] + " true" + " 0";
            else
               that.sceneArray[that.id][push][2] = that.source.cmdA[0] + " true" + " 1";
         } else if (that.mode) {
            that.clearAction();
            that.sceneArray[that.id][that.actionID][0] = that.source.name;
            that.sceneArray[that.id][that.actionID][1] = that.source.room.name;
            if (that.btnToggle1.Value == false)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[1] + " true" + " 0";
            else
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[0] + " true" + " 1";   
         }
         that.screenManager.closePopup(that.popupEditSource);
         that.editScene.buildListOfActions(that.id);
      break;
      case 8:
         var exist = false;
         for (var i=0; i<that.sceneArray[that.id].length; i++) {
            if (that.sceneArray[that.id][i][0] == that.source.name && that.sceneArray[that.id][i][1] == that.source.room.name) {
               exist = true;   
            }   
         }
         if (!exist && !that.mode) {
            var push = that.sceneArray[that.id].push(new Array()) - 1;
            that.sceneArray[that.id][push][0] = that.source.name;
            that.sceneArray[that.id][push][1] = that.source.room.name;
            if (that.btnToggle1.Value == false)
               that.sceneArray[that.id][push][2] = that.source.cmdA[1] + " true" + " 0";
            else
               that.sceneArray[that.id][push][2] = that.source.cmdA[0] + " true" + " 1";
         } else if (that.mode) {
            that.clearAction();
            that.sceneArray[that.id][that.actionID][0] = that.source.name;
            that.sceneArray[that.id][that.actionID][1] = that.source.room.name;
            if (that.btnToggle1.Value == false)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[1] + " true" + " 0";
            else
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[0] + " true" + " 1";   
         }
         that.screenManager.closePopup(that.popupEditSource);
         that.editScene.buildListOfActions(that.id);
      break;
      case 9:
         var exist = false;
         for (var i=0; i<that.sceneArray[that.id].length; i++) {
            if (that.sceneArray[that.id][i][0] == that.source.name && that.sceneArray[that.id][i][1] == that.source.room.name) {
               exist = true;   
            }   
         }
         if (!exist && !that.mode) {
            var push = that.sceneArray[that.id].push(new Array()) - 1;
            that.sceneArray[that.id][push][0] = that.source.name;
            that.sceneArray[that.id][push][1] = that.source.room.name;
            if (that.btnToggle1.Value == false)
               that.sceneArray[that.id][push][2] = that.source.cmdA[1] + " true" + " 0";
            else
               that.sceneArray[that.id][push][2] = that.source.cmdA[0] + " true" + " 1";
         } else if (that.mode) {
            that.clearAction();
            that.sceneArray[that.id][that.actionID][0] = that.source.name;
            that.sceneArray[that.id][that.actionID][1] = that.source.room.name;
            if (that.btnToggle1.Value == false)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[1] + " true" + " 0";
            else
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[0] + " true" + " 1";   
         }
         that.screenManager.closePopup(that.popupEditSource);
         that.editScene.buildListOfActions(that.id);
      break;
      case 10:
         var exist = false;
         for (var i=0; i<that.sceneArray[that.id].length; i++) {
            if (that.sceneArray[that.id][i][0] == that.source.name && that.sceneArray[that.id][i][1] == that.source.room.name) {
               exist = true;   
            }   
         }
         if (!exist && !that.mode) {
            var push = that.sceneArray[that.id].push(new Array()) - 1;
            that.sceneArray[that.id][push][0] = that.source.name;
            that.sceneArray[that.id][push][1] = that.source.room.name;
            if (that.btnToggle1.Value == true)
               that.sceneArray[that.id][push][2] = that.source.cmdA[7] + " true" + " 1" + " 0" + " 0";
            else if (that.btnToggle3.Value == true)
               that.sceneArray[that.id][push][2] = that.source.cmdA[5] + " true" + " 0" + " 1" + " 0";
            else if (that.btnToggle4.Value == true)
               that.sceneArray[that.id][push][2] = that.source.cmdA[6] + " true" + " 0" + " 0" + " 1";
            if (that.btnToggle3.Value == true) {
               that.sceneArray[that.id][push][3] = that.FM1StationsCMD[that.radioSelectedID] + " true " + that.radioSelectedID;
               that.sceneArray[that.id][push][4] = that.source.cmdA[8] + " true";
            }
            else if (that.btnToggle4.Value == true) {
               that.sceneArray[that.id][push][3] = that.FM2StationsCMD[that.radioSelectedID] + " true " + that.radioSelectedID;
               that.sceneArray[that.id][push][4] = that.source.cmdA[9] + " true";
            }
         } else if (that.mode) {
            that.clearAction();
            that.sceneArray[that.id][that.actionID][0] = that.source.name;
            that.sceneArray[that.id][that.actionID][1] = that.source.room.name;
            if (that.btnToggle1.Value == true)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[7] + " true" + " 1" + " 0" + " 0";
            else if (that.btnToggle3.Value == true)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[5] + " true" + " 0" + " 1" + " 0";
            else if (that.btnToggle4.Value == true)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[6] + " true" + " 0" + " 0" + " 1";
            if (that.btnToggle3.Value == true) {
               that.sceneArray[that.id][that.actionID][3] = that.FM1StationsCMD[that.radioSelectedID] + " true " + that.radioSelectedID;
               that.sceneArray[that.id][that.actionID][4] = that.source.cmdA[8] + " true";
            }
            else if (that.btnToggle4.Value == true) {
               that.sceneArray[that.id][that.actionID][3] = that.FM2StationsCMD[that.radioSelectedID] + " true " + that.radioSelectedID;
               that.sceneArray[that.id][that.actionID][4] = that.source.cmdA[9] + " true";
            }   
         }
         that.screenManager.closePopup(that.popupEditSource);
         that.editScene.buildListOfActions(that.id);
      break;
      case 11:
         var exist = false;
         for (var i=0; i<that.sceneArray[that.id].length; i++) {
            if (that.sceneArray[that.id][i][0] == that.source.name && that.sceneArray[that.id][i][1] == that.source.room.name) {
               exist = true;   
            }   
         }
         if (!exist && !that.mode) {
            var push = that.sceneArray[that.id].push(new Array()) - 1;
            that.sceneArray[that.id][push][0] = that.source.name;
            that.sceneArray[that.id][push][1] = that.source.room.name;
            if (that.btnToggle1.Value == true)
               that.sceneArray[that.id][push][2] = that.source.cmdA[10] + " true" + " 1" + " 0" + " 0" + " 0" + " 0" + " 0" + " time" + 6000;
            else if (that.btnToggle3.Value == true)
               that.sceneArray[that.id][push][2] = that.source.cmdA[5] + " true" + " 0" + " 1" + " 0" + " 0" + " 0" + " 0" + " time" + 6000;
            else if (that.btnToggle5.Value == true)
               that.sceneArray[that.id][push][2] = that.source.cmdA[7] + " true" + " 0" + " 0" + " 0" + " 1" + " 0" + " 0" + " time" + 6000;
            else if (that.btnToggle6.Value == true)
               that.sceneArray[that.id][push][2] = that.source.cmdA[8] + " true" + " 0" + " 0" + " 0" + " 0" + " 1" + " 0" + " time" + 6000;
            else if (that.btnToggle7.Value == true)
               that.sceneArray[that.id][push][2] = that.source.cmdA[9] + " true" + " 0" + " 0" + " 0" + " 0" + " 0" + " 1" + " time" + 6000;
            if (that.btnToggle3.Value == true) {
               that.sceneArray[that.id][push][3] = that.FM1StationsCMD[that.radioSelectedID] + " true " + that.radioSelectedID;
            }
            else if (that.btnToggle4.Value == true) {
               that.sceneArray[that.id][push][3] = that.FM2StationsCMD[that.radioSelectedID] + " true " + that.radioSelectedID;
            }
         } else if (that.mode) {
            that.clearAction();
            that.sceneArray[that.id][that.actionID][0] = that.source.name;
            that.sceneArray[that.id][that.actionID][1] = that.source.room.name;
            if (that.btnToggle1.Value == true)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[10] + " true" + " 1" + " 0" + " 0" + " 0" + " 0" + " 0" + " time" + 6000;
            else if (that.btnToggle3.Value == true)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[5] + " true" + " 0" + " 1" + " 0" + " 0" + " 0" + " 0" + " time" + 6000;
            else if (that.btnToggle5.Value == true)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[7] + " true" + " 0" + " 0" + " 0" + " 1" + " 0" + " 0" + " time" + 6000;
            else if (that.btnToggle6.Value == true)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[8] + " true" + " 0" + " 0" + " 0" + " 0" + " 1" + " 0" + " time" + 6000;
            else if (that.btnToggle7.Value == true)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[9] + " true" + " 0" + " 0" + " 0" + " 0" + " 0" + " 1" + " time" + 6000;
            if (that.btnToggle3.Value == true) {
               that.sceneArray[that.id][that.actionID][3] = that.FM1StationsCMD[that.radioSelectedID] + " true " + that.radioSelectedID;
            }
            else if (that.btnToggle4.Value == true) {
               that.sceneArray[that.id][that.actionID][3] = that.FM2StationsCMD[that.radioSelectedID] + " true " + that.radioSelectedID;
            }   
         }
         that.screenManager.closePopup(that.popupEditSource);
         that.editScene.buildListOfActions(that.id);
      break;
      case 12:
         var exist = false;
         for (var i=0; i<that.sceneArray[that.id].length; i++) {
            if (that.sceneArray[that.id][i][0] == that.source.name && that.sceneArray[that.id][i][1] == that.source.room.name) {
               exist = true;   
            }   
         }
         if (!exist && !that.mode) {
            var push = that.sceneArray[that.id].push(new Array()) - 1;
            that.sceneArray[that.id][push][0] = that.source.name;
            that.sceneArray[that.id][push][1] = that.source.room.name;
            if (that.btnToggle1.Value == true)
               that.sceneArray[that.id][push][2] = that.source.cmdA[10] + " true" + " 1" + " 0" + " 0" + " 0" + " 0" + " 0" + " time" + 6000;
            else if (that.btnToggle3.Value == true)
               that.sceneArray[that.id][push][2] = that.source.cmdA[5] + " true" + " 0" + " 1" + " 0" + " 0" + " 0" + " 0" + " time" + 6000;
            else if (that.btnToggle4.Value == true)
               that.sceneArray[that.id][push][2] = that.source.cmdA[6] + " true" + " 0" + " 0" + " 1" + " 0" + " 0" + " 0" + " time" + 6000;
            else if (that.btnToggle5.Value == true)
               that.sceneArray[that.id][push][2] = that.source.cmdA[7] + " true" + " 0" + " 0" + " 0" + " 1" + " 0" + " 0" + " time" + 6000;
            else if (that.btnToggle6.Value == true)
               that.sceneArray[that.id][push][2] = that.source.cmdA[8] + " true" + " 0" + " 0" + " 0" + " 0" + " 1" + " 0" + " time" + 6000;
            else if (that.btnToggle7.Value == true)
               that.sceneArray[that.id][push][2] = that.source.cmdA[9] + " true" + " 0" + " 0" + " 0" + " 0" + " 0" + " 1" + " time" + 6000;
            if (that.btnToggle3.Value == true) {
               that.sceneArray[that.id][push][3] = that.FM1StationsCMD[that.radioSelectedID] + " true " + that.radioSelectedID;
            }
            else if (that.btnToggle4.Value == true) {
               that.sceneArray[that.id][push][3] = that.FM2StationsCMD[that.radioSelectedID] + " true " + that.radioSelectedID;
            }
         } else if (that.mode) {
            that.clearAction();
            that.sceneArray[that.id][that.actionID][0] = that.source.name;
            that.sceneArray[that.id][that.actionID][1] = that.source.room.name;
            if (that.btnToggle1.Value == true)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[10] + " true" + " 1" + " 0" + " 0" + " 0" + " 0" + " 0" + " time" + 6000;
            else if (that.btnToggle3.Value == true)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[5] + " true" + " 0" + " 1" + " 0" + " 0" + " 0" + " 0" + " time" + 6000;
            else if (that.btnToggle4.Value == true)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[6] + " true" + " 0" + " 0" + " 1" + " 0" + " 0" + " 0" + " time" + 6000;
            else if (that.btnToggle5.Value == true)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[7] + " true" + " 0" + " 0" + " 0" + " 1" + " 0" + " 0" + " time" + 6000;
            else if (that.btnToggle6.Value == true)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[8] + " true" + " 0" + " 0" + " 0" + " 0" + " 1" + " 0" + " time" + 6000;
            else if (that.btnToggle7.Value == true)
               that.sceneArray[that.id][that.actionID][2] = that.source.cmdA[9] + " true" + " 0" + " 0" + " 0" + " 0" + " 0" + " 1" + " time" + 6000;
            if (that.btnToggle3.Value == true) {
               that.sceneArray[that.id][that.actionID][3] = that.FM1StationsCMD[that.radioSelectedID] + " true " + that.radioSelectedID;
            }
            else if (that.btnToggle4.Value == true) {
               that.sceneArray[that.id][that.actionID][3] = that.FM2StationsCMD[that.radioSelectedID] + " true " + that.radioSelectedID;
            }   
         }
         that.screenManager.closePopup(that.popupEditSource);
         that.editScene.buildListOfActions(that.id);
      break;
      }            
   }
   
   this.btnToggle1Func = function() {
      that.btnToggle1H.Value = !that.btnToggle1H.Value;
      that.btnToggle1V.Value = !that.btnToggle1V.Value;
      if (that.source.type >= 10) {
         if (that.btnToggle1.Value) {
            that.btnToggle3H.Value = false;
            that.btnToggle4H.Value = false;
            that.btnToggle5H.Value = false;
            that.btnToggle6H.Value = false;
            that.btnToggle7H.Value = false;
            that.listRadioH.Visible = false;
            that.txtItem8H.Visible = false;
            that.txtItem9H.Visible = false;
            //
            that.btnToggle3V.Value = false;
            that.btnToggle4V.Value = false;
            that.btnToggle5V.Value = false;
            that.btnToggle6V.Value = false;
            that.btnToggle7V.Value = false;
            that.listRadioV.Visible = false;
            that.txtItem8V.Visible = false;
            that.txtItem9V.Visible = false;
         }
         if (!that.btnToggle1.Value && !that.btnToggle3.Value && !that.btnToggle4.Value && !that.btnToggle5.Value && !that.btnToggle6.Value && !that.btnToggle7.Value) {
            that.btnToggle1H.Value = true;
            that.listRadioH.Visible = false;
            that.txtItem8H.Visible = false;
            that.txtItem9H.Visible = false;
            //
            that.btnToggle1V.Value = true;
            that.listRadioV.Visible = false;
            that.txtItem8V.Visible = false;
            that.txtItem9V.Visible = false;
         }
      }   
   }
   
   this.btnToggle2Func = function() {
      that.btnToggle2H.Value = !that.btnToggle2H.Value;
      that.btnToggle2V.Value = !that.btnToggle2V.Value;   
   }
   
   this.btnToggle3Func = function() {
      that.btnToggle3H.Value = !that.btnToggle3H.Value;
      that.btnToggle3V.Value = !that.btnToggle3V.Value;
      if (that.source.type >= 10) {
         if (that.btnToggle3.Value) {
            that.btnToggle1H.Value = false;
            that.btnToggle4H.Value = false;
            that.btnToggle5H.Value = false;
            that.btnToggle6H.Value = false;
            that.btnToggle7H.Value = false;
            that.listRadioH.Visible = true;
            that.txtItem8H.Visible = true;
            that.txtItem9H.Visible = true;
            //
            that.btnToggle1V.Value = false;
            that.btnToggle4V.Value = false;
            that.btnToggle5V.Value = false;
            that.btnToggle6V.Value = false;
            that.btnToggle7V.Value = false;
            that.listRadioV.Visible = true;
            that.txtItem8V.Visible = true;
            that.txtItem9V.Visible = true;
         } else {
            that.listRadioH.Visible = false;
            that.txtItem8H.Visible = false;
            that.txtItem9H.Visible = false;
            //
            that.listRadioV.Visible = false;
            that.txtItem8V.Visible = false;
            that.txtItem9V.Visible = false;
         }
         if (!that.btnToggle1.Value && !that.btnToggle3.Value && !that.btnToggle4.Value && !that.btnToggle5.Value && !that.btnToggle6.Value && !that.btnToggle7.Value) {
            that.btnToggle1H.Value = true;
            that.listRadioH.Visible = false;
            that.txtItem8H.Visible = false;
            that.txtItem9H.Visible = false;
            //
            that.btnToggle1V.Value = true;
            that.listRadioV.Visible = false;
            that.txtItem8V.Visible = false;
            that.txtItem9V.Visible = false;
         }
      } 
   }
   
   this.btnToggle4Func = function() {
      that.btnToggle4H.Value = !that.btnToggle4H.Value;
      that.btnToggle4V.Value = !that.btnToggle4V.Value;
      if (that.source.type >= 10) {
         if (that.btnToggle4.Value) {
            that.btnToggle1H.Value = false;
            that.btnToggle3H.Value = false;
            that.btnToggle5H.Value = false;
            that.btnToggle6H.Value = false;
            that.btnToggle7H.Value = false;
            that.listRadioH.Visible = true;
            that.txtItem8H.Visible = true;
            that.txtItem9H.Visible = true;
            //
            that.btnToggle1V.Value = false;
            that.btnToggle3V.Value = false;
            that.btnToggle5V.Value = false;
            that.btnToggle6V.Value = false;
            that.btnToggle7V.Value = false;
            that.listRadioV.Visible = true;
            that.txtItem8V.Visible = true;
            that.txtItem9V.Visible = true;
         } else {
            that.listRadioH.Visible = false;
            that.txtItem8H.Visible = false;
            that.txtItem9H.Visible = false;
            //
            that.listRadioV.Visible = false;
            that.txtItem8V.Visible = false;
            that.txtItem9V.Visible = false;
         }
         if (!that.btnToggle1.Value && !that.btnToggle3.Value && !that.btnToggle4.Value && !that.btnToggle5.Value && !that.btnToggle6.Value && !that.btnToggle7.Value) {
            that.btnToggle1H.Value = true;
            that.listRadioH.Visible = false;
            that.txtItem8H.Visible = false;
            that.txtItem9H.Visible = false;
            //
            that.btnToggle1V.Value = true;
            that.listRadioV.Visible = false;
            that.txtItem8V.Visible = false;
            that.txtItem9V.Visible = false;
         }
      }    
   }
   
   this.btnToggle5Func = function() {
      that.btnToggle5H.Value = !that.btnToggle5H.Value;
      that.btnToggle5V.Value = !that.btnToggle5V.Value;
      if (that.source.type >= 10) {
         if (that.btnToggle5.Value) {
            that.btnToggle1H.Value = false;
            that.btnToggle3H.Value = false;
            that.btnToggle4H.Value = false;
            that.btnToggle6H.Value = false;
            that.btnToggle7H.Value = false;
            that.listRadioH.Visible = false;
            that.txtItem8H.Visible = false;
            that.txtItem9H.Visible = false;
            //
            that.btnToggle1V.Value = false;
            that.btnToggle3V.Value = false;
            that.btnToggle4V.Value = false;
            that.btnToggle6V.Value = false;
            that.btnToggle7V.Value = false;
            that.listRadioV.Visible = false;
            that.txtItem8V.Visible = false;
            that.txtItem9V.Visible = false;
         }
         if (!that.btnToggle1.Value && !that.btnToggle3.Value && !that.btnToggle4.Value && !that.btnToggle5.Value && !that.btnToggle6.Value && !that.btnToggle7.Value) {
            that.btnToggle1H.Value = true;
            that.listRadioH.Visible = false;
            that.txtItem8H.Visible = false;
            that.txtItem9H.Visible = false;
            //
            that.btnToggle1V.Value = true;
            that.listRadioV.Visible = false;
            that.txtItem8V.Visible = false;
            that.txtItem9V.Visible = false;
         }
      }   
   }
   
   this.btnToggle6Func = function() {
      that.btnToggle6H.Value = !that.btnToggle6H.Value;
      that.btnToggle6V.Value = !that.btnToggle6V.Value;
      if (that.source.type >= 10) {
         if (that.btnToggle6.Value) {
            that.btnToggle1H.Value = false;
            that.btnToggle3H.Value = false;
            that.btnToggle4H.Value = false;
            that.btnToggle5H.Value = false;
            that.btnToggle7H.Value = false;
            that.listRadioH.Visible = false;
            that.txtItem8H.Visible = false;
            that.txtItem9H.Visible = false;
            //
            that.btnToggle1V.Value = false;
            that.btnToggle3V.Value = false;
            that.btnToggle4V.Value = false;
            that.btnToggle5V.Value = false;
            that.btnToggle7V.Value = false;
            that.listRadioV.Visible = false;
            that.txtItem8V.Visible = false;
            that.txtItem9V.Visible = false;
         }
         if (!that.btnToggle1.Value && !that.btnToggle3.Value && !that.btnToggle4.Value && !that.btnToggle5.Value && !that.btnToggle6.Value && !that.btnToggle7.Value) {
            that.btnToggle1H.Value = true;
            that.listRadioH.Visible = false;
            that.txtItem8H.Visible = false;
            that.txtItem9H.Visible = false;
            //
            that.btnToggle1V.Value = true;
            that.listRadioV.Visible = false;
            that.txtItem8V.Visible = false;
            that.txtItem9V.Visible = false;
         }
      }    
   }
   
   this.btnToggle7Func = function() {
      that.btnToggle7H.Value = !that.btnToggle7H.Value;
      that.btnToggle7V.Value = !that.btnToggle7V.Value;
      if (that.source.type >= 10) {
         if (that.btnToggle7.Value) {
            that.btnToggle1H.Value = false;
            that.btnToggle3H.Value = false;
            that.btnToggle4H.Value = false;
            that.btnToggle5H.Value = false;
            that.btnToggle6H.Value = false;
            that.listRadioH.Visible = false;
            that.txtItem8H.Visible = false;
            that.txtItem9H.Visible = false;
            //
            that.btnToggle1V.Value = false;
            that.btnToggle3V.Value = false;
            that.btnToggle4V.Value = false;
            that.btnToggle5V.Value = false;
            that.btnToggle6V.Value = false;
            that.listRadioV.Visible = false;
            that.txtItem8V.Visible = false;
            that.txtItem9V.Visible = false;
         }
         if (!that.btnToggle1.Value && !that.btnToggle3.Value && !that.btnToggle4.Value && !that.btnToggle5.Value && !that.btnToggle6.Value && !that.btnToggle7.Value) {
            that.btnToggle1H.Value = true;
            that.listRadioH.Visible = false;
            that.txtItem8H.Visible = false;
            that.txtItem9H.Visible = false;
            //
            that.btnToggle1V.Value = true;
            that.listRadioV.Visible = false;
            that.txtItem8V.Visible = false;
            that.txtItem9V.Visible = false;
         }
      }           
   }
   
   //add/save
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnAddH, function() {
      that.btnAddFunc();  
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnAddV, function() {
      that.btnAddFunc();
   });
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnToggle1H, function() {//multimedia - all off
      that.btnToggle1Func();         
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnToggle1V, function() {//multimedia - all off
      that.btnToggle1Func();         
   });
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnToggle2H, function() {// multimedia - mute
      that.btnToggle2Func();       
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnToggle2V, function() {// multimedia - mute
      that.btnToggle2Func();        
   });
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnToggle3H, function() {// fm1
      that.btnToggle3Func();         
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnToggle3V, function() {// fm1
      that.btnToggle3Func();         
   });
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnToggle4H, function() {// fm2
      that.btnToggle4Func();      
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnToggle4V, function() {// fm2
      that.btnToggle4Func();      
   });
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnToggle5H, function() {// humax
      that.btnToggle5Func();       
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnToggle5V, function() {// humax
      that.btnToggle5Func();       
   });
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnToggle6H, function() {// xbmc
      that.btnToggle6Func();      
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnToggle6V, function() {// xbmc
      that.btnToggle6Func();      
   });
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnToggle7H, function() {// appleTV
      that.btnToggle7Func();
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnToggle7V, function() {// appleTV
      that.btnToggle7Func();
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnCancelH, function() {
      that.screenManager.closePopup(that.popupEditSource);   
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.btnCancelV, function() {
      that.screenManager.closePopup(that.popupEditSource);   
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.popupEditSource.itemH, function() {
      that.screenManager.closePopup(that.popupEditSource);   
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, this.popupEditSource.itemV, function() {
      that.screenManager.closePopup(that.popupEditSource);   
   });
   
   this.changeOrientation = function() {
      if (this.orientation) {
         this.txtItem1 = this.txtItem1H;
         this.txtItem2 = this.txtItem2H;
         this.txtItem3 = this.txtItem3H;
         this.txtItem4 = this.txtItem4H;
         this.txtItem5 = this.txtItem5H;
         this.txtItem6 = this.txtItem6H;
         this.txtItem7 = this.txtItem7H;
         this.txtItem8 = this.txtItem8H;
         this.txtItem9 = this.txtItem9H;
         this.lvlItem1 = this.lvlItem1H;
         this.lvlItem2 = this.lvlItem2H;
         this.lvlItem3 = this.lvlItem3H;
         this.lvlItem4 = this.lvlItem4H;
         this.lvlItem5 = this.lvlItem5H;
         this.btnToggle1 = this.btnToggle1H;
         this.btnToggle2 = this.btnToggle2H;
         this.btnToggle3 = this.btnToggle3H;
         this.btnToggle4 = this.btnToggle4H;
         this.btnToggle5 = this.btnToggle5H;
         this.btnToggle6 = this.btnToggle6H;
         this.btnToggle7 = this.btnToggle7H;
         this.listRadio = this.listRadioH;
      } else {
         this.txtItem1 = this.txtItem1V;
         this.txtItem2 = this.txtItem2V;
         this.txtItem3 = this.txtItem3V;
         this.txtItem4 = this.txtItem4V;
         this.txtItem5 = this.txtItem5V;
         this.txtItem6 = this.txtItem6V;
         this.txtItem7 = this.txtItem7V;
         this.txtItem8 = this.txtItem8V;
         this.txtItem9 = this.txtItem9V;
         this.lvlItem1 = this.lvlItem1V;
         this.lvlItem2 = this.lvlItem2V;
         this.lvlItem3 = this.lvlItem3V;
         this.lvlItem4 = this.lvlItem4V;
         this.lvlItem5 = this.lvlItem5V;
         this.btnToggle1 = this.btnToggle1V;
         this.btnToggle2 = this.btnToggle2V;
         this.btnToggle3 = this.btnToggle3V;
         this.btnToggle4 = this.btnToggle4V;
         this.btnToggle5 = this.btnToggle5V;
         this.btnToggle6 = this.btnToggle6V;
         this.btnToggle7 = this.btnToggle7V;
         this.listRadio = this.listRadioV;
      }
   }
   this.changeOrientation();
   ////
   IR.AddListener(IR.EVENT_ORIENTATION,0, function(orientation) {
      var orientationOld = that.orientation;
      switch (orientation)
      {
         case IR.ORIENTATION_PORTRAIT:
            that.orientation = false;   
         break;
         case IR.ORIENTATION_PORTRAIT_UPSIDE_DOWN:
            that.orientation = false;
         break;
         case IR.ORIENTATION_LANDSCAPE_LEFT:
            that.orientation = true;
         break;
         case IR.ORIENTATION_LANDSCAPE_RIGHT:
            that.orientation = true;
         break;
      }
      if (orientationOld != that.orientation)
         that.changeOrientation();  
   });
}
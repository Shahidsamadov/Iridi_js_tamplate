function PList(crestron, settings, structure) {
   var that = this;
   this.crestron = crestron;
   this.settings = settings;
   this.structure = structure;
   //settings
   this.popup = this.settings.popup;
   this.item = this.settings.item;
   this.itemObject = IR.GetPopup(this.popup).GetItem(this.item);
   this.template_grp = this.settings.template_grp;
   this.template_swt = this.settings.template_swt;
   this.template_btn = this.settings.template_btn;
   this.template_swt_ext = this.settings.template_swt_ext;
   this.template_btn_ext = this.settings.template_btn_ext;
   this.canMove = this.settings.canMove;
   //structure
   this.structure = structure;
   this.listLength = 0;
   for (listItem in this.structure)
      this.listLength++;
   
   this.jump = function(pos) {
      this.itemObject.SetPosition(pos);
   }
   
   this.generateList = function() {
      if (this.canMove)
         this.itemObject.Enable = true;   
      else
         this.itemObject.Enable = false;         
      for (var i=0; i<this.listLength; i++) {
         switch(this.structure[i].type) {
            case "grp":
               this.itemObject.Template = this.template_grp;
               this.itemObject.CreateItem(i, 1, {Text: this.structure[i].text});
            break;
            case "swt":
               this.itemObject.Template = this.template_swt;
               var listItem = this.itemObject.CreateItem(i, 1, {Text: this.structure[i].text});
               var settings = {
                  popup: null,
                  popupItem: listItem,
                  bg: "itemBG",
                  indicator: "itemLED",
                  slider: "itemSLIDER",
                  xy: "itemXY",
                  sliderYOffset: 2,
                  sliderXOffsetOff: 38,
                  sliderXOffsetOn: 182,
                  signalFb: this.structure[i].fb
               } 
               var swt = new Switch(this.crestron, settings);
               swt.setFunc(this.structure[i].cmdOff, this.structure[i].cmdOn);
            break;
            case "btn":
               this.itemObject.Template = this.template_btn;
               var listItem = this.itemObject.CreateItem(i, 1, {Text: this.structure[i].text});
               var settings = {
                  popup: null,
                  popupItem : listItem,
                  bg: "btnBG",
                  indicator: "btnLED",
                  signalFb: this.structure[i].fb,
               }
               var btn = new Button(this.crestron, settings);
               btn.setFunc(this.structure[i].cmd);
            break;
            case "swt_ext":
               this.itemObject.Template = this.template_swt_ext;
               var listItem = this.itemObject.CreateItem(i, 1, {Text: this.structure[i].text});
               var settings = {
                  popup: null,
                  popupItem: listItem,
                  bg: "itemBG",
                  indicator: "itemLED",
                  slider: "itemSLIDER",
                  xy: "itemXY",
                  sliderYOffset: 2,
                  sliderXOffsetOff: 38,
                  sliderXOffsetOn: 182,
                  signalFb: this.structure[i].fb
               } 
               var swt = new Switch(this.crestron, settings);
               swt.setFunc(this.structure[i].cmdOff, this.structure[i].cmdOn);
               new ButtonExt(listItem, "btn", this.structure[i].cmd_ext);
            break;
            case "btn_ext":
               this.itemObject.Template = this.template_btn_ext;
               var listItem = this.itemObject.CreateItem(i, 1, {Text: this.structure[i].text});
               var settings = {
                  popup: null,
                  popupItem : listItem,
                  bg: "btnBG",
                  indicator: "btnLED",
                  signalFb: this.structure[i].fb,
               }
               var btn = new Button(this.crestron, settings);
               btn.setFunc(this.structure[i].cmd);
               new ButtonExt(listItem, "btn", this.structure[i].cmd_ext);
            break;
         }
      }            
   }
   this.generateList();
}
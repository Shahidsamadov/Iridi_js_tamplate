function PList2(crestron, settings, structure) {
   var that = this;
   this.crestron = crestron;
   this.settings = settings;
   this.structure = structure;
   //settings
   this.popup = this.settings.popup;
   this.item = this.settings.item;
   this.x = this.settings.x;
   this.y = this.settings.y;
   this.width = this.settings.width;
   this.height = this.settings.height;
   this.itemObject = IR.GetPopup(this.popup).CreateItem(IR.ITEM_GOOD_LIST, this.item, this.x, this.y, this.width, this.height);
   this.template_grp = this.settings.template_grp;
   this.template_swt = this.settings.template_swt;
   this.template_btn = this.settings.template_btn;
   this.template_swt_ext = this.settings.template_swt_ext;
   this.template_btn_ext = this.settings.template_btn_ext;
   //structure
   this.structure = structure;
   this.listLength = 0;
   for (listItem in this.structure)
      this.listLength++;
   //filter
   this.filterL = 0
   this.filterH = this.listLength;
   this.filter = function(filterL, filterH) {
      this.filterL = filterL;
      this.filterH = filterH;
      this.listLength = filterH - filterL;
      IR.DeleteItem(IR.GetPopup(this.popup).GetItem(this.item));
      IR.SetTimeout(200, function() {
         that.itemObject = IR.GetPopup(that.popup).CreateItem(IR.ITEM_GOOD_LIST, that.item, that.x, that.y, that.width, that.height);
         that.generateList();
      });
   }
   
   this.setVisible = function(visible) {
      IR.GetPopup(this.popup).GetItem(this.item).Visible = visible;    
   }
   
   //main
   this.generateList = function() {
      this.itemObject.db = [];
      this.itemObject.SelectMode = 0;
      this.itemObject.Adapter = {
         GetCount: function () {
	         return that.listLength;
	      }, 
         GetItem: function(pos) {
               pos = pos + that.filterL;
               var item;
               switch (that.structure[pos].type) {
                  case "grp":
                     item = IR.GetItem(that.template_grp).Clone(""+pos);
                     item.GetItem("btn").Text = that.structure[pos].text;
                  break;
                  case "swt":
                     item = IR.GetItem(that.template_swt).Clone(""+pos);
                     item.GetItem("btn").Text = that.structure[pos].text;
                     var settings = {
                        popup: null,
                        popupItem: item,
                        bg: "itemBG",
                        indicator: "itemLED",
                        slider: "itemSLIDER",
                        xy: "itemXY",
                        sliderYOffset: 2,
                        sliderXOffsetOff: 38,
                        sliderXOffsetOn: 182,
                        signalFb: that.structure[pos].fb
                     } 
                     var swt = new Switch(that.crestron, settings);
                     swt.setFunc(that.structure[pos].cmdOff, that.structure[pos].cmdOn);
                     that.itemObject.db.push(swt);
                     IR.AddListener(IR.EVENT_ITEM_PRESS, item.GetItem("itemXY"), function () {
                        swt.press();	
               		});
                  	IR.AddListener(IR.EVENT_TOUCH_MOVE, item.GetItem("itemXY"), function () {
               		   swt.move();	
               		});
                     IR.AddListener(IR.EVENT_MOUSE_MOVE, item.GetItem("itemXY"), function () {
               		   swt.move();	
               		});
               		IR.AddListener(IR.EVENT_ITEM_RELEASE, item.GetItem("itemXY"), function () {
                        swt.release();	
               		});               
                  break;
                  case "btn":
                     item = IR.GetItem(that.template_btn).Clone(""+pos);
                     item.GetItem("btn").Text = that.structure[pos].text;
                     var settings = {
                        popup: null,
                        popupItem : item,
                        bg: "btnBG",
                        indicator: "btnLED",
                        signalFb: that.structure[pos].fb,
                     }
                     var btn = new Button(that.crestron, settings);
                     btn.setFunc(that.structure[pos].cmd);
                     that.itemObject.db.push(btn);
                     IR.AddListener(IR.EVENT_ITEM_PRESS, item.GetItem("btnBG"), function() {
                        btn.press();
                     });
                     IR.AddListener(IR.EVENT_ITEM_RELEASE, item.GetItem("btnBG"), function() {
                        IR.SetTimeout(100, function() {
                           btn.release();
                        });	
               		});
                  break;
                  case "swt_ext":
                     item = IR.GetItem(that.template_swt_ext).Clone(""+pos);
                     item.GetItem("btn").Text = that.structure[pos].text;
                     var settings = {
                        popup: null,
                        popupItem: item,
                        bg: "itemBG",
                        indicator: "itemLED",
                        slider: "itemSLIDER",
                        xy: "itemXY",
                        sliderYOffset: 2,
                        sliderXOffsetOff: 38,
                        sliderXOffsetOn: 182,
                        signalFb: that.structure[pos].fb
                     } 
                     var swt = new Switch(that.crestron, settings);
                     swt.setFunc(that.structure[pos].cmdOff, that.structure[pos].cmdOn);
                     that.itemObject.db.push(swt);
                     IR.AddListener(IR.EVENT_ITEM_PRESS, item.GetItem("itemXY"), function () {
               		   swt.press();	
               		});
                  	IR.AddListener(IR.EVENT_TOUCH_MOVE, item.GetItem("itemXY"), function () {
               		   swt.move();	
               		});
                     IR.AddListener(IR.EVENT_MOUSE_MOVE, item.GetItem("itemXY"), function () {
               		   swt.move();	
               		});
               		IR.AddListener(IR.EVENT_ITEM_RELEASE, item.GetItem("itemXY"), function () {
               		   swt.release();	
               		});               
                     new ButtonExt(item, "btn", that.structure[pos].cmd_ext);
                  break;
                  case "btn_ext":
                     item = IR.GetItem(that.template_btn_ext).Clone(""+pos);
                     item.GetItem("btn").Text = that.structure[pos].text;
                     var settings = {
                        popup: null,
                        popupItem : item,
                        bg: "btnBG",
                        indicator: "btnLED",
                        signalFb: that.structure[pos].fb,
                     }
                     var btn = new Button(that.crestron, settings);
                     btn.setFunc(that.structure[pos].cmd);
                     that.itemObject.db.push(btn);
                     IR.AddListener(IR.EVENT_ITEM_PRESS, item.GetItem("btnBG"), function() {
                        btn.press();
                     });
                     IR.AddListener(IR.EVENT_ITEM_RELEASE, item.GetItem("btnBG"), function() {
                        IR.SetTimeout(100, function() {
                           btn.release();
                        });	
               		});
                     var btnExt = new ButtonExt(item, "btn", that.structure[pos].cmd_ext);
                     that.itemObject.db.push(btnExt);
                  break;
               }
               return item;
            
         },  
      }
      IR.AddListener(IR.EVENT_MOUSE_UP, IR.GetPopup(that.popup).GetItem(that.item), function() {
         IR.SetTimeout(100, function() {
            for (var i=0; i<that.itemObject.db.length; i++)
               if (that.itemObject.db[i] instanceof Switch || that.itemObject.db[i] instanceof Button || that.itemObject.db[i] instanceof ButtonExt)
                  that.itemObject.db[i].release();
         });
      });
      IR.AddListener(IR.EVENT_TOUCH_UP, IR.GetPopup(that.popup).GetItem(that.item), function() {
         IR.SetTimeout(100, function() {
            for (var i=0; i<that.itemObject.db.length; i++)
               if (that.itemObject.db[i] instanceof Switch || that.itemObject.db[i] instanceof Button || that.itemObject.db[i] instanceof ButtonExt)
                  that.itemObject.db[i].release();
         });
      });         
   }
   this.generateList();
}

var FMList = function(crestron, cmd, fb) {
   var that = this;
   this.crestron = crestron;
   this.cmd = cmd;
   this.fb = fb;   
   this.array = [];
   
   this.popupName;
   this.list;
   
   this.add = function(name, title, icon_B, icon_M, icon_S) {
      this.array.push([name, title, icon_B, icon_M, icon_S]);   
   }
   
   this.setItems = function(popupName, list, name, freq, img) {
      this.popupName = popupName;
      this.list = list;
      this.name = name;
      this.freq = freq;
      this.img = img;
   }
   
   this.build = function() {
      var list = IR.GetPopup(this.popupName).GetItem(this.list);
      list.Clear();
      for (var i=0; i<this.array.length; i++) {
         list.Template = "FMItem";
         list.CreateItem(i, 1, {Text: this.array[i][0]});
         list.CreateItem(i, 2, {Image: this.array[i][4]});
      }   
      IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, list, function(item, subitem, type, object) {
         if (type == 12) {
            that.setStationInfo(item);
            that.setStationOn(item);
         }
      });
   }
   
   this.setStationInfo = function(id) {
      var name = IR.GetPopup(this.popupName).GetItem(this.name);
      var freq = IR.GetPopup(this.popupName).GetItem(this.freq);
      var img = IR.GetPopup(this.popupName).GetItem(this.img);
      name.Text = this.array[id][0];
      freq.Text = this.array[id][1];   
      img.GetState(0).Image = this.array[id][2];
   }
   
   this.setStationOn = function(id) {
      this.crestron.setValue(this.cmd, (id+1));
      IR.SetTimeout(100, function() {
         that.crestron.setValue(that.cmd, 500);
      });
   }
   
   this.listen = function() {
      IR.AddListener(IR.EVENT_TAG_CHANGE, this.crestron.device, function(name, value) {
         if (name == that.fb && value>0) {
            that.setStationInfo(value-1);
         }   
      });
   }
}
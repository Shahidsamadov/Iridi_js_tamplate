var OnkyoRadio = function() {

   var that = this;
   this.stations = [];
   this.listName, this.titleName, this.popupName, this.freqName, this.imgName;
   
   this.buildList = function() {
      var list = IR.GetPopup(this.popupName).GetItem(this.listName);  
      list.Clear();
      for (var i=0; i<this.stations.length; i++) {
         list.Template = "RadioItem";         
         list.CreateItem(i, 1, {Text: this.stations[i][0]});
         list.CreateItem(i, 2, {Image: this.stations[i][2]});
      } 
      IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, IR.GetPopup(this.popupName).GetItem(this.listName), function(item, subitem, type, object) {
         if (type == 12) {
            that.setStationOn(item);
            that.setStationInfo(item);
         }
      });
   }
   
   this.addStation = function(station) {
      this.stations.push(station);
   }
   
   this.fb = function(stationin) {
      var station = stationin.slice(0, 5);
      var index = -1;
      for (var i=0; i<this.stations.length; i++) {
         if (this.stations[i][1] == station)
            index = i;
      }
      if (index >= 0) {
         this.setStationInfo(index);   
      } else {
         this.setStationInfo(-1);
      }
   }
   
   this.setDriverModule = function(driver) {
      this.driver = driver;
   }
   this.setItems = function(popupName, titleName, listName, freqName, imgName) {
      this.popupName = popupName;
      this.listName = listName;
      this.titleName = titleName;
      this.freqName = freqName;
      this.imgName = imgName;
   }
   
   this.setStationInfo = function(id) {
      var title = IR.GetPopup(this.popupName).GetItem(this.titleName);
      var freq = IR.GetPopup(this.popupName).GetItem(this.freqName);
      var img = IR.GetPopup(this.popupName).GetItem(this.imgName);
      if (id >= 0) {
         title.Text = this.stations[id][0];
         freq.Text = (this.stations[id][1]/100).toFixed(2) + " МГц";
         img.GetState(0).Image = this.stations[id][3];
         this.rebuildList(id);
      } else {
         title.Text = "---";
         freq.Text = "---";
         img.GetState(0).Image = "000_00.png";
         this.rebuildList(-1);
      }
   }
   this.rebuildList = function(id) {
      var list = IR.GetPopup(this.popupName).GetItem(this.listName);
      for (var i=0; i<this.stations.length; i++) {
         list.Template = "RadioItem";
         if (i == id && id>=0) {
            list.CreateItem(i, 3, {Image: "speaker_r.png"});
         } else {
            list.CreateItem(i, 3, {Image: "clear.png"});
         }
      }
   }
   this.setStationOn = function(id) {
      IR.PlaySound('Flashlight Turned On 01.wav',0,80);
      this.driver.publicCreatePacket(1, 'TUN', this.stations[id][1]);
   }
   
   //Initialize
   this.setItems("PopupFM", "title", "list", "freq", "img");
   this.addStation(["Дорожное радио", "08750", "087_50m.png", "087_50.png"]);
   this.addStation(["Retro FM", "08800", "088_00m.png", "088_00.png"]);
   this.addStation(["Авторадио", "08840", "088_40m.png", "088_40.png"]);
   this.addStation(["Юмор ФМ", "08890", "088_90m.png", "088_90.png"]);
   this.addStation(["Вести ФМ", "08930", "089_30m.png", "089_30.png"]);
   this.addStation(["Радио Зенит", "08970", "089_70m.png", "089_70.png"]);
   this.addStation(["Радио Эрмитаж", "09010", "090_10m.png", "090_10.png"]);
   this.addStation(["Радио для двоих", "09060", "090_60m.png", "090_60.png"]);
   this.addStation(["Новое Радио", "09110", "091_10m.png", "091_10.png"]);
   this.addStation(["Эхо Петербурга", "09150", "091_50m.png", "091_50.png"]);
   this.addStation(["Русская Служба Новостей", "09290", "092_90m.png", "092_90.png"]);
   this.addStation(["NRJ", "09500", "095_00m.png", "095_00.png"]);
   this.addStation(["Нева FM", "09590", "095_90m.png", "095_90.png"]);
   this.addStation(["Радио Дача", "09700", "097_00m.png", "097_00.png"]);
   this.addStation(["Nostalgia FM", "09860", "098_60m.png", "098_60.png"]);
   this.addStation(["Радио России", "09900", "099_00m.png", "099_00.png"]);
   this.addStation(["Европа Плюс", "10050", "100_50m.png", "100_50.png"]);
   this.addStation(["Питер FM", "10090", "100_90m.png", "100_90.png"]);
   this.addStation(["Эльдорадио", "10140", "101_40m.png", "101_40.png"]);
   this.addStation(["Страна FM", "10200", "102_00m.png", "102_00.png"]);
   this.addStation(["Radio Metro", "10240", "102_40m.png", "102_40.png"]);
   this.addStation(["Maximum", "10280", "102_80m.png", "102_80.png"]);
   this.addStation(["DFM", "10340", "103_40m.png", "103_40.png"]);
   this.addStation(["Детское Радио", "10370", "103_70m.png", "103_70.png"]);
   this.addStation(["НАШЕ Радио", "10400", "104_00m.png", "104_00.png"]);
   this.addStation(["Радио Шансон", "10440", "104_40m.png", "104_40.png"]);
   this.addStation(["Радио Балтика", "10480", "104_80m.png", "104_80.png"]);
   this.addStation(["Love Радио", "10530", "105_30m.png", "105_30.png"]);
   this.addStation(["Monte Carlo", "10590", "105_90m.png", "105_90.png"]);
   this.addStation(["Радио Рекорд", "10630", "106_30m.png", "106_30.png"]);
   this.addStation(["Радио Маяк", "10700", "107_00m.png", "107_00.png"]);
   this.addStation(["Бизнес-FM", "10740", "107_40m.png", "107_40.png"]);
   this.addStation(["Русское радио", "10780", "107_80m.png", "107_80.png"]);
   this.buildList();
}


var FMFavItem = function(crestron, fb, popup, item) {
   var that = this; 
   this.crestron = crestron;
   this.fb = fb;
   this.array = [];  
   this.popup = popup;
   this.item = item;
   
   this.add = function(freq, img) {
      this.array.push([freq, img]);
   }
   
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.crestron.device, function(name,value) {
      if (name == that.fb) {
         var index = 0;
         for (var i=0; i<that.array.length; i++)
            if (that.array[i][0] == value)
               index = i;
         IR.GetPopup(that.popup).GetItem(that.item).GetState(0).Icon = that.array[index][1];
      }
   });
   
   this.add(0, "");
   this.add(8750, "087_50m.png");
   this.add(8800, "088_00m.png");
   this.add(8840, "088_40m.png");
   this.add(8890, "088_90m.png");
   this.add(8930, "089_30m.png");
   this.add(8970, "089_70m.png");
   this.add(9010, "090_10m.png");
   this.add(9060, "090_60m.png");
   this.add(9110, "091_10m.png");
   this.add(9150, "091_50m.png");
   this.add(9500, "095_00m.png");
   this.add(9590, "095_90m.png");
   this.add(9700, "097_00m.png");
   this.add(9860, "098_60m.png");
   this.add(10010, "100_10m.png");
   this.add(10050, "100_50m.png");
   this.add(10090, "100_90m.png");
   this.add(10140, "101_40m.png");
   this.add(10200, "102_00m.png");
   this.add(10240, "102_40m.png");
   this.add(10280, "102_80m.png");
   this.add(10340, "103_40m.png");
   this.add(10370, "103_70m.png");
   this.add(10400, "104_00m.png");
   this.add(10440, "104_40m.png");
   this.add(10480, "104_80m.png");
   this.add(10530, "105_30m.png");
   this.add(10590, "105_90m.png");
   this.add(10630, "106_30m.png");
   this.add(10700, "107_00m.png");
   this.add(10740, "107_40m.png");
   this.add(10780, "107_80m.png");
}
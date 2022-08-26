var ClimateModule = function(crestron, sensorTemp, pointTemp, popup, itemSensor, itemPoint) {
   var that = this;
   this.crestron = crestron;
   this.sensorTemp = sensorTemp;
   this.pointTemp = pointTemp;
   this.popup = popup;
   this.itemSensorH = this.popup.itemH.GetItem(itemSensor);
   this.itemSensorV = this.popup.itemV.GetItem(itemSensor);
   this.itemPointH = this.popup.itemH.GetItem(itemPoint);
   this.itemPointV = this.popup.itemV.GetItem(itemPoint);
   this.sensorValue = 111;
   this.pointValue = 111;
   
   this.getFirstValues = function() {
      this.sensorValue = this.crestron.getValue(this.sensorTemp);
      this.pointValue = this.crestron.getValue(this.pointTemp);
      this.setValueToItems();
   }
   
   this.setValueToItems = function() {
      if (this.sensorValue.toString().length >= 3 && this.pointValue.toString().length >=3) {
         var valueSensorText = this.sensorValue.toString().charAt(0) + this.sensorValue.toString().charAt(1) + "." + this.sensorValue.toString().charAt(2) + " °C";
         var valuePointText = this.pointValue.toString().charAt(0) + this.pointValue.toString().charAt(1) + "." + this.pointValue.toString().charAt(2) + " °C";
         this.itemSensorH.Text = valueSensorText;
         this.itemSensorV.Text = valueSensorText;
         this.itemPointH.Text = valuePointText;
         this.itemPointV.Text = valuePointText;
      }
   }
   
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.crestron.device, function(name, value) {
      if (name == that.sensorTemp) {
         that.sensorValue = value;
         that.setValueToItems();
      }
      if (name == that.pointTemp) {
         that.pointValue = value;
         that.setValueToItems();  
      }          
   });
}
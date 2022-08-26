/*function IntCon(crestron) {
   var that = this;
   this.crestron = crestron;

   IR.AddListener(IR.EVENT_START,0,function()
   {
      IR.GetPage("Main").GetItem("Busy").Visible = false;
      IR.GetPage("Main").GetItem("Router button on").Visible = false;
   });



   IR.AddListener(IR.EVENT_TAG_CHANGE, this.crestron.device, function(name, value) {
      if (name == "[UI][IPD]Router_isOn") {
         if (value == 1)
         {
            IR.GetPage("Main").GetItem("Router button on").Visible = false;
         }
         else
         {
            IR.GetPage("Main").GetItem("Router button on").Visible = true;
         }
      }
      
      if (name == "[UI][IPD]Router_isOff") {
         if (value == 1)
         {
            IR.GetPage("Main").GetItem("Router button off").Visible = false;
         }
         else
         {
            IR.GetPage("Main").GetItem("Router button off").Visible = true;
         }
      }
      
      if (name == "[Router]Busy") {
         if (value == 1)
         {
            IR.GetPage("Main").GetItem("Busy").Visible = true;
         }
         else
         {
            IR.GetPage("Main").GetItem("Busy").Visible = false;
         }
      }
   });

};

        */
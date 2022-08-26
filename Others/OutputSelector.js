var OutputSelector = function() {
   var that = this;
   
   this.setTV = function() {
      IR.Log("TV select");
      IR.HideAllPopups();
      IR.ShowPopup("PopupMainTV");
      IR.ShowPopup("PopupMainUp");
      IR.SetVariable("Global.OutputTVStatus", 1);
      IR.SetVariable("Global.OutputProjectorStatus", 0);
      IR.SetVariable("Global.OutputAUStatus", 0);
      if (this.listener != undefined)
         this.listener.outputChanged();  
   }
   
   this.setProjector = function() {
      IR.Log("Projector select");
      IR.HideAllPopups();
      IR.ShowPopup("PopupMainProj");      
      IR.ShowPopup("PopupMainUp"); 
      IR.SetVariable("Global.OutputTVStatus", 0);
      IR.SetVariable("Global.OutputProjectorStatus", 1); 
      IR.SetVariable("Global.OutputAUStatus", 0);
      if (this.listener != undefined)
         this.listener.outputChanged();
   }
   
   this.setAU = function() {
      IR.Log("Audio select");
      IR.HideAllPopups();
      IR.ShowPopup("PopupMainAU");
      IR.ShowPopup("PopupMainUp");
      IR.SetVariable("Global.OutputTVStatus", 0);
      IR.SetVariable("Global.OutputProjectorStatus", 0); 
      IR.SetVariable("Global.OutputAUStatus", 1);
      if (this.listener != undefined)
         this.listener.outputChanged();
   }
   
   this.readFromMemory = function() {
      if (IR.GetVariable("Global.OutputTVStatus") == 1) {
         this.setTV();
      } else if (IR.GetVariable("Global.OutputProjectorStatus") == 1) {
         this.setProjector();   
      } else if (IR.GetVariable("Global.OutputAUStatus") == 1) {
         this.setAU();
      }
            
   }
}
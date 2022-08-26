
    //  Page.HidePopup("PopupConnection");

  
  IR.AddListener(IR.EVENT_ONLINE , IR.GetDevice("Global Cache"), function() 
//Событие срабатывающее при принятии событий от устройства
{  
IR.Log("CG is online");
IR.HidePopup('PopupConnection'); 
});

  IR.AddListener(IR.EVENT_OFFLINE , IR.GetDevice("Global Cache"), function() 
//Событие срабатывающее при принятии событий от устройства
{  
IR.Log("CG is offline");
IR.ShowPopup('PopupConnection');
});

  

    //Page.ShowPopup("PopupConnection");  

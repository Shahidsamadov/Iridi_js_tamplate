IR.AddListener(IR.EVENT_START, 0, function () {
    var button = IR.CreateItem(IR.ITEM_BUTTON,"Button 1",100,100,100,100);
    IR.AddListener(IR.EVENT_ITEM_RELEASE, button, function ()
    {
        IR.Log("action"); // action
        store.dispatch({ type: 'TOGGLE', id: 1 });
    });
    
    var button2 = IR.CreateItem(IR.ITEM_BUTTON,"Button 2",300,100,100,100);
    IR.AddListener(IR.EVENT_ITEM_RELEASE, button2, function ()
    {
        IR.Log("action 2"); // action
        store.dispatch({ type: 'TOGGLE', id: 1 });
    });
    
    var button3 = IR.CreateItem(IR.ITEM_BUTTON,"Button 3",500,100,100,100);
    IR.AddListener(IR.EVENT_ITEM_RELEASE, button3, function ()
    {
        IR.Log("action 2"); // action
        store.dispatch({ type: 'ON', id: 1 });
    });
    
    var button4 = IR.CreateItem(IR.ITEM_BUTTON,"Button 4",700,100,100,100);
    IR.AddListener(IR.EVENT_ITEM_RELEASE, button4, function ()
    {
        IR.Log("action 3"); // action
        store.dispatch({ type: 'OFF', id: 1 });
    });
    
    var label = IR.CreateItem(IR.ITEM_BUTTON,"Label 1",100,300,200,100);
    
    store.subscribe(function () {
        label.Text = store.getState()[1].myLight;
    });
    
    var label2 = IR.CreateItem(IR.ITEM_BUTTON,"Label 2",100,500,200,100);
    
    store.subscribe(function () {
        label2.Text = store.getState()[1].myLight;
    });
    
    var popup = IR.CreateItem(IR.ITEM_POPUP,'Popup 1',500,500,200,200);
    
    store.subscribe(function () {
        if (store.getState()[1].myLight)
            popup.Show();
        else
            popup.Hide();
    });
    
});

IR.AddListener(IR.EVENT_TAG_CHANGE, IR.GetDevice("Crestron") , function (name, value) {
   if (name == "[Light][Store]Ceiling[is_On]")
   {
       if (value == 1)
       {
           store.dispatch({ type: 'ON', id: 1 });
       }
       if (value == 0)
       {
           store.dispatch({ type: 'OFF', id: 1 });
       }
   }
   IR.Log(name + " got " + value);
});

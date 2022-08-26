function good_list (list_item, template) 
{
   var l_list = list_item;
   var l_oTemp = IR.GetItem(template);
   
   l_list.Color = 0xFFFFFFFF;
   l_list.SelectMode = 1; // 0 - cannot secect, 1 - one secected item, 1 - any number of items can be marked as selected  
   l_list.Direction = 1;  // 0 - horisontal from left to right, 1 - vertical from up to down
   
   l_list.Adapter = {
      //number of list items at start
      total: 8,   
      
      //function to count the number of list items
      GetCount : function ()  
      {   
   			return this.total;    
            //use as: IR.Log("Total number of items in list = " + l_oGList.Adapter.GetCount())
      }, 
      
      //function to work with list items    
      GetItem: function(in_nPos)  
      {   
         var l_oItem = l_oTemp.Clone("" + in_nPos);   // use popup as template of List item
         l_oItem.GetItem("Item_name").Text = in_nPos; // display the popup position at each list item
         
         // when press to popup in list
         IR.AddListener(IR.EVENT_ITEM_RELEASE, l_oItem, function () 
         {
            l_list.SetSelected(l_oItem);   // mark item as selected 	
   		}); 
         
         // when press to some item of popup in list
         IR.AddListener(IR.EVENT_ITEM_RELEASE, l_oItem.GetItem("Add"), function () 
         {
   		   l_list.Adapter.total += 1;   //add one more list item
            //l_list.Adapter.total -= 1;   //delete the last item of list
            l_list.Position = l_list.Adapter.total+1; // go to the last position of list         
            l_list.Update();   //update list when change the number of items in list from inside or outside
   		});
         
         return l_oItem;   //get object item
   	},
      
      //function to work with selected items
      SetSelected : function (in_oItem, in_bSelected)  
      {   
         if (in_bSelected == true) 
         {
            //IR.Log("selected > "+in_oItem.Name);
            in_oItem.GetItem("Selector").Value = 1;
         } else  in_oItem.GetItem("Selector").Value = 0;
      }     
   };
   return l_list; 
}

var l_oGList1 = new good_list(IR.GetPage("Page 1").CreateItem(IR.ITEM_GOOD_LIST, "ConList", 16, 16, 320, 600), "Popup 1");
var l_oGList2 = new good_list(IR.GetPage("Page 1").CreateItem(IR.ITEM_GOOD_LIST, "ConList_2", 352, 16, 320, 600), "Popup 1");  

/***** List Of Methods
*
*  l_oGList1.SetSelected(l_oItem)                               // mark list position as selected
*  l_oGList1.Update()                                           // update list when change the number of items
*  IR.DeleteItem(l_oGList1)                                     // remove List object
*
*  l_oGList1.Adapter.GetCount()                                 // get total number of list positions
*  l_oGList1.Adapter.GetItem(4).GetItem("Item_name").Text       // get list position by index
*  l_oGList1.Adapter.GetItem("4").GetItem("Item_name").Text     // get list position by name
*  l_oGList1.Adapter.total                                      // get or change total number of list positions
*
*  l_oGList1.SelectMode                                         // 0 - cannot secect, 1- one secected item, 1 - any number of items can be marked as selected
*  l_oGList1.Color                                              // color of List substate
*  l_oGList1.Direction                                          // 0 - horisontal from left to right, 1 - vertical from up to down
*  l_oGList1.Position                                           // set or get the current list position
*
*****/
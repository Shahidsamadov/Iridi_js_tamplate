var IR_anim_time_out = 150;  
 
// Search Switch
function XBMC_Search_Switch(Page){
   if(Page.GetItem("Filter").Visible){
      IR_anim([[
         [Page.GetItem("Filter")],[ 
             [1, 28, 500, "X", -1, 0], 
             [1, 500, -499, "Width", -1, 0]
         ]] 
         ], IR_anim_time_out, 0); 
    
      IR.SetTimeout(IR_anim_time_out, function(){
         Page.GetItem("Filter").Visible = 0; 
      });
      
      Page.GetItem("SearchShow").Visible = Page.GetItem("SearchShow").Enable = 1; 
      Page.GetItem("SearchingHide").Visible = Page.GetItem("SearchingHide").Enable = 0;
    }
    else{
       IR_anim([[
         [Page.GetItem("Filter")],[ 
             [1, 528, -500, "X", -1, 0], 
             [1, 1, 499, "Width", -1, 0]
         ]]
         ], IR_anim_time_out, 0); 
             
       Page.GetItem("Filter").Visible = 1;
       Page.GetItem("SearchShow").Visible = Page.GetItem("SearchShow").Enable = 0; 
       Page.GetItem("SearchingHide").Visible = Page.GetItem("SearchingHide").Enable = 1;
    }
}

function XBMC_Audio_Search_Switch(){
   XBMC_Search_Switch(IR.GetItem("XBMC_Audio"));
}

function XBMC_Video_Search_Switch(){
   XBMC_Search_Switch(IR.GetItem("XBMC_Video"));
}


function XBMC_TVShows_Search_Switch(){
   XBMC_Search_Switch(IR.GetItem("XBMC_TVShows"));
}
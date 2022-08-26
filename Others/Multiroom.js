// Unit: Multiroom

var multirooms = ["Room1","Room3","Room4"];

var dasp = {
  "Спутниковое" : "1",
  "AirPlay" : "2",
  "Радио" : "2"
};

var tempholder;

function OpenMultiRoom()
{
    switch (CurrentLocation)
    {
        case "Бассейн":
        case "Парная":
        case "Спорт":
            break;
        default:
            return;
    }
    
    if (this.State == 0)
       return;

      IR.SetVariable("Global.PlanWidget", "MULTI_Crestron_out");
      OpenOnPlan();
      
    for (i = 0; i < multirooms.length; i++) {
            IR.GetItem("MULTI_Crestron_out").GetItem(multirooms[i]).GetState(0).Color = 0x2F2F2FFF;
            IR.GetItem("MULTI_Crestron_out").GetItem(multirooms[i]+ " box").GetState(0).Color = 0x2F2F2FFF
    }
      

    for (i = 0; i < multirooms.length; i++) {
        if (IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_" + multirooms[i] + "_Is_On"))
        {
            IR.GetItem("MULTI_Crestron_out").GetItem(multirooms[i]).GetState(0).Color = 0xFF0000FF;
            IR.GetItem("MULTI_Crestron_out").GetItem(multirooms[i]+ " box").GetState(0).Color = 0x292929FF;
        }
            
        //IR.Log("Crestron_Reciever_" + multirooms[i] + "_Is_Src");
        //IR.Log(IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_" + multirooms[i] + "_Is_Src")); 
        //IR.Log(dasp[CurrentSource]);    
            
        if (IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_" + multirooms[i] + "_Is_Src") == dasp[CurrentSource])
        {
            IR.GetItem("MULTI_Crestron_out").GetItem(multirooms[i]).GetState(0).Color = 0x29ABE2FF;
            IR.GetItem("MULTI_Crestron_out").GetItem(multirooms[i]+ " box").GetState(0).Color = 0x1E1E1EFF;
            IR.Log("active");
        }
    }
    displaymulticons();
    IR.SetTimeout(1000, displaymulticons);
}

function multiroom()
{
    thisnow = this.Name;

    if ((CurrentSource == "Спутниковое") && (this.Name == "Room4"))
    {
        IR.ShowPopup("SHUTDOWN_SOURCE");
        return;
    }
    
    
    if (IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_" + this.Name + "_Is_On"))
    {
        if (IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_" + this.Name + "_Is_Src") == dasp[CurrentSource])
        {
            SetOffAndWait("Crestron_Reciever_" + this.Name + "_Off", "Crestron_Reciever_" + this.Name + "_Is_On", function(){IR.Log("Crestron Reciever " + thisnow + " Off")});
            SetValueAndWait("Crestron_Reciever_" + this.Name + "_Src", 0, "Crestron_Reciever_" + this.Name + "_Is_Src", function(){IR.Log(thisnow + " Source is " + dasp[CurrentSource])});
            this.GetState(0).Color = 0x2F2F2FFF;
            IR.GetItem("MULTI_Crestron_out").GetItem(this.Name + " box").GetState(0).Color = 0x2F2F2FFF;
        }
        else
            IR.ShowPopup("SOURCE_BUSY");
            tempholder = this;
            IR.GetItem("SOURCE_BUSY").GetItem("Multiroom").Visible = true;
    }
    else
    {
        SetAndWait("Crestron_Reciever_" + this.Name + "_On", "Crestron_Reciever_" + this.Name + "_Is_On", function(){IR.Log("Crestron Reciever " + thisnow + " On")});
        SetValueAndWait("Crestron_Reciever_" + this.Name + "_Src", dasp[CurrentSource], "Crestron_Reciever_" + this.Name + "_Is_Src", function(){IR.Log(thisnow + " Source is " + dasp[CurrentSource])});
        this.GetState(0).Color = 0x29ABE2FF;
        IR.GetItem("MULTI_Crestron_out").GetItem(this.Name + " box").GetState(0).Color = 0x1E1E1EFF;
        IR.SetTimeout(500, function() {
        IR.Log("GO");
        IR.GetDevice("Crestron").Set("Crestron_Reciever_" + thisnow + "_Volume", IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_" + thisnow + "_Volume_Level"));
        });
    }
    IR.SetTimeout(1000, displaymulticons);
    displaymulticons();
}

function switchroom()
{
//        if (DetectSource("Спорт","Спутниковое"))
        if ((tempholder.Name == "Room4") && (IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_Room4_Is_Src") == 1))
        {
            shutdowntv();
        }   
        IR.HidePopup("SOURCE_BUSY");
        SetValueAndWait("Crestron_Reciever_" + tempholder.Name + "_Src", dasp[CurrentSource], "Crestron_Reciever_" + tempholder.Name + "_Is_Src", function(){IR.Log(tempholder.Name + " Source is " + dasp[CurrentSource])});
        tempholder.GetState(0).Color = 0x29ABE2FF;
        IR.GetItem("MULTI_Crestron_out").GetItem(tempholder.Name + " box").GetState(0).Color = 0x1E1E1EFF;
        displaymulticons();
        IR.SetTimeout(1000, displaymulticons);
}

function muteallrooms()
{
    if (this.Value)
    {
        IR.Log("mute all rooms");
        Pulse("Crestron_Reciever_Room1_Mute_On");
        Pulse("Crestron_Reciever_Room2_Mute_On");
        Pulse("Crestron_Reciever_Room3_Mute_On");
        Pulse("Crestron_Reciever_Room4_Mute_On");
    }
    else
    {
        IR.Log("unmute all rooms");
        Pulse("Crestron_Reciever_Room1_Mute_Off");
        Pulse("Crestron_Reciever_Room2_Mute_Off");
        Pulse("Crestron_Reciever_Room3_Mute_Off");
        Pulse("Crestron_Reciever_Room4_Mute_Off");
    }
}

var g_oMultiPoolIcon = IR.GetItem("Main page").GetItem("Pool");
var g_oMultiSpaIcon = IR.GetItem("Main page").GetItem("Spa");
var g_oMultiSportIcon = IR.GetItem("Main page").GetItem("Sport");

function showmulticons(sourcetodisplay)
{
    var connectid = 0;
    switch(sourcetodisplay)
    {
        case "Yamaha":
            connectid = 2;
        break;
        case "Humax":
            connectid = 1;
        break;
    }

    g_oMultiPoolIcon.Visible = (IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_Room2_Is_Src") == connectid);
    g_oMultiSpaIcon.Visible = (IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_Room3_Is_Src") == connectid);
    g_oMultiSportIcon.Visible = (IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_Room4_Is_Src") == connectid);
}

function hidemulticons()
{
    g_oMultiPoolIcon.Visible = false;
    g_oMultiSpaIcon.Visible = false;
    g_oMultiSportIcon.Visible = false;
}

function checkmultiroomstate()
{
    var x = 0;
    for (i = 2; i < 5; i++)
    {
        if (IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_Room" + i + "_Is_Src") == 2)
             x++;
    } 
    
    if (x > 1)
    {
        return("Yamaha");
    }
    
    x = 0;
        
    for (i = 2; i < 5; i++)
    {
        if (IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_Room" + i + "_Is_Src") == 1)
             x++;
    }
    if (x > 1)
    {
        return("Humax");
    }
    return("None");
}

function displaymulticons()
{
    var currentinput;
    if (CurrentLocation == "Бассейн" || CurrentLocation == "Спорт" || CurrentLocation == "Парная")
    {
        if (MainTitle.State == 1)
        {
            currentinput = checkmultiroomstate();
            IR.Log("Multiroom state is " + checkmultiroomstate());
            if (currentinput == "Humax" && CurrentSource == "Спутниковое")
            {
                showmulticons("Humax");
                return;
            }
            else if (currentinput == "Yamaha")
            {
                showmulticons("Yamaha");
                return;
            }
        }
    }
    hidemulticons();
}
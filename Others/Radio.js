// Unit: Radio

var broker = 0;

function radiofix()
{
    broker = 1;
}

function setradio()
{
    if (broker)
    {
            switch (CurrentLocation)
            {
                case "Кинотеатр":
                case "Бильярд":
                    IR.GetDevice("Crestron").Set("Yamaha_Net_Radio_Preset_Number", this.Text);
                    Pulse("Yamaha_Net_Radio_Preset_Recall");
                    IR.Log("set radiostation big yamaha " + this.Text);
                break;
                case "Бассейн":
                case "Спорт":
                case "Парная":
                    IR.GetDevice("Crestron").Set("Mini_Yamaha_Net_Radio_Preset_Number", this.Text);
                    Pulse("Mini_Yamaha_Net_Radio_Preset_Recall");
                    IR.Log("set radiostation mini yamaha " + this.Text);
                break;
            }
    }
    //IR.Log(this.Text);
}

function opensettings()
{
            switch (CurrentLocation)
            {
                case "Кинотеатр":
                    switch (CurrentSource)
                    {
                        case "Спутниковое":
                        case "Apple TV":
                        case "Kodi":
                            IR.SetVariable("Tokens.PlanWidget", "BASS_SETTINGS,TREBLE_SETTINGS,REBOOT_SETTINGS,SURROUND_SETTINGS");
                        break;
                        default:
                            IR.SetVariable("Tokens.PlanWidget", "BASS_SETTINGS,TREBLE_SETTINGS,SURROUND_SETTINGS");
                        break;
                    }
                break;
                case "Бильярд":
                    IR.SetVariable("Tokens.PlanWidget", "BASS_SETTINGS,TREBLE_SETTINGS");
                break;
                case "Бассейн":
                case "Спорт":
                case "Парная":
                    if (CurrentSource == "Спутниковое")
                        IR.SetVariable("Tokens.PlanWidget", "BASS_SETTINGS,TREBLE_SETTINGS,REBOOT_SETTINGS");
                    else
                        IR.SetVariable("Tokens.PlanWidget", "BASS_SETTINGS,TREBLE_SETTINGS");
                break;
            }
    //setvalueinroom(g_oBassLevel, "Кинотеатр", value<<16>>16);
    //setvalueinroom(g_oTrebleLevel, "Кинотеатр", value<<16>>16);
    //IR.Log("open settings");
    switch (CurrentLocation)
    {
        case "Кинотеатр":
        case "Бильярд":
            g_oBassLevel.Value = (IR.GetDevice("Crestron").GetFeedback(asc[CurrentLocation] + "_Bass_Level")<<16>>16);
            g_oTrebleLevel.Value = (IR.GetDevice("Crestron").GetFeedback(asc[CurrentLocation] + "_Treble_Level")<<16>>16);    
        break;
        case "Бассейн":
        case "Спорт":
        case "Парная":
            g_oBassLevel.Value = (IR.GetDevice("Crestron").GetFeedback(asc[CurrentLocation] + "_Bass_Level")<<16>>16)/10;
            g_oTrebleLevel.Value = (IR.GetDevice("Crestron").GetFeedback(asc[CurrentLocation] + "_Treble_Level")<<16>>16)/10; 
    }
    
    IR.GetItem("BASS_SETTINGS").GetItem("BassText").Value = g_oBassLevel.Value / 2.0;
    IR.GetItem("TREBLE_SETTINGS").GetItem("TrebleText").Value = g_oTrebleLevel.Value / 2.0;
    
    OpenOnPlan();
    enableswipe = 0;
}
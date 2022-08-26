// Unit: Crestron

var airplaytotaltime;
var airplaycurrenttime;
var miniairplaytotaltime;
var miniairplaycurrenttime;

function parsetime(timeinstring)
{
    //IR.Log("incoming string" + timeinstring)
    var timenumber;
    var timesplit = timeinstring.split(":");
    //IR.Log("minutes " + timesplit[1] + " seconds " + timesplit[0])
    timenumber = Number(timesplit[1]) + Number(timesplit[0])*60;
    return timenumber;
}

var gospodi = {
  "Auto": 1,
  "Dolby Surround": 2,
  "DTS Neural:X": 3,
  "DTS NEO:6 Cinema": 4,
  "DTS NEO:6 Music": 5,
}

var sootvak = {
  1: 's',
  2: 'f',
  3: 'k',
  5: 'm',
  6: 'l',
  7: 'z'
}

function heza(valtohez, intval)
{
    IR.Log("HEZA icon " + intval);
            if (intval > 0)
            {
                valtohez.Value = 1;
                valtohez.GetState(1).Text = sootvak[intval];
            }
            else
                valtohez.Value = 0;
}

var gospodi2 = [
  "Yamaha_Main_2ch_Decoder_Auto",
  "Yamaha_Main_2ch_Decoder_Dolby_Surround",
  "Yamaha_Main_2ch_Decoder_NeuralX",
  "Yamaha_Main_2ch_Decoder_Neo6_Cinema",
  "Yamaha_Main_2ch_Decoder_Neo6_Music",
  "Yamaha_Main_2ch_Decoder_Auto",
]

var receiver2chstatenum = 0;

function huliganstvo()
{
    if (this.Value)
    {
        IR.Log(receiver2chstatenum);
        IR.Log(gospodi2[receiver2chstatenum]);
        Pulse(gospodi2[receiver2chstatenum]);
    }
}

var RoomGroup = {
  "Дом" : ["Кинотеатр", "Бильярд"],
  "Спа" : ["Бассейн","Спорт","Парная"]
};

var asc = {
  "Кинотеатр": "Yamaha_Main",
  "Бильярд": "Yamaha_Zone2",
  "Бассейн": "Crestron_Reciever_Room1",
  "Парная": "Crestron_Reciever_Room3",
  "Спорт": "Crestron_Reciever_Room4"
};

var volumeasc = {
  "Кинотеатр": "Yamaha_Main_Volume",
  "Бильярд": "Yamaha_Zone2_Volume",
  "Бассейн": "Crestron_Reciever_Room1_Volume",
  "Парная": "Crestron_Reciever_Room3_Volume",
  "Спорт": "Crestron_Reciever_Room4_Volume"
};

var volumeascrev = {
  "Yamaha_Main_Volume" : "Кинотеатр",
  "Yamaha_Zone2_Volume" : "Бильярд",
  "Crestron_Reciever_Room1_Volume" : "Бассейн",
  "Crestron_Reciever_Room3_Volume" : "Парная",
  "Crestron_Reciever_Room4_Volume" : "Спорт"
};

var ascrev = {
  "Yamaha_Main" : "Кинотеатр",
  "Yamaha_Zone2" : "Бильярд",
  "Crestron_Reciever_Room1" : "Бассейн",
  "Crestron_Reciever_Room3" : "Парная",
  "Crestron_Reciever_Room4" : "Спорт"
};

var g_oVolumeLevel = IR.GetItem("VOLUME_WIDGET").GetItem("Volume");
var g_oVolumeLevelPhantom = IR.GetItem("VOLUME_WIDGET").GetItem("Volume_Phantom");
var g_oMute = IR.GetItem("VOLUME_WIDGET").GetItem("Mute");
var g_oBassLevel = IR.GetItem("BASS_SETTINGS").GetItem("Bass");
var g_oTrebleLevel = IR.GetItem("TREBLE_SETTINGS").GetItem("Treble");

var g_oAirplayArtist = IR.GetItem("AIRPLAY").GetItem("Artist");
var g_oAirplayTitle = IR.GetItem("AIRPLAY").GetItem("Title");
var g_oAirplayAlbum = IR.GetItem("AIRPLAY").GetItem("Album");
var g_oAirplayElapsedTime = IR.GetItem("AIRPLAY").GetItem("Elapsed_Time");
var g_oAirplayTotalTime = IR.GetItem("AIRPLAY").GetItem("Total_Time");
var g_oAirplayPause = IR.GetItem("AIRPLAY").GetItem("Pause");

var g_oNetRadioArtist = IR.GetItem("RADIO_AV Reciever (5)").GetItem("Artist");
var g_oNetRadioTitle = IR.GetItem("RADIO_AV Reciever (5)").GetItem("Title");
var g_oNetRadioAlbum = IR.GetItem("RADIO_AV Reciever (5)").GetItem("Album");
var g_oNetRadioChannel = IR.GetItem("RADIO_AV Reciever (5)").GetItem("Channel");
var g_oNetRadioPause = IR.GetItem("RADIO_AV Reciever (5)").GetItem("Pause");

IR.AddListener(IR.EVENT_TAG_CHANGE, IR.GetDevice("Crestron") , function (name, value) {
    switch (name)
    {
        case "Yamaha_Main_Volume_Level":
            setvalueinroom(g_oVolumeLevel, "Кинотеатр", value);
            if (!run)
                setvalueinroom(g_oVolumeLevelPhantom, "Кинотеатр", value);
        break;
        case "Yamaha_Main_Volume_Level_Phantom":
            setvalueinroom(g_oVolumeLevelPhantom, "Кинотеатр", value);
        break;
        case "Yamaha_Main_Mute_Is_On":
            setvalueinroom(g_oMute, "Кинотеатр", value);
        break;
        case "Yamaha_Main_Bass_Level":
            setvalueinroom(g_oBassLevel, "Кинотеатр", value<<16>>16);
        break;
        case "Yamaha_Main_Treble_Level":
            setvalueinroom(g_oTrebleLevel, "Кинотеатр", value<<16>>16);
        break;
        case "Yamaha_Zone2_Volume_Level":
            setvalueinroom(g_oVolumeLevel, "Бильярд", value);
            if (!run)
                setvalueinroom(g_oVolumeLevelPhantom, "Бильярд", value);
        break;
        case "Yamaha_Zone2_Volume_Level_Phantom":
            setvalueinroom(g_oVolumeLevelPhantom, "Бильярд", value);
        break;
        case "Yamaha_Zone2_Mute_Is_On":
            setvalueinroom(g_oMute, "Кинотеатр", value);
        break;
        case "Yamaha_Zone2_Bass_Level":
            setvalueinroom(g_oBassLevel, "Бильярд", value<<16>>16);
        break;
        case "Yamaha_Zone2_Treble_Level":
            setvalueinroom(g_oTrebleLevel, "Бильярд", value<<16>>16);
        break;
        case "Crestron_Reciever_Room1_Volume_Level":
            setvalueinroom(g_oVolumeLevel, "Бассейн", value);
            if (!run)
            {
                setvalueinroom(g_oVolumeLevelPhantom, "Бассейн", value);
                IR.GetItem("MULTI_Crestron_out").GetItem("Room1_Volume").Value = value;
            }
        break;
        case "Crestron_Reciever_Room1_Volume_Level_Phantom":
            setvalueinroom(g_oVolumeLevelPhantom, "Бассейн", value);
        break;
        case "Crestron_Reciever_Room1_Mute_Is_On":
            setvalueinroom(g_oMute, "Бассейн", value);
        break;
        case "Crestron_Reciever_Room1_Bass_Level":
            setvalueinroom(g_oBassLevel, "Бассейн", (value<<16>>16) / 10);
        break;
        case "Crestron_Reciever_Room1_Treble_Level":
            setvalueinroom(g_oTrebleLevel, "Бассейн", (value<<16>>16) / 10);
        break;
        case "Crestron_Reciever_Room3_Volume_Level":
            setvalueinroom(g_oVolumeLevel, "Парная", value);
            if (!run)
            {
                setvalueinroom(g_oVolumeLevelPhantom, "Парная", value);
                IR.GetItem("MULTI_Crestron_out").GetItem("Room3_Volume").Value = value;
            }
        break;
        case "Crestron_Reciever_Room3_Volume_Level_Phantom":
            setvalueinroom(g_oVolumeLevelPhantom, "Парная", value);
        break;
        case "Crestron_Reciever_Room3_Mute_Is_On":
            setvalueinroom(g_oMute, "Парная", value);
        break;
        case "Crestron_Reciever_Room3_Bass_Level":
            setvalueinroom(g_oBassLevel, "Парная", (value<<16>>16) / 10);
        break;
        case "Crestron_Reciever_Room3_Treble_Level":
            setvalueinroom(g_oTrebleLevel, "Парная", (value<<16>>16) / 10);
        break;
        case "Crestron_Reciever_Room4_Volume_Level":
            setvalueinroom(g_oVolumeLevel, "Спорт", value);
            if (!run)
            {
                setvalueinroom(g_oVolumeLevelPhantom, "Спорт", value);
                IR.GetItem("MULTI_Crestron_out").GetItem("Room4_Volume").Value = value;
            }
        break;
        case "Crestron_Reciever_Room4_Volume_Level_Phantom":
            setvalueinroom(g_oVolumeLevelPhantom, "Спорт", value);
        break;
        case "Crestron_Reciever_Room4_Mute_Is_On":
            setvalueinroom(g_oMute, "Спорт", value);
        break;
        case "Crestron_Reciever_Room4_Bass_Level":
            setvalueinroom(g_oBassLevel, "Спорт", (value<<16>>16) / 10);
        break;
        case "Crestron_Reciever_Room4_Treble_Level":
            setvalueinroom(g_oTrebleLevel, "Спорт", (value<<16>>16) / 10);
        break;
        case "Yamaha_Airplay_Artist":
            setvalueinrooms(g_oAirplayArtist, "Дом", value);
            IR.Log("Setting airplay artist " + value);
            g_oAirplayArtist.Value = value;
        break;
       case "Yamaha_Airplay_Title":
            setvalueinrooms(g_oAirplayTitle, "Дом", value);
        break;
        case "Yamaha_Airplay_Album":
            setvalueinrooms(g_oAirplayAlbum, "Дом", value);
        break;
        case "Yamaha_Airplay_Elapsed_Time":
            setvalueinrooms(g_oAirplayElapsedTime, "Дом", value);
            airplaycurrenttime = parsetime(value);
            IR.GetItem("AIRPLAY").GetItem("Playbar").Value = airplaycurrenttime / airplaytotaltime;
        break;
        case "Yamaha_Airplay_Total_Time":
            setvalueinrooms(g_oAirplayTotalTime, "Дом", value);
            airplaytotaltime = parsetime(value);
        break;
        case "Yamaha_Airplay_Paused":
            setvalueinrooms2(g_oAirplayPause, "Дом", value);
        break;
        case "Mini_Yamaha_Airplay_Artist":
            setvalueinrooms(g_oAirplayArtist, "Спа", value);
        break;
        case "Mini_Yamaha_Airplay_Title":
            setvalueinrooms(g_oAirplayTitle, "Спа", value);
        break;
        case "Mini_Yamaha_Airplay_Album":
            setvalueinrooms(g_oAirplayAlbum, "Спа", value);
        break;
        case "Mini_Yamaha_Airplay_Elapsed_Time":
            setvalueinrooms(g_oAirplayElapsedTime, "Спа", value);
        break;
        case "Mini_Yamaha_Airplay_Total_Time":
            setvalueinrooms(g_oAirplayTotalTime, "Спа", value);
        break;
        case "Mini_Yamaha_Airplay_Paused":
            setvalueinrooms2(g_oAirplayPause, "Спа", value);
        break;
        case "Yamaha_Net_Radio_Artist":
            setvalueinrooms(g_oNetRadioArtist, "Дом", value);
        break;
        case "Yamaha_Net_Radio_Title":
            setvalueinrooms(g_oNetRadioTitle, "Дом", value);
        break;
        case "Yamaha_Net_Radio_Album":
            setvalueinrooms(g_oNetRadioAlbum, "Дом", value);
        break;
        case "Yamaha_Net_Radio_Channel":
            setvalueinrooms(g_oNetRadioChannel, "Дом", value);
        break;
        case "Mini_Yamaha_Net_Radio_Artist":
            setvalueinrooms(g_oNetRadioArtist, "Спа", value);
        break;
        case "Mini_Yamaha_Net_Radio_Title":
            setvalueinrooms(g_oNetRadioTitle, "Спа", value);
        break;
        case "Mini_Yamaha_Net_Radio_Album":
            setvalueinrooms(g_oNetRadioAlbum, "Спа", value);
        break;
        case "Mini_Yamaha_Net_Radio_Channel":
            setvalueinrooms(g_oNetRadioChannel, "Спа", value);
        break;
        case "Yamaha_Main_Sound_Program_Mode":
            IR.Log("sound");
            IR.Log(value);
            switch (value)
            {
                case "9ch Stereo":
                    IR.GetItem("SURROUND_SETTINGS").GetItem("Stereo").Value = 1;
                    IR.GetItem("SURROUND_SETTINGS").GetItem("DTS").Value = 0;
                break;
                case "Surround Decoder":
                    IR.GetItem("SURROUND_SETTINGS").GetItem("DTS").Value = 1;
                    IR.GetItem("SURROUND_SETTINGS").GetItem("Stereo").Value = 0;
                break;
            }
        break;
        case "Yamaha_Main_2ch_Decoder_Mode":
            IR.GetItem("SURROUND_SETTINGS").GetItem("DTS").Text = value;
            receiver2chstatenum = gospodi[value];
            //IR.Log(gospodi[value]);
        break;
        case "Yamaha_Net_Radio_Playing":
            setvalueinrooms2(g_oNetRadioPause, "Дом", value);
        break;
        case "Mini_Yamaha_Net_Radio_Playing":
            setvalueinrooms2(g_oNetRadioPause, "Спа", value);
        break;
        case "Splash":
            if (CurrentLocation == "Кинотеатр")
            {
                SetPopup("BUSY_POPUP", value);
                if (value)
                {
                    var localhelper1 = IR.SetInterval(1000, function() {                          
                        if (IR.GetDevice("Crestron").GetFeedback("Splash") == 0)
                        {
                            IR.HidePopup("BUSY_POPUP");
                            IR.ClearInterval(localhelper1);
                        }                    
                    });
                }
            }
        break;
        case "netping2_busy":
//            if (CurrentLocation == "Кинотеатр")
//            {
                SetPopup("RESTART_POPUP", value);
//                if (value)
//                {
                    var localhelper2 = IR.SetInterval(1000, function() {                          
                        if (IR.GetDevice("Crestron").GetFeedback("netping2_busy") == 0)
                        {
                            IR.HidePopup("RESTART_POPUP");
                            IR.ClearInterval(localhelper2);
                        }                    
                    });
//                }
//            }
        break;
        case "netping1_busy":
//            if (CurrentLocation == "Кинотеатр")
//            {
                SetPopup("RESTART_POPUP_ALT", value);
//                if (value)
//                {
                    var localhelper3 = IR.SetInterval(1000, function() {                          
                        if (IR.GetDevice("Crestron").GetFeedback("netping1_busy") == 0)
                        {
                            IR.HidePopup("RESTART_POPUP_ALT");
                            IR.ClearInterval(localhelper2);
                        }                    
                    });
//                }
//            }
        break;
        case "netping1a_busy":
//            if (CurrentLocation == "Кинотеатр")
//            {
                SetPopup("RESTART_POPUP_ALT2", value);
//                if (value)
//                {
                    var localhelper4 = IR.SetInterval(1000, function() {                          
                        if (IR.GetDevice("Crestron").GetFeedback("netping1a_busy") == 0)
                        {
                            IR.HidePopup("RESTART_POPUP_ALT2");
                            IR.ClearInterval(localhelper2);
                        }                    
                    });
//                }
//            }
        break;
        case "Cinema_source":
            IR.Log("cinema source icon");
            heza(g_oCinemaIcon,value);
        break;
        case "Billiard_source":
        IR.Log("billiard source icon");
            heza(g_oBilliardIcon,value);
        break;
        case "Pool_source":
        IR.Log("pool source icon");
            heza(g_oPoolIcon,value);
        break;
        case "Spa_source":
        IR.Log("spa source icon");
            heza(g_oSpaIcon, value);
        break;
        case "Sport_source":
        IR.Log("sport source icon");
            heza(g_oSportIcon,value);
        break;
    }
    IR.Log("FEEDBACK " + name+": "+value); // Feedback 1: 100
});

function setvalueinroom(param, room, value)
{
    IR.Log("Room: " + room + " Level: " + value);
    if (CurrentLocation == room)
        param.Value = value;
    if (param == g_oVolumeLevel);
        IR.GetItem("VOLUME_WIDGET").GetItem("VolumeText").Value = IR.GetDevice("Crestron").GetFeedback(asc[CurrentLocation] + "_Volume_Level") / 655;
}

function setvalueinrooms(param, roomselect, value)
{
    IR.Log("Room group: " + roomselect + " Level: " + value);
    if (RoomGroup[roomselect].join().search(CurrentLocation) != -1)
    {
        IR.Log("Searching "+ CurrentLocation + " in " + roomselect + " success");
        param.Text = value;
    }
    else
    {
        IR.Log("Searching "+ CurrentLocation + " in " + roomselect + " fail");
    }
}

function setvalueinrooms2(param, roomselect, value)
{
    IR.Log("Room group: " + roomselect + " Level: " + value);
    if (RoomGroup[roomselect].join().search(CurrentLocation) != -1)
    {
        IR.Log("Searching "+ CurrentLocation + " in " + roomselect + " success");
        param.Value = value;
    }
    else
    {
        IR.Log("Searching "+ CurrentLocation + " in " + roomselect + " fail");
    }
}

function setmute()
{
    switch (CurrentLocation)
    {
        case "Кинотеатр":
            Pulse("Yamaha_Main_Mute_Toggle");
        break;
        case "Бильярд":
            Pulse("Yamaha_Zone2_Mute_Toggle");
        break;
        case "Бассейн":
            if (IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_Room1_Mute_Is_On"))
                Pulse("Crestron_Reciever_Room1_Mute_Off");
            else
                Pulse("Crestron_Reciever_Room1_Mute_On");
        break;
        case "Парная":
            if (IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_Room3_Mute_Is_On"))
                Pulse("Crestron_Reciever_Room3_Mute_Off");
            else
                Pulse("Crestron_Reciever_Room3_Mute_On");
        break;
        case "Спорт":
            if (IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_Room4_Mute_Is_On"))
                Pulse("Crestron_Reciever_Room4_Mute_Off");
            else
                Pulse("Crestron_Reciever_Room4_Mute_On");
        break;
    }
}

function setvolume()
{
    IR.Log("Value: " + this.Value);
    //IR.GetItem("VOLUME_WIDGET").GetItem("VolumeText").Value = this.Value / 655;
    IR.GetDevice("Crestron").Set(asc[CurrentLocation] + "_Volume", this.Value);
}

function setbass()
{
    IR.Log("Value: " + this.Value);
    IR.GetItem("BASS_SETTINGS").GetItem("BassText").Value = this.Value / 2.0;
    switch (CurrentLocation)
    {
        case "Кинотеатр":
            IR.GetDevice("Crestron").Set("Yamaha_Main_Bass", this.Value);
        break;
        case "Бильярд":
            IR.GetDevice("Crestron").Set("Yamaha_Zone2_Bass", this.Value);
        break;
        case "Бассейн":
            IR.GetDevice("Crestron").Set("Crestron_Reciever_Room1_Bass", this.Value * 10);
        break;
        case "Парная":
            IR.GetDevice("Crestron").Set("Crestron_Reciever_Room3_Bass", this.Value * 10);
        break;
        case "Спорт":
            IR.GetDevice("Crestron").Set("Crestron_Reciever_Room4_Bass", this.Value * 10);
        break;
    }
}

function settreble()
{
    IR.Log("Value: " + this.Value);
    IR.GetItem("TREBLE_SETTINGS").GetItem("TrebleText").Value = this.Value / 2.0;
    switch (CurrentLocation)
    {
        case "Кинотеатр":
            IR.GetDevice("Crestron").Set("Yamaha_Main_Treble", this.Value);
        break;
        case "Бильярд":
            IR.GetDevice("Crestron").Set("Yamaha_Zone2_Treble", this.Value);
        break;
        case "Бассейн":
            IR.GetDevice("Crestron").Set("Crestron_Reciever_Room1_Treble", this.Value * 10);
        break;
        case "Спорт":
            IR.GetDevice("Crestron").Set("Crestron_Reciever_Room2_Treble", this.Value * 10);
        break;
        case "Парная":
            IR.GetDevice("Crestron").Set("Crestron_Reciever_Room3_Treble", this.Value * 10);
        break;
    }
}

function pulsepause()
{
    IR.Log("Pause impulse");
    IR.Log(CurrentSource);
    switch (CurrentSource)
    {
        case "AirPlay":
            IR.Log("Current source is airplay");
            switch (CurrentLocation)
            {
                case "Кинотеатр":
                case "Бильярд":
                    if (IR.GetDevice("Crestron").GetFeedback("Yamaha_Airplay_Playing"))
                        Pulse("Yamaha_Airplay_Pause");
                    else
                        Pulse("Yamaha_Airplay_Play");
                break;
                case "Бассейн":
                case "Спорт":
                case "Парная":
                    if (IR.GetDevice("Crestron").GetFeedback("Mini_Yamaha_Airplay_Playing"))
                        Pulse("Mini_Yamaha_Airplay_Pause");
                    else
                        Pulse("Mini_Yamaha_Airplay_Play");
                break;
            }
        break;
        case "Радио":
            switch (CurrentLocation)
            {
                case "Кинотеатр":
                case "Бильярд":
                    if (IR.GetDevice("Crestron").GetFeedback("Yamaha_Net_Radio_Playing"))
                        Pulse("Yamaha_Net_Radio_Stop");
                    else
                        Pulse("Yamaha_Net_Radio_Play");
                break;
                case "Бассейн":
                case "Спорт":
                case "Парная":
                    if (IR.GetDevice("Crestron").GetFeedback("Mini_Yamaha_Net_Radio_Playing"))
                        Pulse("Mini_Yamaha_Net_Radio_Stop");
                    else
                        Pulse("Mini_Yamaha_Net_Radio_Play");
                break;
            }
        break;
     }    
}

function pulseprev()
{
    switch (CurrentSource)
    {
        case "AirPlay":
            switch (CurrentLocation)
            {
                case "Кинотеатр":
                case "Бильярд":
                    Pulse("Yamaha_Airplay_Prev");
                break;
                case "Бассейн":
                case "Спорт":
                case "Парная":
                    Pulse("Mini_Yamaha_Airplay_Prev");
                break;
            }
        break;
        case "Радио":
            switch (CurrentLocation)
            {
                case "Кинотеатр":
                case "Бильярд":
                    var radionum = Number(IR.GetDevice("Crestron").GetFeedback("Yamaha_Net_Radio_Preset_Number"));
                    IR.GetDevice("Crestron").Set("Yamaha_Net_Radio_Preset_Number", radionum - 1);
                    Pulse("Yamaha_Net_Radio_Preset_Recall");
                break;
                case "Бассейн":
                case "Спорт":
                case "Парная":
                break;
            }
        break;
    }
}

function pulsenext()
{
    switch (CurrentSource)
    {
        case "AirPlay":
            switch (CurrentLocation)
            {
                case "Кинотеатр":
                case "Бильярд":
                    Pulse("Yamaha_Airplay_Next");
                break;
                case "Бассейн":
                case "Спорт":
                case "Парная":
                    Pulse("Mini_Yamaha_Airplay_Next");
                break;
            }
        break;
        case "Радио":
            switch (CurrentLocation)
            {
                case "Кинотеатр":
                case "Бильярд":
                    var radionum = Number(IR.GetDevice("Crestron").GetFeedback("Yamaha_Net_Radio_Preset_Number"));
                    IR.Log(radionum);
                    IR.GetDevice("Crestron").Set("Yamaha_Net_Radio_Preset_Number", radionum + 1);
                    Pulse("Yamaha_Net_Radio_Preset_Recall");
                break;
                case "Бассейн":
                case "Спорт":
                case "Парная":
                break;
            }
        break;
    }
}

// Unit: SetIconValue

var g_oAirplayIcon = IR.GetItem("AIRPLAY_NAME (1)").GetItem("Icon");
var g_oRadioIcon = IR.GetItem("RADIO_NAME (1)").GetItem("Icon");
var g_oAppleTVIcon = IR.GetItem("APPLETV_NAME (1)").GetItem("Icon");
var g_oSatteliteIcon = IR.GetItem("SATELLITE_NAME (1)").GetItem("Icon");
var g_oKodiIcon = IR.GetItem("KODI_NAME (1)").GetItem("Icon");
var g_oXboxIcon = IR.GetItem("XBOX_NAME (1)").GetItem("Icon");

function seticonvalue(location)
{
    switch(location)
    {
    case "Кинотеатр":
        g_oAppleTVIcon.Value = DetectSource(location,"Apple TV");
        g_oSatteliteIcon.Value = DetectSource(location,"Спутниковое");
        g_oAirplayIcon.Value = DetectSource(location,"AirPlay");
        g_oRadioIcon.Value = DetectSource(location,"Радио");
        g_oKodiIcon.Value = DetectSource(location,"Kodi");
        g_oXboxIcon.Value = DetectSource(location,"XBOX");
    break;
    case "Бильярд":
        g_oAirplayIcon.Value = DetectSource(location,"AirPlay");
        g_oRadioIcon.Value = DetectSource(location,"Радио");
    break;
    case "Бассейн":
        g_oAirplayIcon.Value = DetectSource(location,"AirPlay");
        g_oRadioIcon.Value = DetectSource(location,"Радио");
    break;
    case "Парная":
        g_oAirplayIcon.Value = DetectSource(location,"AirPlay");
        g_oRadioIcon.Value = DetectSource(location,"Радио");
    break;
    case "Спорт":
        g_oAirplayIcon.Value = DetectSource(location,"AirPlay");
        g_oRadioIcon.Value = DetectSource(location,"Радио");
        g_oSatteliteIcon.Value = DetectSource(location,"Спутниковое");
    break;
    }
}

// Unit: SetIconSource

var g_oCinemaIcon = IR.GetItem("CINEMA_NAME (1)").GetItem("Icon");
var g_oBilliardIcon = IR.GetItem("LIVING_NAME (1)").GetItem("Icon");
var g_oPoolIcon = IR.GetItem("SWIMMING_POOL_NAME (1)").GetItem("Icon");
var g_oSpaIcon = IR.GetItem("BOILER_NAME (1)").GetItem("Icon");
var g_oSportIcon = IR.GetItem("SECURITY_NAME (1)").GetItem("Icon");

function seticonsource()
{
    //return;
   IR.Log("Setting icon source");
    setlocationstate(g_oCinemaIcon,"Кинотеатр");
    setlocationstate(g_oBilliardIcon,"Бильярд");
    setlocationstate(g_oPoolIcon,"Бассейн");
    setlocationstate(g_oSpaIcon,"Парная");
    setlocationstate(g_oSportIcon,"Спорт");  
}

function setlocationstate(element,location)
{
    IR.Log("Setting location state for " + location);
    element.Value = locationisactive(location);
    if (locationisactive(location))
    {
        element.GetState(1).Text = findlocationsource(location);
    }
}

function locationisactive(location)
{
    switch(location)
    {
    case "Кинотеатр":
        return DetectSource(location,"Apple TV") || DetectSource(location,"Спутниковое") || DetectSource(location,"AirPlay") || DetectSource(location,"Радио")|| DetectSource(location,"Kodi") || DetectSource(location,"XBOX");
    break;
    case "Бильярд":
        return DetectSource(location,"AirPlay") || DetectSource(location,"Радио");
    break;
    case "Бассейн":
        return DetectSource(location,"Спутниковое") || DetectSource(location,"AirPlay") || DetectSource(location,"Радио");
    break;
    case "Парная":
        return DetectSource(location,"Спутниковое") || DetectSource(location,"AirPlay") || DetectSource(location,"Радио");
    break;
    case "Спорт":
        return DetectSource(location,"Спутниковое") || DetectSource(location,"AirPlay") || DetectSource(location,"Радио");
    break;
    }
}

function findlocationsource(location)
{
    if (DetectSource(location,"Apple TV"))
        return 'm';
    if (DetectSource(location,"Спутниковое"))
        return 'k';
    if (DetectSource(location,"AirPlay"))
        return 'f';
    if (DetectSource(location,"Радио"))
        return 's';
    if (DetectSource(location,"Kodi"))
        return 'l';
    if (DetectSource(location,"XBOX"))
        return 'z';
}

function openseticon()
{
    if (this.Value)
    {
        IR.Log("one");
        OpenRoomByTextIcon(this.Text, this.Parent.GetItem("Title").Text);
    }
    else
    {
        IR.Log("two");
        OpenSource3(this.Parent.GetItem("Title").Text);
    }
    IR.Log(this.Parent.GetItem("Title").Text);
}

function OpenRoomByTextIcon(icontext,location)
{
        CurrentLocation = location;
        MainTitle.Text = CurrentLocation;
        switch(icontext)
        {
            case 'm':
                CurrentSource = "Apple TV";
            break;
            case 'k':
                CurrentSource = "Спутниковое";
            break;
            case 'f':
                CurrentSource = "AirPlay";
            break;
            case 's':
                CurrentSource = "Радио";
            break;
            case 'l':
                CurrentSource = "Kodi";
            break;
            case 'z':
                CurrentSource = "XBOX";
            break;
        }
        OpenRoom();
}


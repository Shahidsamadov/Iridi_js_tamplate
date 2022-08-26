// Unit: Volume

var setslider = IR.GetItem("VOLUME_WIDGET").GetItem("Volume_Phantom");
var getslider = IR.GetItem("VOLUME_WIDGET").GetItem("Volume");

var run = false;

var idtimer;
var idtimer2;
var idtimer3;
var idtimer4;

function press()
{   
    run = true;
    idtimer3 = IR.SetInterval(100, boop);
}

function press1()
{
    var mythis = this;
    run = true;
    idtimer4 = IR.SetInterval(100, function() {
        if (run)
        {
            if (mythis.Value > IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_" + mythis.Name + "_Level"))
            {
                IR.GetDevice("Crestron").Set("Crestron_Reciever_" + mythis.Name, IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_" + mythis.Name + "_Level") + 500);
            }
            
            if (mythis.Value < IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_" + mythis.Name + "_Level"))
            {
                IR.GetDevice("Crestron").Set("Crestron_Reciever_" + mythis.Name, IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_" + mythis.Name + "_Level") - 500);
            }
        }
    });
}

var run2 = false;

function plus()
{
    var mythis = this;
    run2 = "plus";
    idtimer = IR.SetTimeout(200, function() { 
        idtimer2 = IR.SetInterval(100, function(){
            if (mythis.Value)
            {
                IR.GetDevice("Crestron").Set(asc[CurrentLocation] + "_Volume", getslider.Value + 500);
                setslider.Value = getslider.Value;
            }
            else
                IR.ClearInterval(idtimer2);
        });
        run2 = false;
    });
}

function minus()
{
    var mythis = this;
    run2 = "minus";
    idtimer = IR.SetTimeout(200, function() {
        idtimer2 = IR.SetInterval(100, function(){
            if (mythis.Value)
            {
                IR.GetDevice("Crestron").Set(asc[CurrentLocation] + "_Volume", getslider.Value - 500);
                setslider.Value = getslider.Value;
            }
            else
                IR.ClearInterval(idtimer2);
        });
        run2 = false;
    });
}

function volumerelease()
{
    IR.ClearInterval(idtimer);
    IR.ClearInterval(idtimer2);
    if (run2 == false)
        IR.GetDevice("Crestron").Set(asc[CurrentLocation] + "_Volume", getslider.Value);
    else if (run2 == "plus")
        IR.GetDevice("Crestron").Set(asc[CurrentLocation] + "_Volume", getslider.Value + 500);
    else if (run2 == "minus")
        IR.GetDevice("Crestron").Set(asc[CurrentLocation] + "_Volume", getslider.Value - 500);
}

function release()
{  
    IR.ClearInterval(idtimer3);
    setslider.Value = getslider.Value;
    run = false;
}

function release1()
{
    IR.ClearInterval(idtimer4);
    this.Value = IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_" + this.Name + "_Level");
    run = false;

    return;
    setslider1 = this;
    getslider1 = IR.GetItem("MULTI_Crestron_out").GetItem(this.Name + "_vol");
    if(run)
    {
        if (setslider1.Value > getslider1.Value)
            this.Value = getslider1.Value + 500;
        if (setslider1.Value < getslider1.Value)
            this.Value = getslider1.Value - 500;
    }
    else
    {
        this.Value = getslider1.Value;
    }
    IR.Log("Release " + this.Value);
    run = false;
}

function boop()
{
    if (run)
    {
        if (setslider.Value > getslider.Value)
        {
            IR.GetDevice("Crestron").Set(asc[CurrentLocation] + "_Volume", getslider.Value + 500);
        }
        
        if (setslider.Value < getslider.Value)
        {
            IR.GetDevice("Crestron").Set(asc[CurrentLocation] + "_Volume", getslider.Value - 500);
        }
    }
}
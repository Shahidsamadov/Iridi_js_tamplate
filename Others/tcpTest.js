var driver = IR.CreateDevice(IR.DEVICE_CUSTOM_TCP, "AV Device (TCP)",    
            {Host: "127.0.0.1",
            Port: 5200,
            SSL: false,
            SendMode: IR.ALWAYS_CONNECTED,
            ScriptMode: IR.DIRECT_AND_SCRIPT,
            SendCommandAttempts: 0,
            ConnectWaitTimeMax: 3000,
            ReceiveWaitTimeMax: 5000,
            Login: "",
            Password: "",
            DisableQueue: false
});

var br50 = [0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0x80,0xD5,0x5A];

function test()
{
    IR.GetDevice("AV Device (TCP)").Send(br50);
}
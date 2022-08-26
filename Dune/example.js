// When start app
IR.AddListener(IR.EVENT_START, 0, function(){     

   // create example
   var Dune_1 = new dune_ftp(
   
            "DuneHD",                     // page
            "list",                       // list
            "home",                       // button home
            "back",                       // button back
            "folder_name",                // folder name label
            "status",                     // status item
            "192.168.0.56",               // ip adress for FTP
            "Folder.png",                 // folder icon
            "Folder.png",                 // drive icon
            "search",                     // search button
            "Dune_1",                     // driver http name
            "DuneList",                   // list of flash drive
            "Wait",                       // wait popup
            "Toggle",                     // Toggle button 
            "Switcher",                   // Gesture on / off button           
                                          // Localisation
            {
               Waking: "Please wait, the player is waking.",
               Sleep:  "The player is sleeping. You can wake him.",   
               Offline: "The player is not available. Check the player connection to the power networks and information networks.",
               MediaLabel: "Media Library"
            }
   );        
});
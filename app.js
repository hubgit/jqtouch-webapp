var jqt = $.jQTouch({
  icon: "images/icon.png",
  startupScreen: "images/startup.png",
  statusBar: "black-translucent",
  fullscreen: true
});

var app = {
  db: null,
  
  init: function(){
    if ("platform" in window) { // running in Prism
      window.platform.icon().showNotification("Prism", "It's running in Prism!", null);
      window.platform.icon().badgeText = "Yes!";
    }
       
    if (typeof window.openDatabase != "undefined")
      app.setupDatabase();
    
    $("#settingsButton").click(app.showSettings);
		$("#settings").submit(app.saveSettings);		
  
    app.loadSettings(); // asynchronous
  },
  
  setupDatabase: function(){      
    app.db = new DB(app.dbName, '1.0', 'Settings database', 1024*1024); // 1MB database
    if (typeof app.db.query == "undefined"){
      app.db = null;
      return false; 
    }
    
    //app.db.query("DROP TABLE settings");
    //app.db.query("DELETE FROM settings");
    //app.db.query("VACUUM");
    
    // TODO: check for existing table before running the queries below

    app.db.query("CREATE TABLE IF NOT EXISTS settings (\
      field NVARCHAR(255) PRIMARY KEY,\
      value NVARCHAR(255)\
      );");
    
    for (var field in app.settings)
      app.db.query("INSERT OR IGNORE INTO settings (field, value) VALUES (?, ?)", [field, app.settings[field]]);
  },
  

  loadSettings: function(field){
    if (typeof window.localStorage == "undefined"){
      alert("To store settings, you'll need a browser that supports HTML5");
      app.main();
      return false;
    }
    
    if (app.db){
      app.db.query("SELECT * FROM settings", [], function(result){ 
        for (var i = 0; i < result.rows.length; i++){
          var row = result.rows.item(i);
          if (row.value != null)
            app.settings[row.field] = row.value;
        }
        app.main();
      });
    }
    else {
      for (var field in app.settings){
        var value = localStorage.getItem(field);
        if (value !== null) // override default settings
          app.settings[field] = value;
      }
      app.main();
    }    
  },
  
  saveSettings: function(e){    
    e.preventDefault();
    
    for (var field in app.settings){
      var input = $(this[field]);
      
      switch(input.attr("type")){
        case "text":
        default:
          var value = input.val();
        break;
        
        case "checkbox":
          var value = (input.attr("checked") ? 1 : 0);
        break;
      }
      
      if (app.settings[field] != value)
        app.saveSetting(field, value);
    }
            
    jqt.goTo($("#home"));
    app.main();
    
    return false;
  },
  
  saveSetting: function(field, value){
    if (app.db)
      app.db.query("UPDATE settings SET value = ? WHERE field = ?", [value, field]);
    else 
      localStorage.setItem(field, value);
      
    app.settings[field] = value;
  },
  
  showSettings: function(){
   jqt.goTo($("#settings"));
   
   var form = $("#settings");

   for (var field in app.settings){
     var input = $("#" + field, form);
     var value = app.settings[field];
          
     switch(input.attr("type")){
       case "text":
       default:
         input.val(value);
       break;
       
       case "checkbox":
         input.attr("checked", (value == 1 ? true : false));
       break;
     }
   }
     
   return false;
  }
};

$().ready(app.init);

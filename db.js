var DB = function(name, version, description, size){
  if (typeof window.openDatabase == "undefined")
    return false;
    
  var self = this;
  
  self.db = openDatabase(name, version, description, size);
  
  if (!self.db)
    return false;
  
  self.query = function(sql, params, success, error){
    if (!params)
      params = [];

    if (typeof error != "function")
      error = self.log;
    
    if (typeof success != "function")
      success = self.log;

    self.log(sql); self.log(params);

    self.db.transaction(function(tx) {
      tx.executeSql(sql, params, function(tx, result){ success(result); }, function(tx, result){ error(result); });
    });
  };
  
  self.log = function(result){
    //console.log(result);
  };
};
<?php require dirname(__FILE__) . '/config.php'; ?>
<!DOCTYPE html>
<html manifest="manifest.php">
<head>
  <meta http-equiv="content-type" value="text/html;charset=utf-8">
  <title><?php print htmlspecialchars($title); ?></title>

  <link rel="stylesheet" href="jqtouch/jqtouch/jqtouch.css"/>
  <link rel="stylesheet" href="<?php print $theme . '/theme.css'; ?>"/>
  
  <script src="jqtouch/jqtouch/jquery.1.3.2.min.js"></script>
  <script src="jqtouch/jqtouch/jqtouch.js"></script>
  <script src="db.js"></script>
  <script src="app.js"></script>
  <script src="app.specific.js"></script>
  
  <script>
    var theme = "<?php print $theme; ?>";
    app.dbName = "<?php print $app_db_name; ?>";
  </script>
</head>

<body>
  
  <div id="home">
    <div class="toolbar">
      <a class="button" id="settingsButton" href="#settings">Settings</a> 
    </div>

    <ul id="items">
      <li id="loading"><img src="images/loading.gif"/></li>
    </ul>
  </div>

  <?php include dirname(__FILE__) . '/settings.php'; ?>

</body>
</html>
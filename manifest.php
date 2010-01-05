<?php header('Content-Type: text/cache-manifest'); ?>
<?php require dirname(__FILE__) . '/config.php'; ?>
CACHE MANIFEST
# Version 20100101.1

index.php

app.css

<?php foreach (glob(sprintf('%s/*.js', dirname(__FILE__))) as $file) printf("%s\n", basename($file)); ?>

jqtouch/jqtouch/jquery.1.3.2.min.js
jqtouch/jqtouch/jqtouch.js

<?php print $theme . '/theme.css'; ?>
<?php foreach (glob(sprintf('%s/%s/img/*', dirname(__FILE__), $theme)) as $file) printf("%s/img/%s\n", $theme, basename($file)); ?>

<?php include dirname(__FILE__) . '/manifest.specific.php'; ?>
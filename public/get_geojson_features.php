<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
include("includes\db_conn.php");

$geojsonFeatures = file_get_contents('http://localhost/proj_hub/proj_hub/public/all.geojson');
echo $geojsonFeatures;

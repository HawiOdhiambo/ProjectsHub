<?php
$servername = "localhost:3306";
	$username = "root";
	$password = "1234";
	$dbname = "projectsdatabase";


// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

?>
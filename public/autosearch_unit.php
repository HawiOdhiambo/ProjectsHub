<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
include("includes\db_conn.php");


$searchChar=$_GET['charEntered'];
//$searchChar='';

//echo $searchChar;
//if the variable is not empty
if(isset($searchChar)){

		$sql="SELECT DISTINCT(`unit`) FROM project_details WHERE `unit` LIKE'%$searchChar%'";

	if($result=mysqli_query($conn, $sql)){
		
		$unitsArray=[]; //stores all the units data
		$i=0; //counter
		while($row = mysqli_fetch_assoc($result)){
			$unitArray=[];

			$unitArray['unit_name']= $row['unit'];
			$unitArray['unit_id']= $i;

			$i++;
	
			array_push($unitsArray, $unitArray);
		}
		//print_r($countriesArray);
		echo json_encode($unitsArray);
	

	}

}



?>
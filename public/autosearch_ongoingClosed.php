<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
include("includes\db_conn.php");

if(isset($_GET['charEntered'])){
	$searchChar=$_GET['charEntered'];
}


//$searchChar='';

//echo $searchChar;
//if the variable is not empty
if(isset($searchChar)){

		$sql="SELECT DISTINCT(`proj_status`) FROM project_details WHERE `proj_status` LIKE'%$searchChar%' ";

	if($result=mysqli_query($conn, $sql)){
		
		$ongoingClosedValuesArray=[]; //stores the ongoing/closed values
		$i=0;
		while($row = mysqli_fetch_assoc($result)){
			$ongoingClosedArray=[];

			$ongoingClosedArray['ongoingClosed_Value']= $row['proj_status'];
			$ongoingClosedArray['ongoingClosed_id']= $i;

			$i++;
			array_push($ongoingClosedValuesArray, $ongoingClosedArray);
		}
		//print_r($countriesArray);
		echo json_encode($ongoingClosedValuesArray);
	

	}

}



?>
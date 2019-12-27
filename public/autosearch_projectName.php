<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
include("includes\db_conn.php");

//$_GET['charEnteredProjectName']='';

if(isset($_GET['charEnteredProjectName'])){
	$projectNameParam=$_GET['charEnteredProjectName'];
}


if(isset($_GET['charEnteredCountry'])){
	$countryNameParam=$_GET['charEnteredCountry'];
}
else{
	$countryNameParam='';
}
if(isset($_GET['unitNameParam'])){
	$unitNameParam=$_GET['charEnteredUnit'];
}
else{
	$unitNameParam='';
}
if(isset($_GET['charEnteredOngoingClosed'])){
	$ongoingClosedParam=$_GET['charEnteredOngoingClosed'];
}
else{
	$ongoingClosedParam='';
}


if(isset($_GET['charEnteredDonor'])){
	$donorNameParam=$_GET['charEnteredDonor'];
}
else{
	$donorNameParam='';
}



//echo $searchChar;
//if the variable is not empty
if(isset($projectNameParam)){

		$sql="SELECT `project_title`, `proj_donors`.`p_id` AS p_id FROM proj_donors 
				INNER JOIN `donor_data` ON `donor_data`.`donor_id`= `proj_donors`.`donor_id` 
				INNER JOIN `project_locations` ON `proj_donors`.`p_id`=`project_locations`.`p_id` 
				INNER JOIN `locations_data` ON `locations_data`.`loc_id`=`project_locations`.`loc_id` 
				INNER JOIN `project_details` ON `project_details`.`p_id`= `project_locations`. `p_id` 
					WHERE `donor_name` LIKE'%$donorNameParam%'
						AND `loc_name` LIKE '%$countryNameParam%' 
						AND `unit` LIKE '%$unitNameParam%' 
						AND `proj_status` LIKE '%$ongoingClosedParam%' 
						AND `project_title` LIKE '%$projectNameParam%' 
							GROUP BY `project_title`";

	if($result=mysqli_query($conn, $sql)){
		
		$projectNamesArray=[]; //stores the ongoing/closed values
	
		while($row = mysqli_fetch_assoc($result)){
			$projectNameArray=[];

			$projectNameArray['project_name']= $row['project_title'];
			$projectNameArray['project_id']= $row['p_id'];

		
			array_push($projectNamesArray, $projectNameArray);
		}
		//print_r($countriesArray);
		echo json_encode($projectNamesArray);
	

	}
	else{
		echo mysql_error($conn);
	}

}

?>
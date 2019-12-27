<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
include("includes\db_conn.php");

if(isset($_GET['charEnteredDonor'])){
	$searchChar=$_GET['charEnteredDonor'];
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
if(isset($_GET['charEnteredProjectName'])){
	$projectNameParam=$_GET['charEnteredProjectName'];
}
else{
	$projectNameParam='';
}

//echo $searchChar;
//if the variable is not empty
if(isset($searchChar)){

		$sql="SELECT `donor_name` FROM proj_donors 
				INNER JOIN  `donor_data` ON `donor_data`.`donor_id`= `proj_donors`.`donor_id`
                INNER JOIN `project_locations` ON `proj_donors`.`p_id`=`project_locations`.`p_id`
                INNER JOIN `locations_data` ON `locations_data`.`loc_id`=`project_locations`.`loc_id`
                INNER JOIN `project_details` ON `project_details`.`p_id`= `project_locations`. `p_id`
				WHERE `donor_name` LIKE'%$searchChar%'AND `donor_name`!='default_donor'
					AND  `loc_name` LIKE '%$countryNameParam%'
					AND `unit` LIKE '%$unitNameParam%'
					AND `proj_status` LIKE '%$ongoingClosedParam%'
					AND `project_title` LIKE '%$projectNameParam%'
                GROUP BY `donor_name`";

	if($result=mysqli_query($conn, $sql)){
		
		$donorNamesArray=[]; //stores the ongoing/closed values
		$i=0;
		while($row = mysqli_fetch_assoc($result)){
			$donorNameArray=[];

			$donorNameArray['donor_name']= $row['donor_name'];
			$donorNameArray['donor_id']= $i;

			$i++;
			array_push($donorNamesArray, $donorNameArray);
		}
		//print_r($countriesArray);
		echo json_encode($donorNamesArray);
	

	}

}



?>
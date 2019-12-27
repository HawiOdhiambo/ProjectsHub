<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
include("..\includes\db_conn.php");

if(isset($_GET['countryName'])) {
	$country_name=$_GET['countryName'];
}
else{
	$country_name='';
}
if(isset($_GET['unitName'])){
	$unitName=$_GET['unitName'];
}
else{
	$unitName='';
}

if(isset($_GET['ongoingClosedValue'])){
	$ongoingClosedValue=$_GET['ongoingClosedValue'];
}
else{
	$ongoingClosedValue='';
}
if(isset($_GET['donorName'])) {
	$donorName=$_GET['donorName'];
}
else{
	$donorName='';
}

if(isset($_GET['projectTitle'])) {
	$projectTitle=mysqli_real_escape_string($conn, $_GET['projectTitle']);
}
else{
	$projectTitle='';
}



$sql="SELECT COUNT(DISTINCT project_details.p_id) AS unitCount, unit FROM project_locations 
			INNER JOIN project_details ON project_details.p_id=project_locations.p_id 
			INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id` 
 			INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
 			INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
				WHERE `loc_name`LIKE '%$country_name%'
					AND `unit` LIKE '%$unitName%'
							AND `proj_status` LIKE '%$ongoingClosedValue%'
							AND `donor_name` LIKE '%$donorName%'
							AND `project_title` LIKE '%$projectTitle%'
				GROUP BY unit";

$result=mysqli_query($conn, $sql);
if($result){
	$charts=[];
	while($row = mysqli_fetch_assoc($result)){
		$chart=[];
		$unitNameResult=$row["unit"];
		$chart["number"]=(int)$row["unitCount"];
		$chart["unitName"]=$unitNameResult;

				//get array of project titles.
		$sql_records="SELECT project_title,project_locations.p_id AS p_id FROM project_details 
							INNER JOIN project_locations ON project_details.p_id=project_locations.p_id 
							INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id` 
				 			INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
				 			INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
							WHERE unit='".$unitNameResult."'
								AND `loc_name`LIKE '%$country_name%'
								AND `proj_status` LIKE '%$ongoingClosedValue%'
								AND `donor_name` LIKE '%$donorName%'
								AND `project_title` LIKE '%$projectTitle%'
								GROUP BY project_locations.p_id 
							";
		
		$res_records=mysqli_query($conn, $sql_records);
		if($res_records){
			$chart['records']=[];
			while($row_records=mysqli_fetch_assoc($res_records)){
				array_push($chart['records'], $row_records);
			}
		}
		else{
			echo mysqli_error($conn);
		}

		array_push($charts, $chart);
	}
	echo json_encode($charts);
}
else{
	echo mysqli_error($conn);
}


?>
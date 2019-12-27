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

//$country_name="Uganda";
$pageData=[];

$sql_totalUnitNumber="SELECT COUNT(DISTINCT unit) AS totalUnitNumber FROM project_locations
				INNER JOIN project_details ON project_locations.p_id = project_details.p_id
				INNER JOIN locations_data ON project_locations.loc_id=locations_data.loc_id
				INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
	 			INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id`
				WHERE `loc_name` LIKE '%$country_name%'
					AND `unit` LIKE '%$unitName%'
					AND `proj_status` LIKE '%$ongoingClosedValue%'
					AND `donor_name` LIKE '%$donorName%'
					AND `project_title` LIKE '%$projectTitle%'
				";

$result_totalUnitNumber=mysqli_query($conn, $sql_totalUnitNumber);
if($result_totalUnitNumber){

	while($row_totalUnitNumber = mysqli_fetch_assoc($result_totalUnitNumber)){
		

		$pageData["totalUnitNumber"]=(int)$row_totalUnitNumber["totalUnitNumber"];
		
		}

	
	
	
}
else{
	echo mysqli_error($conn);
}

$sql_ongoingUnitNumber="SELECT COUNT(DISTINCT unit) AS ongoingUnitNumber FROM project_locations
			INNER JOIN project_details ON project_locations.p_id = project_details.p_id
			INNER JOIN locations_data ON project_locations.loc_id=locations_data.loc_id
			INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
	 		INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id`
			WHERE `loc_name`LIKE '%$country_name%'
					 AND proj_status ='ongoing'
					AND `unit` LIKE '%$unitName%'
					AND `proj_status` LIKE '%$ongoingClosedValue%'
					AND `donor_name` LIKE '%$donorName%'
					AND `project_title` LIKE '%$projectTitle%'
			";

$result_ongoingUnitNumber=mysqli_query($conn, $sql_ongoingUnitNumber);
if($result_ongoingUnitNumber){

	while($row_ongoingUnitNumber = mysqli_fetch_assoc($result_ongoingUnitNumber)){
		

		$pageData["ongoingUnitNumber"]=(int)$row_ongoingUnitNumber["ongoingUnitNumber"];
		
		}

	
	
	
}
else{
	echo mysqli_error($conn);
}

$sql_donorsEngaged="SELECT  COUNT(DISTINCT `proj_donors`.`donor_id`) AS donor_count FROM `proj_donors` 
							INNER JOIN `donor_data` ON `proj_donors`.`donor_id`=`donor_data`.`donor_id`
							INNER JOIN `project_details` ON `proj_donors`.`p_id`= `project_details`.`p_id`
							INNER JOIN `project_locations` ON  `project_locations`.`p_id`=`project_details`.`p_id`
							INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id`
								WHERE `loc_name`LIKE '%$country_name%'
								AND `unit` LIKE '%$unitName%'
									AND `proj_status` LIKE '%$ongoingClosedValue%'
									AND `donor_name` LIKE '%$donorName%'
									AND `project_title` LIKE '%$projectTitle%'
				        ";

$result_donorsEngaged=mysqli_query($conn, $sql_donorsEngaged);
if($result_donorsEngaged){
	
	while($row_donorsEngaged=mysqli_fetch_assoc($result_donorsEngaged)){

		$pageData["donorsEngaged"]=(int)$row_donorsEngaged["donor_count"];
	}
	
	
}
else{
	echo mysqli_error($conn);

}
//how many of the donors have unique project numbers
$sql_uniqueDonorProjNumber="SELECT   `proj_donors`.`donor_id` AS donorId, COUNT(DISTINCT `project_details`.`p_id`) AS projCount FROM `proj_donors` 
							INNER JOIN `donor_data` ON `proj_donors`.`donor_id`=`donor_data`.`donor_id`
							INNER JOIN `project_details` ON `proj_donors`.`p_id`= `project_details`.`p_id`
							INNER JOIN `project_locations` ON  `project_locations`.`p_id`=`project_details`.`p_id`
							INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id`
										WHERE `loc_name`LIKE '%$country_name%' 
											AND `unit` LIKE '%$unitName%'
											AND `proj_status` LIKE '%$ongoingClosedValue%'
											AND `donor_name` LIKE '%$donorName%'
											AND `project_title` LIKE '%$projectTitle%' 
					                    GROUP BY `proj_donors`.`donor_id`
										ORDER BY `proj_donors`.`donor_id` ASC";

$result_uniqueDonorProjNumber=mysqli_query($conn, $sql_uniqueDonorProjNumber);
if($result_uniqueDonorProjNumber){
	$donorProjNumbers=[];
	while ($row_uniqueDonorProjNumber=mysqli_fetch_assoc($result_uniqueDonorProjNumber)) {
		array_push($donorProjNumbers, $row_uniqueDonorProjNumber["projCount"]);
	}

	$pageData["donorProjNumbers"]=$donorProjNumbers;
	$pageData["uniqueProjNumbers"]=sizeOf(array_unique($donorProjNumbers));
}	
else{

}

$sql_ongoingProjs="SELECT COUNT(DISTINCT`project_details`.`p_id`) AS ongoingProjs  FROM `project_locations` 
						INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id`
						INNER JOIN `project_details` ON `project_locations`.`p_id`= `project_details`.`p_id` 
						INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
	 					INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id`
						 WHERE  proj_status= 'ongoing' AND `loc_name`LIKE '%$country_name%'
						 		AND `unit` LIKE '%$unitName%'
								AND `donor_name` LIKE '%$donorName%'
								AND `project_title` LIKE '%$projectTitle%'
								AND `proj_status` LIKE '%$ongoingClosedValue%'

						 ";

$result_ongoingProjs=mysqli_query($conn, $sql_ongoingProjs);
if($result_ongoingProjs){
	
	while($row_ongoingProjs=mysqli_fetch_assoc($result_ongoingProjs)) {
	
	$pageData["ongoingProjNumber"]=(int)$row_ongoingProjs["ongoingProjs"];

	}
}
else{
	echo mysqli_error($conn);

}

$sql_startYears="SELECT YEAR(start_date) AS startYear FROM project_details 
						INNER JOIN `project_locations` ON `project_locations`.`p_id`= `project_details`.`p_id` 
					    INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id`
					    INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
	 					INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id`
							WHERE proj_status='ongoing'
					        	AND loc_name LIKE '%$country_name%'
					        	AND `unit` LIKE '%$unitName%'
								AND `proj_status` LIKE '%$ongoingClosedValue%'
								AND `donor_name` LIKE '%$donorName%'
								AND `project_title` LIKE '%$projectTitle%'
								AND `proj_status` LIKE '%$ongoingClosedValue%'

							GROUP BY startYear ASC";

$result_startYears=mysqli_query($conn, $sql_startYears);
if($result_startYears){
	$startYearArray=[];
	while($row_startYears=mysqli_fetch_assoc($result_startYears)) {
	
	array_push($startYearArray, (int)$row_startYears["startYear"]);

	}
	$pageData['start_years']=$startYearArray;
	$pageData['startYearNumber']=sizeof($startYearArray);
}
else{
	echo mysqli_error($conn);

}

$sql_ungroups="SELECT COUNT(DISTINCT un_group) AS un_groupCount FROM project_locations
					INNER JOIN locations_data ON locations_data.loc_id = project_locations.loc_id
				    INNER JOIN project_details ON project_details.p_id =project_locations.p_id
				    INNER JOIN proj_donors ON project_details.p_id=proj_donors.p_id
				    INNER JOIN donor_data ON donor_data.donor_id=proj_donors.donor_id
				    	WHERE loc_name LIKE '%$country_name%'
				    		AND `unit` LIKE '%$unitName%'
				    		AND `proj_status` ='ongoing'
							AND `proj_status` LIKE '%$ongoingClosedValue%'
							AND `donor_name` LIKE '%$donorName%'
							AND `project_title` LIKE '%$projectTitle%'";

		$result_ungroup=mysqli_query($conn, $sql_ungroups);

		if($result_ungroup){
			while($row_ungroup=mysqli_fetch_assoc($result_ungroup)){

				$pageData["un_groupCount"]=$row_ungroup["un_groupCount"];

			}
		}
		else{
			echo mysqli_error($conn);
		}


echo json_encode($pageData);
?>
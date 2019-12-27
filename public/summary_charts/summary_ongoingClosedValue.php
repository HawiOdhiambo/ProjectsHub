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


//$ongoingClosedValue="ongoing";

$sql_countries_engaged="SELECT  COUNT(DISTINCT `loc_name`) AS LOC_COUNT FROM `project_locations` 
						INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id`
						INNER JOIN `project_details` ON `project_locations`.`p_id`= `project_details`.`p_id`
						INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
 						INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
							WHERE  loc_name LIKE '%$country_name%'
									AND `unit` LIKE '%$unitName%'
									AND `proj_status` LIKE '%$ongoingClosedValue%'
									AND `donor_name` LIKE '%$donorName%'
									AND `project_title` LIKE '%$projectTitle%' 
									AND loc_name!= 'default_loc_name'";

$sql_proj_engaged="SELECT COUNT(DISTINCT `project_locations`.`p_id`) AS projCount FROM `project_locations` 
						INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id` 
						INNER JOIN `project_details` ON `project_locations`.`p_id`= `project_details`.`p_id`
						INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
 						INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
							WHERE loc_name LIKE '%$country_name%'
							AND `unit` LIKE '%$unitName%'
							AND `proj_status` LIKE '%$ongoingClosedValue%'
							AND `donor_name` LIKE '%$donorName%'
							AND `project_title` LIKE '%$projectTitle%'
						";

$sql_un_group="SELECT  COUNT( DISTINCT un_group) AS un_groupCount FROM `project_locations`
				INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id`
			    INNER JOIN `project_details` ON `project_locations`.`p_id`= `project_details`.`p_id` 
			    INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
 				INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
			    	WHERE loc_name LIKE '%$country_name%'
							AND `unit` LIKE '%$unitName%'
							AND `proj_status` LIKE '%$ongoingClosedValue%' AND `proj_status`='ongoing'
							AND `donor_name` LIKE '%$donorName%'
							AND `project_title` LIKE '%$projectTitle%'
							  AND un_group!='none'";


$sql_donors_engaged="SELECT  COUNT(DISTINCT `proj_donors`.`donor_id`) AS donor_count FROM `proj_donors` 
						INNER JOIN `donor_data` ON `proj_donors`.`donor_id`=`donor_data`.`donor_id`
						INNER JOIN `project_details` ON `proj_donors`.`p_id`= `project_details`.`p_id`
						INNER JOIN `project_locations` ON `project_locations`.`p_id`= `project_details`.`p_id`
						INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id`

						WHERE  loc_name LIKE '%$country_name%'
							AND `unit` LIKE '%$unitName%'
							AND `proj_status` LIKE '%$ongoingClosedValue%'
							AND `donor_name` LIKE '%$donorName%'
							AND `project_title` LIKE '%$projectTitle%'
							AND donor_name !='default_donor'
							
							";

$sql_units_engaged="SELECT  COUNT(DISTINCT unit) AS unitCount FROM `project_locations` 
						INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id`
						INNER JOIN `project_details` ON `project_locations`.`p_id`= `project_details`.`p_id`
					    INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
			 			INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
						WHERE loc_name LIKE '%$country_name%'
							AND `unit` LIKE '%$unitName%'
							AND `proj_status` LIKE '%$ongoingClosedValue%'
							AND `donor_name` LIKE '%$donorName%'
							AND `project_title` LIKE '%$projectTitle%'
							
						";
						

$summaryArray=[];

//countries engaged

$result_countries_engaged=mysqli_query($conn,$sql_countries_engaged);
if($result_countries_engaged){
	
	while($row_countries_engaged = mysqli_fetch_assoc($result_countries_engaged)){


		$countries_engaged=[];
		
		$countries_engaged["number"]=$row_countries_engaged['LOC_COUNT'];
		$countries_engaged["description"]="countries engaged since 2014";
		//$summaryArray["Countries_engaged_from_2014"]=$row_countries_engaged['LOC_COUNT'];
		array_push($summaryArray, $countries_engaged);
		

	}
}
else{
	echo mysqli_error($conn);
}

//country that have a un_group
	$result_un_group=mysqli_query($conn, $sql_un_group);

	if($result_un_group){

		while($row_un_group = mysqli_fetch_assoc($result_un_group)){
			$countries_un_group=[];
			
			$countries_un_group["number"]=$row_un_group['un_groupCount'];
			$countries_un_group["description"]="un regional groups currently engaged";
			//$summaryArray["Countries_currently_present"]=$row_loc_active['loc_count_active'];
			array_push($summaryArray, $countries_un_group);
			
		}

	}
	else{
		echo mysqli_error($conn);
	}

//projects involved in

	$result_proj_engaged=mysqli_query($conn, $sql_proj_engaged);

		if($result_proj_engaged){

			while($row_proj_engaged = mysqli_fetch_assoc($result_proj_engaged)){

				$projects_involved=[];
				
				$projects_involved["number"]=$row_proj_engaged['projCount'];
				$projects_involved["description"]=" projects involved since 2014";
				//$summaryArray["Projects_involved"]=$row_proj_engaged['projCount'];
				array_push($summaryArray, $projects_involved);
				

			}

		}
		else{
			echo mysqli_error($conn);
		}



//donors engaged since 2014
	$result_donors_engaged=mysqli_query($conn, $sql_donors_engaged);

		if($result_donors_engaged){

		while($row_donors_engaged = mysqli_fetch_assoc($result_donors_engaged)){

			$donors_engaged=[];
			
			$donors_engaged["number"]=$row_donors_engaged['donor_count'];
			$donors_engaged["description"]="donors engaged since 2014";			
			//$summaryArray["Donors_engaged"]=$row_donors_engaged['donor_count'];
			array_push($summaryArray, $donors_engaged);


		}

	}
	else{
		echo mysqli_error($conn);
	}

	//var_dump($summaryArray);

	//units engaged

	$result_units_engaged=mysqli_query($conn, $sql_units_engaged);

		if($result_units_engaged){

			while($row_units_engaged = mysqli_fetch_assoc($result_units_engaged)){

				$projects_involved=[];
				
				$projects_involved["number"]=$row_units_engaged['unitCount'];
				$projects_involved["description"]="units engaged since 2014";
				//$summaryArray["Projects_involved"]=$row_proj_engaged['projCount'];
				array_push($summaryArray, $projects_involved);
				

			}

		}
		else{
			echo mysqli_error($conn);
		}

	echo json_encode($summaryArray);

?>
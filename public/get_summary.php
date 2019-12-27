<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
include("includes\db_conn.php");

$sql_countries_engaged="SELECT  COUNT(DISTINCT `loc_name`) AS LOC_COUNT FROM `project_locations` 
		INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id`
		INNER JOIN `project_details` ON `project_locations`.`p_id`= `project_details`.`p_id`";

$sql_proj_engaged="SELECT COUNT(DISTINCT `project_locations`.`p_id`) AS projCount FROM `project_locations` 
						INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id` 
						INNER JOIN `project_details` ON `project_locations`.`p_id`= `project_details`.`p_id`";

$sql_loc_active="SELECT  COUNT(DISTINCT loc_name) AS loc_count_active  FROM `project_locations` INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id` INNER JOIN `project_details` ON `project_locations`.`p_id`= `project_details`.`p_id` WHERE  proj_status= 'ongoing'  AND `lat` IS NOT NULL AND `lng` IS NOT NULL";

$sql_proj_active="SELECT COUNT(DISTINCT`project_details`.`p_id`) AS proj_count_active  FROM `project_locations` INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id` INNER JOIN `project_details` ON `project_locations`.`p_id`= `project_details`.`p_id` WHERE  proj_status= 'ongoing'";
$sql_donors_engaged="SELECT  COUNT(DISTINCT `proj_donors`.`donor_id`) AS donor_count FROM `proj_donors` 
							INNER JOIN `donor_data` ON `proj_donors`.`donor_id`=`donor_data`.`donor_id`
							INNER JOIN `project_details` ON `proj_donors`.`p_id`= `project_details`.`p_id`";


$summaryArray=[];

//countries engaged

$result_countries_engaged=mysqli_query($conn,$sql_countries_engaged);
if($result_countries_engaged){
	
	while($row_countries_engaged = mysqli_fetch_assoc($result_countries_engaged)){
		//echo "<div class='summaryInformation '><span>".$row['LOC_COUNT']."</span> <br> Countries<br>engaged  <br>(2014- )</div>";

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

//country that have a projeect currently
	$result_loc_active=mysqli_query($conn, $sql_loc_active);

	if($result_loc_active){

		while($row_loc_active = mysqli_fetch_assoc($result_loc_active)){
			$countries_active=[];
			
			$countries_active["number"]=$row_loc_active['loc_count_active'];
			$countries_active["description"]="countries currently present";
			//$summaryArray["Countries_currently_present"]=$row_loc_active['loc_count_active'];
			array_push($summaryArray, $countries_active);
			
		}

	}
	else{
		echo mysqli_error($conn);
	}

//projects involved in

	$result_proj_engaged=mysqli_query($conn, $sql_proj_engaged);

		if($result_loc_active){

			while($row_proj_engaged = mysqli_fetch_assoc($result_proj_engaged)){

				$projects_involved=[];
				
				$projects_involved["number"]=$row_proj_engaged['projCount'];
				$projects_involved["description"]="involved in since 2014";
				//$summaryArray["Projects_involved"]=$row_proj_engaged['projCount'];
				array_push($summaryArray, $projects_involved);
				

			}

		}
		else{
			echo mysqli_error($conn);
		}


//projects currently ongoing
	$result_proj_active=mysqli_query($conn, $sql_proj_active);

		if($result_proj_active){

		while($row_proj_active = mysqli_fetch_assoc($result_proj_active)){

		
			$ongoing_projects=[];
			
			$ongoing_projects["number"]=$row_proj_active['proj_count_active'];
			$ongoing_projects["description"]="ongoing projects";
			//$summaryArray["Ongoing_projects"]=$row_proj_active['proj_count_active'];
			array_push($summaryArray, $ongoing_projects);
			

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
	echo json_encode($summaryArray);



?>
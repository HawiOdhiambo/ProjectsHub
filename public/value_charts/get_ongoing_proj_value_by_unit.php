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
//get all the units
$sql_unit="SELECT unit FROM `project_details` 
           	INNER JOIN project_locations ON project_details.p_id= project_locations.p_id
            INNER JOIN locations_data ON project_locations.loc_id=locations_data.loc_id
            INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
 			INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
	            WHERE proj_status='ongoing' 
			            AND loc_name LIKE '%$country_name%'
			            AND `unit` LIKE '%$unitName%'
						AND `donor_name` LIKE '%$donorName%'
						AND `project_title` LIKE '%$projectTitle%'
			      		GROUP BY unit
			            ORDER BY `project_details`.`unit` ASC";

			$result_unit=mysqli_query($conn, $sql_unit);
if($result_unit){

	$id=0;
	$charts=[]; //carries the results of all the arrays
	while($row_unit=mysqli_fetch_assoc($result_unit)){

				$chart=[];
				$chart["id"]=$id;
				$unitNameResult=$row_unit["unit"];

				$chart["unitName"]= $unitNameResult;
				$chart["contributionGroup"]=[];

				$sql_contributionGroups="SELECT contribution, SUM(DISTINCT DATEDIFF(end_date, start_date)) AS total_duration_in_days, COUNT( DISTINCT project_locations.p_id) AS projCount 
							FROM `project_details` 
					           	INNER JOIN project_locations ON project_details.p_id= project_locations.p_id
					            INNER JOIN locations_data ON project_locations.loc_id=locations_data.loc_id
					  			INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
 								INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
					            WHERE proj_status='ongoing' 
					            
					            AND loc_name LIKE '%$country_name%'
					            AND unit ='".$unitNameResult."'
					            
								AND `donor_name` LIKE '%$donorName%'
								AND `project_title` LIKE '%$projectTitle%'

					            GROUP BY contribution 
					            ORDER BY contribution ASC";

					$result_contributionGroups=mysqli_query($conn, $sql_contributionGroups);
					if($result_contributionGroups){	


						$contributionGroup=[];
						while($row_contributionGroups = mysqli_fetch_assoc($result_contributionGroups)){
						
							
							
							$contribution=(int)$row_contributionGroups["contribution"];
							$contributionGroup["contribution"]=$contribution;
							
							$contributionGroup["total_duration_in_days"]=(int)$row_contributionGroups["total_duration_in_days"];
							$contributionGroup["projCount"]=(int)$row_contributionGroups["projCount"];


							
							$sql_records="SELECT `project_title`, DATEDIFF(end_date, start_date) AS duration_in_days, project_locations.p_id FROM project_details 
												
												INNER JOIN project_locations ON project_details.p_id= project_locations.p_id
										        INNER JOIN locations_data ON project_locations.loc_id=locations_data.loc_id
										        INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
 												INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
										  			WHERE proj_status='ongoing' 
													AND contribution = ".$contribution."
										            AND loc_name LIKE '%$country_name%'
										           AND unit ='".$unitNameResult."'
													AND `donor_name` LIKE '%$donorName%'
													AND `project_title` LIKE '%$projectTitle%'
										            GROUP BY project_locations.p_id
												";

										$res_records=mysqli_query($conn, $sql_records);
									

										if($res_records){

											$contributionGroup['records']=[]; //store the project information related to a contribution group
											while($row_records=mysqli_fetch_assoc($res_records)){
												array_push($contributionGroup['records'], $row_records);
											}
										}
										else{
											echo mysqli_error($conn);
										}
							array_push($chart["contributionGroup"], $contributionGroup);
							
						
						}
						
					}
					else{
						echo mysqli_error($conn);
					}
		$id++;
		array_push($charts, $chart);
	}

	
	echo json_encode($charts);

}
else{
	echo mysqli_error($conn);
}



?>
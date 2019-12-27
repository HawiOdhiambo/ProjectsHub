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



		$totalProjSql="SELECT COUNT(DISTINCT project_details.p_id) AS totalProj, unit FROM project_details 
						INNER JOIN project_locations ON project_locations.p_id =project_details.p_id
						INNER JOIN locations_data ON locations_data.loc_id=project_locations.loc_id
						INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
 						INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
						WHERE loc_name LIKE '%$country_name%'
							AND `unit` LIKE '%$unitName%'
							AND `proj_status` LIKE '%$ongoingClosedValue%'
							AND `donor_name` LIKE '%$donorName%'
							AND `project_title` LIKE '%$projectTitle%'
						GROUP BY unit";


			$totalProj_result=mysqli_query($conn, $totalProjSql);
			


			if($totalProj_result){

				$charts=[];
				$i=0;
				while($row = mysqli_fetch_assoc($totalProj_result)){
					$chart=[];
					$chart["id"]=$i;
					$unitNameResult=$row["unit"];
					$chart["totalProjs"]=(int)$row["totalProj"];
					$chart["unitName"]=$unitNameResult;
					$ongoingProjSql="SELECT COUNT(DISTINCT project_details.p_id) AS ongoingProj, unit FROM project_details 
										INNER JOIN project_locations ON project_locations.p_id =project_details.p_id
										INNER JOIN locations_data ON locations_data.loc_id=project_locations.loc_id
										INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
 										INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id`
										WHERE loc_name LIKE '%$country_name%' 
												AND proj_status='ongoing' 
												AND unit LIKE'%$unitNameResult%'
												AND `donor_name` LIKE '%$donorName%'
												AND `project_title` LIKE '%$projectTitle%'
										GROUP BY unit";
					
					if($ongoingProj_result=mysqli_query($conn, $ongoingProjSql)){
						while($ongoing_row=mysqli_fetch_assoc($ongoingProj_result)){
							$chart["ongoingProjs"]=$ongoing_row["ongoingProj"];

						}
					}
					
					array_push($charts, $chart);
					$i++;
				}
				echo json_encode($charts);
			}
			else{
				echo mysqli_error($conn);
			}





?>
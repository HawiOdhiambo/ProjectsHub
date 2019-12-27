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

$sql="SELECT unit, COUNT(DISTINCT project_details.p_id) AS projCount  FROM `project_details` 
		INNER JOIN project_locations ON project_locations.p_id=project_details.p_id
	    INNER JOIN locations_data ON locations_data.loc_id=project_locations.loc_id
	    INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
	 	INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
				WHERE proj_status='ongoing' 
				AND loc_name LIKE '%$country_name%'
				AND `unit` LIKE '%$unitName%'
				AND `donor_name` LIKE '%$donorName%'
				AND `project_title` LIKE '%$projectTitle%'
			 GROUP BY unit 
			 ORDER BY unit ASC";

$result=mysqli_query($conn, $sql);
if($result){	

	$id=0;
	$charts=[];
	while($row = mysqli_fetch_assoc($result)){
	
		$chart=[];
		$chart["id"]=$id;
		$unitNameResult=$row["unit"];
		$chart["projCount"]=(int)$row["projCount"];
		$chart["unitName"]=$unitNameResult;

		$sql_contribution="SELECT project_title,  contribution  FROM `project_details` 
							INNER JOIN project_locations ON project_locations.p_id=project_details.p_id
						    INNER JOIN locations_data ON locations_data.loc_id=project_locations.loc_id
						    INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
 							INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
									WHERE proj_status='ongoing'
											AND loc_name LIKE '%$country_name%'
							            	AND unit LIKE '%$unitNameResult%'
							            	AND `donor_name` LIKE '%$donorName%'
											AND `project_title` LIKE '%$projectTitle%'
							                GROUP BY project_details.p_id";

				$result_contribution=mysqli_query($conn, $sql_contribution);
				if($result_contribution){
					$totalContribution=0;
					while($row_contribution= mysqli_fetch_assoc($result_contribution)){
						$totalContribution+=$row_contribution["contribution"];
					}

					$chart["totalContribution"]=(int)$totalContribution;
				}
				else{
					echo mysqli_error($conn);
				}
			
		array_push($charts, $chart);

		$id++;
	}
	echo json_encode($charts);
}
else{
	echo mysqli_error($conn);
}


?>
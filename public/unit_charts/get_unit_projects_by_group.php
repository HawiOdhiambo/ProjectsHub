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







$sql="SELECT un_group, COUNT( DISTINCT project_locations.p_id) AS projectNumber FROM `locations_data`  
				INNER JOIN project_locations ON  project_locations.loc_id=locations_data.loc_id
				INNER JOIN project_details ON project_details.p_id=project_locations.p_id
				INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
				INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
		 			WHERE proj_status='ongoing' AND NOT un_group='none'
		 				 AND loc_name LIKE '%$country_name%'
						 AND unit LIKE '%$unitName%'
						 AND `donor_name` LIKE '%$donorName%'
						 AND `project_title` LIKE '%$projectTitle%'
					GROUP BY un_group
					ORDER BY `locations_data`.`un_group` ASC ";

$result=mysqli_query($conn, $sql);

if($result){
	$charts=[];
	$i=0; //counter

	while($row = mysqli_fetch_assoc($result)){

		$chart=[];
	

		$chart["id"]=$i;
		$chart["projectNumber"]=(int)$row["projectNumber"];
		$un_group=$row["un_group"];
		$chart["un_group"]=$un_group;
		
		
		$sql_unit="SELECT DISTINCT unit FROM `project_details` 
					INNER JOIN project_locations ON project_details.p_id=project_locations.p_id
		 			INNER JOIN locations_data ON locations_data.loc_id=project_locations.loc_id 
		 			INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
					INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
		 					WHERE un_group='".$un_group."'
		 						 AND  proj_status='ongoing'
		 						 AND loc_name LIKE '%$country_name%'
							     AND unit LIKE '%$unitName%'
							     AND `donor_name` LIKE '%$donorName%'
								 AND `project_title` LIKE '%$projectTitle%'

		 			 		ORDER BY unit ASC";
						
						$result_unit=mysqli_query($conn, $sql_unit);

					

						if($result_unit){
							$unit_str='';
							
							while($row_unit=mysqli_fetch_assoc($result_unit)) {

								$unit_str.=$row_unit['unit'];
								
							}

							$chart['unitString']=$unit_str;
						}
						else{
							echo mysqli_error($conn);
						}

				//get array of project titles.
		$sql_records="SELECT project_title, project_details.p_id AS p_id, unit FROM project_details 
						INNER JOIN project_locations ON project_details.p_id=project_locations.p_id
		 				INNER JOIN locations_data ON locations_data.loc_id=project_locations.loc_id 
		 				INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
						INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
							WHERE un_group='".$un_group."' AND  proj_status='ongoing'
								AND loc_name LIKE '%$country_name%'
							    AND unit LIKE '%$unitName%'
							    AND `donor_name` LIKE '%$donorName%'
								AND `project_title` LIKE '%$projectTitle%'
							GROUP BY  project_details.p_id
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

		$sql_contribution="SELECT project_title,  contribution  FROM `project_details` 
								INNER JOIN project_locations ON project_locations.p_id=project_details.p_id
				    			INNER JOIN locations_data ON locations_data.loc_id=project_locations.loc_id
				    			INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
								INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
						 			WHERE un_group='".$un_group."' AND  proj_status='ongoing'
											AND loc_name LIKE '%$country_name%'
							            	AND unit LIKE '%$unitName%'
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
		$i++;


		
	}
echo json_encode($charts);
}
else{
	echo mysqli_error($conn);
}


?>
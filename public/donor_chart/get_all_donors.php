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

//$countryName='Kenya';
$sql="SELECT  COUNT( DISTINCT project_details.p_id) as projCount, donor_name, proj_donors.donor_id AS d_id  FROM proj_donors
			INNER JOIN donor_data ON donor_data.donor_id=proj_donors.donor_id
            INNER JOIN project_details ON proj_donors.p_id=project_details.p_id
           	INNER JOIN project_locations ON project_details.p_id= project_locations.p_id
            INNER JOIN locations_data ON project_locations.loc_id=locations_data.loc_id
		    WHERE donor_name!='default_donor'
            		AND loc_name LIKE '%$country_name%'
            		 	AND `unit` LIKE '%$unitName%'
						AND `donor_name` LIKE '%$donorName%'
						AND `project_title` LIKE '%$projectTitle%'
						AND `proj_status` LIKE '%$ongoingClosedValue%'
				GROUP BY proj_donors.donor_id 
                ORDER BY projCount DESC";

$result=mysqli_query($conn, $sql);

if($result){
	$charts=[];

	while($row = mysqli_fetch_assoc($result)){

		$chart=[];
		$id=$row["d_id"];

		$chart["id"]=$id;
		$chart["number"]=(int)$row["projCount"];
		$chart["donorName"]=$row["donor_name"];

		$sql_unit="SELECT DISTINCT unit FROM proj_donors 
						INNER JOIN donor_data ON proj_donors.donor_id=donor_data.donor_id
						INNER JOIN project_details ON project_details.p_id= proj_donors.p_id  
                        INNER JOIN project_locations ON project_locations.p_id=project_details.p_id
                        INNER JOIN locations_data ON project_locations.loc_id=locations_data.loc_id
						WHERE donor_data.donor_id =".$id."
                        		AND loc_name LIKE '%$country_name%'
                        		 	AND `unit` LIKE '%$unitName%'
									AND `donor_name` LIKE '%$donorName%'
									AND `project_title` LIKE '%$projectTitle%'
									AND `proj_status` LIKE '%$ongoingClosedValue%'
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
		$sql_records="SELECT project_title, unit, DATEDIFF(end_date, start_date) AS duration_in_days, contribution, project_details.p_id FROM project_details 
							INNER JOIN proj_donors ON proj_donors.p_id=project_details.p_id
							INNER JOIN donor_data ON proj_donors.donor_id=donor_data.donor_id
							INNER JOIN project_locations ON project_locations.p_id=project_details.p_id
							INNER JOIN locations_data ON locations_data.loc_id=project_locations.loc_id
							WHERE donor_data.donor_id =".$id."
                        		AND loc_name LIKE '%$country_name%'
                        		AND `unit` LIKE '%$unitName%'
								AND `donor_name` LIKE '%$donorName%'
								AND `project_title` LIKE '%$projectTitle%'
								AND `proj_status` LIKE '%$ongoingClosedValue%'
                        		GROUP BY project_details.p_id";
		
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
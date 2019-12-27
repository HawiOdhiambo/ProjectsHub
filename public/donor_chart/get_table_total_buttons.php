	
<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
include("..\includes\db_conn.php");

if(isset($_GET['tableLength'])){
	$tableLength=$_GET['tableLength'];
}
else{
	$tableLength=6;
}


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

		$sql="SELECT COUNT(DISTINCT donor_name) as donorCount FROM proj_donors
            INNER JOIN donor_data ON donor_data.donor_id=proj_donors.donor_id
            INNER JOIN project_details ON project_details.p_id=proj_donors.p_id
            INNER JOIN project_locations ON project_locations.p_id=project_details.p_id
            INNER JOIN locations_data ON  locations_data.loc_id=project_locations.loc_id
		    WHERE donor_name!='default_donor'
            	AND loc_name LIKE '%$country_name%'
            		AND `unit` LIKE '%$unitName%'
					AND `donor_name` LIKE '%$donorName%'
					AND `project_title` LIKE '%$projectTitle%'
					AND `proj_status` LIKE '%$ongoingClosedValue%'
					";


		$result=mysqli_query($conn, $sql);
			
			if($result){
				
			
				while($row = mysqli_fetch_assoc($result)){

						echo $row['donorCount']/$tableLength;

						
					}
				
			}
			else{
					echo mysqli_error($conn);
				}
?>

<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
include("includes\db_conn.php");


if(isset($_GET['countryName'])){
	$countryName=$_GET['countryName'];
}
else{
	$countryName='';
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
	$projectTitle=$_GET['projectTitle'];
}
else{
	$projectTitle='';
}
//$countryName="Uganda";




		$sql="SELECT COUNT(DISTINCT`project_details`.`p_id`) AS projectsNumber FROM `project_locations` 
				INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id` 
				INNER JOIN `project_details` ON `project_locations`.`p_id`= `project_details`.`p_id` 
				INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
	    		INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 

					WHERE `loc_name` LIKE '%$countryName%'
							AND `unit` LIKE '%$unitName%'
							AND `proj_status` LIKE '%$ongoingClosedValue%'
							AND `donor_name` LIKE '%$donorName%'
							AND `project_title` LIKE '%$projectTitle%'
							ORDER BY `project_title` ASC";


		$result=mysqli_query($conn, $sql);
			
			if($result){
				
			
				while($row = mysqli_fetch_assoc($result)){

						echo $row['projectsNumber'];

						
					}
				
			}
			else{
					echo mysqli_error($conn);
				}

		


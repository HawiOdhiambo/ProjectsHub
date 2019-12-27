
<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
include("..\includes\db_conn.php");


$no_of_records_per_page=4;

if (isset($_GET['pageNo'])) {
            $pageNo = $_GET['pageNo'];       
    } 
  else {
        $pageNo = 1;
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


 	 $offset = ($pageNo-1) * $no_of_records_per_page;




		$sql="SELECT COUNT(DISTINCT proj_donors.p_id) as projCount, donor_name, proj_donors.donor_id AS d_id  FROM proj_donors
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
					GROUP BY proj_donors.donor_id ORDER BY projCount DESC
					LIMIT $offset, $no_of_records_per_page";

			$result=mysqli_query($conn, $sql);
			if($result){
				$charts=[];
				while($row = mysqli_fetch_assoc($result)){
					$chart=[];
					$chart["id"]=$row["d_id"];
					$chart["number"]=(int)$row["projCount"];
					$chart["donorName"]=$row["donor_name"];
					array_push($charts, $chart);
				}
				echo json_encode($charts);
			}
			else{
				echo mysqli_error($conn);
			}





?>
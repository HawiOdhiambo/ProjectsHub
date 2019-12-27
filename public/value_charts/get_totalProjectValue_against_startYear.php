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


$sql="SELECT YEAR(start_date) AS startYear, SUM(contribution) AS totalContribution, COUNT(DISTINCT `project_details`.`p_id`)AS projNumber  FROM project_details 
		INNER JOIN `project_locations` ON `project_locations`.`p_id`= `project_details`.`p_id` 
		INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id`
		INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
	 	INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
		WHERE proj_status='ongoing'
        	AND loc_name LIKE '%$country_name%'
        	AND `unit` LIKE '%$unitName%'
			AND `donor_name` LIKE '%$donorName%'
			AND `project_title` LIKE '%$projectTitle%'
		GROUP BY startYear ASC";

$result=mysqli_query($conn, $sql);
if($result){	

	$id=0;
	$charts=[];
	while($row = mysqli_fetch_assoc($result)){
	
		$chart=[];
		$chart["id"]=$id;
		$startYear=(int)$row["startYear"];
		$chart["startYear"]=$startYear;
		
		$chart["projNumber"]=(int)$row["projNumber"];

		//get array of project titles.
		$sql_records="SELECT project_title, unit, DATEDIFF(end_date, start_date) AS duration_in_days, contribution, `project_details`.`p_id` FROM project_details
							INNER JOIN `project_locations` ON `project_locations`.`p_id`= `project_details`.`p_id` 
							INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id`
							INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
	 						INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
												WHERE YEAR(start_date)=".$startYear." 
														AND proj_status='ongoing'
					                                    AND loc_name LIKE '%$country_name%'
					                                    AND `unit` LIKE '%$unitName%'
														AND `donor_name` LIKE '%$donorName%'
														AND `project_title` LIKE '%$projectTitle%'
					                             GROUP BY `project_details`.`p_id`";
		
		$res_records=mysqli_query($conn, $sql_records);
		if($res_records){
			$chart['records']=[];
			$totalContribution=0;
			while($row_records=mysqli_fetch_assoc($res_records)){
				array_push($chart['records'], $row_records);
				$totalContribution+=$row_records['contribution'];
			}
			$chart["totalContribution"]=(int)$totalContribution;
		}
		else{
			echo mysqli_error($conn);
		}

		$sql_unit="SELECT DISTINCT unit  FROM project_details 
						INNER JOIN `project_locations` ON `project_locations`.`p_id`= `project_details`.`p_id` 
						INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id`
						INNER JOIN `proj_donors`ON `project_details`.`p_id` =`proj_donors`.`p_id`
	 					INNER JOIN `donor_data`ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
												WHERE proj_status='ongoing' 
					                            	AND YEAR(start_date)=".$startYear."
					                                AND loc_name LIKE '%$country_name%'
					                                AND `unit` LIKE '%$unitName%'
													AND `donor_name` LIKE '%$donorName%'
													AND `project_title` LIKE '%$projectTitle%'

												ORDER BY unit ASC";

		$res_unit=mysqli_query($conn, $sql_unit);
		if($res_unit){
			$unit_str="";
			while($row_unit=mysqli_fetch_assoc($res_unit)){
				$unit_str.=$row_unit['unit'];
			}
			$chart['unitString']=$unit_str;
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
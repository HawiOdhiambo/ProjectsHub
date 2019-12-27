<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
include("includes\db_conn.php");

$sql="SELECT COUNT(DISTINCT project_details.p_id) AS unitCount, unit FROM project_locations 
			INNER JOIN project_details ON project_details.p_id=project_locations.p_id GROUP BY unit";

$result=mysqli_query($conn, $sql);
if($result){
	$charts=[];
	while($row = mysqli_fetch_assoc($result)){
		$chart=[];
		$unitName=$row["unit"];
		$chart["number"]=(int)$row["unitCount"];
		$chart["unitName"]=$unitName;

				//get array of project titles.
		$sql_records="SELECT project_title, p_id FROM project_details 
							WHERE unit='".$unitName."' 
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

		array_push($charts, $chart);
	}
	echo json_encode($charts);
}
else{
	echo mysqli_error($conn);
}


?>
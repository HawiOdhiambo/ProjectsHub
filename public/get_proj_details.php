<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
include("includes\db_conn.php");

if(isset($_GET['project_title'])){
	$project_title_search=$_GET['project_title'];
	
}
else{
	$project_title_search="";
}

if(isset($_GET['loc_name'])){
	$loc_name=$_GET['loc_name'];
}
else{
	$loc_name="";
}

if(isset($_GET['p_id'])){
	$p_id=$_GET['p_id'];
}
else{
	$p_id="";
}





$projectDetailsArray=[];



$project_title_search=mysqli_real_escape_string($conn, $project_title_search);



$sql="SELECT `unit`,`themes`, `contribution`, `proj_status`,`start_date`, `end_date`, `project_title`
		FROM `project_details`
		
		INNER JOIN `project_locations` ON `project_locations`.`p_id`= `project_details`.`p_id`  
		INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id`

		 WHERE `project_details`.`project_title`LIKE '%$project_title_search%'
		 		AND `loc_name` LIKE '%$loc_name%' 
		 		AND `project_details`.`p_id` LIKE '%$p_id%' 
		 		LIMIT 0,1";

$sql_loc="SELECT `loc_name` FROM `project_locations`

			INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id`
			INNER JOIN `project_details` ON `project_locations`.`p_id`= `project_details`.`p_id`  
				WHERE `project_details`.`project_title`LIKE '%$project_title_search%'
					
					  
				 ";

$sql_donor="SELECT `donor_name` FROM `proj_donors` 

				INNER JOIN `donor_data` ON `proj_donors`.`donor_id`=`donor_data`.`donor_id` 
				INNER JOIN `project_details` ON `proj_donors`.`p_id`= `project_details`.`p_id` 
			

					WHERE `project_details`.`project_title` LIKE '%$project_title_search%' 
						
						
							";

$result=mysqli_query($conn, $sql);

if($result){
	$projectDetailsArray['project_details']=[];
	while($row = mysqli_fetch_assoc($result)){

		$projectDetailsArray['project_title']=$row['project_title'];


		$projectDetailsArray['project_details']['thematic_focus']=$row['themes'];

		
		

		if($row['contribution']!= 0){
			
			$projectDetailsArray['project_details']['contribution']=$row['contribution'];
		}
		

		if($row['unit']=='RMPU'){
			
			$projectDetailsArray['project_details']['unit']=$row['unit'];

		}
		if($row['unit']=='CPEDU'){
			
			$projectDetailsArray['project_details']['unit']=$row['unit'];

		}
		if($row['unit']=='CCPU'){
			
			$projectDetailsArray['project_details']['unit']=$row['unit'];

		}

	

	
		//change the format of the date
		$start_date=date_create($row['start_date']);
		$end_date=date_create($row['end_date']);

		$projectDetailsArray['project_details']['start_date']=date_format($start_date,'d M Y'); 
		$projectDetailsArray['project_details']['end_date']=date_format($end_date,'d M Y');

	
		$projectDetailsArray['project_details']['proj_status']=$row['proj_status'];

		


		

	}

	//var_dump($projectDetailsArray['project_details']);
	
}
else{
	echo mysqli_error($conn);
}
		
	if($result_loc=mysqli_query($conn, $sql_loc)){

		//$projectDetailsArray['project_details']['countries']=[];
		$locArray=[];
		while($row_loc = mysqli_fetch_assoc($result_loc)){


		
			//array_push($projectDetailsArray['project_details']['countries'], $row_loc['loc_name']);

			if($row_loc['loc_name']!='default_loc_name'){

					array_push($locArray, $row_loc['loc_name']);
				}



		}
		if(sizeof($locArray)!==0){
			$projectDetailsArray['project_details']['countries']= $locArray;
			
		}


	}
	else{
		echo mysqli_error($conn);
	}

	

	if($result_donor=mysqli_query($conn, $sql_donor)){
		
		$donorsArray=[];

		while($row_donor = mysqli_fetch_assoc($result_donor)){
			

				

				if($row_donor['donor_name']!='default_donor'){

					array_push($donorsArray, $row_donor['donor_name']);
				}

			

		}

		

		if(sizeof($donorsArray)!==0){
			$projectDetailsArray['project_details']['donors']=$donorsArray;
			
		}


	}
	else{
		echo mysqli_error($conn);
	}
echo json_encode($projectDetailsArray);
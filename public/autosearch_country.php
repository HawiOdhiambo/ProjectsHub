<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
include("includes\db_conn.php");


$searchChar=$_GET['charEntered'];

//$searchChar='';

//echo $searchChar;
//if the variable is not empty
if(isset($searchChar)){

		$sql="SELECT loc_name, loc_id FROM locations_data
				WHERE loc_name LIKE'%$searchChar%' 
					 AND loc_name !='global' 
					 AND  `loc_name` != 'default_loc_name' ";

	if($result=mysqli_query($conn, $sql)){
		
		$countriesArray=[];
		while($row = mysqli_fetch_assoc($result)){
			$countryArray=[];

			$countryArray['loc_name']= $row['loc_name'];
			$countryArray['loc_id']= $row['loc_id'];
	
			array_push($countriesArray, $countryArray);
		}
		//print_r($countriesArray);
		echo json_encode($countriesArray);
	

	}

}



?>
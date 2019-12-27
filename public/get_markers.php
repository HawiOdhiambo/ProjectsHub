<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
include("includes\db_conn.php");


if(isset($_GET['countryName'])) {
	$country_name=$_GET['countryName'];
}
else{
	$country_name='';
}





//Only selected only the locations with the right units and coordinates
$sql="SELECT `lat`, `lng`, `loc_name`, COUNT(`loc_name`)FROM `project_locations` 
	INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id` 
	INNER JOIN `project_details` ON `project_locations`.`p_id`= `project_details`.`p_id` 
	WHERE `lat` IS NOT NULL AND `lng` IS NOT NULL 
		AND `loc_name` LIKE '%$country_name%'
		AND `end_date`>'2013-12-31'
		GROUP BY `loc_name` 
		ORDER BY `locations_data`.`loc_name` ASC";


$geojson='{"type": "FeatureCollection",
			"features": ';

if($result=mysqli_query($conn, $sql)){

		$featureCollection=[]; //store the features

			// Iterate through the rows, adding XML nodes for each
			while ($row = mysqli_fetch_assoc($result)){

			$feature=[];
			$feature['type']="Feature";	
			$feature['geometry']['type']="Point";
			$feature['geometry']['coordinates']=[];

			array_push($feature['geometry']['coordinates'], (int)$row['lng']);	
			array_push($feature['geometry']['coordinates'], (int)$row['lat']);	
	
			
			//$feature['geometry']['coordinates']['lat']=$row['lat'];
			
			$feature['properties']['projects_number']= $row['COUNT(`loc_name`)'];
			$feature['properties']['loc_name']= $row['loc_name'];
				  $loc_name=  $row['loc_name'];
				  
				  //select only the project ids and the leaders from the  countries with the right unit
				  $sql_loc="SELECT `project_details`.`p_id`, `unit`
				  			FROM `project_locations` 
				  			INNER JOIN `project_details` ON `project_locations`.`p_id`= `project_details`.`p_id` 
				  			INNER JOIN `locations_data` ON `project_locations`.`loc_id`=`locations_data`.`loc_id` 
				  			WHERE `locations_data`.`loc_name`LIKE '$loc_name'
				  				 AND (`unit` LIKE '%rmpu%' OR `unit` LIKE '%ccpu%' OR `unit` LIKE '%cpedu%') ";

					  if($result_loc=mysqli_query($conn, $sql_loc)){

					  	$array_pID=array(); //create an array
						$array_unit=array(); //create an array for the unit
					  	while ($row_loc = mysqli_fetch_assoc($result_loc)){
					  		//echo $row_loc['p_id'];
					  		//check if the project id is in the array before push an item to the array
					  		if (in_array($row_loc['p_id'], $array_pID)==false){ 

										 
									array_push($array_pID, $row_loc['p_id']);	

							  } 

							  //check if a unit is in the array before push an item to the array
							if (in_array($row_loc['unit'], $array_unit)==false){ 
									
										array_push($array_unit, $row_loc['unit']);	
									
								
							  } 
											

					

						  	
						}
						$pID_json=json_encode($array_pID);
						$unit_json=json_encode($array_unit);

				
						$feature['properties']['p_id']= $array_pID;
						$feature['properties']['unit']= $array_unit;
					  }
					  else{
					  	echo ("Invalid query: " . mysqli_error($conn));
					  }

				array_push($featureCollection, $feature);	
				//var_dump($feature);

			}
			
			//var_dump($featureCollection);
			$featureCollection_json=json_encode($featureCollection);
			//var_dump($featureCollection_json);
			$complete_geojson=$geojson.$featureCollection_json."}";

			//var_dump($complete_geojson );
			echo $complete_geojson;

}
else{
	echo ("Invalid query: " . mysqli_error($conn));
	
}


?>
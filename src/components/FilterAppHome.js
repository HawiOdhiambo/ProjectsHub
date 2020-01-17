import React, {useEffect} from 'react';
import { useStoreActions } from 'easy-peasy';
import FetchMarkersFilter from "./FetchMarkersFilter.js";

import ProjectsCard from "./ProjectsCard.js";//import the project titles and buttons
import SearchFilter from "./SearchFilter.js";//import the project titles and buttons
import FetchFilterCharts from "./FetchFilterCharts.js";//fetch the charts
import FetchFilterSummary from "./FetchFilterSummary";



 function FilterAppHome(props){




	  //returns the filter App component to its default state
	function resetFilterApp(){

				props.resetFilterApp() //lift state up to handle a reset
	}


	useEffect(() => {

		if(props.location.state!== undefined){
	  		
		
			resetFilterApp()
			
		}
	  }, [props.location.state])

	  //take to the next filter location.
	function displayFilterCountryPage(e){
	  
	  	let countryName=window.$(e.target).attr("markerlocation"); //get the countryName with Jquery

	  	let payLoad={countryName : countryName}
	  

	  	props.handleDisplayFilterCountryPage(payLoad) //pass it to the handleDisplayFilterCountryPage while lifting state
	  }

	  
	function displayFilterProjectPage(project_title, p_id, pageLocation, e){

	  	
	  		let payLoad={p_id: p_id, project_title: project_title, pageLocation: pageLocation }

	 		props.handleDisplayFilterProjectPage(payLoad)
	 
			  
	 }




		useEffect(() => {
			
			props.intializeFilterAppHome();//make sure the App component's state have right data set
				//check if there are a parameter in the url on refresh page. Handles the autosearch on mounting if there is a parameter
				if(props.location.search!==''){
				    
				     let params = new URLSearchParams(props.location.search);

					 let countryNameParameter, unitNameParameter, ongoingClosedParameter, donorNameParameter, projectNameParameter ;

				     if(params.get('countryName')===null){
				     	countryNameParameter='';
				     }
				     if(params.get('countryName')!==null){
				     	countryNameParameter=params.get('countryName').split('-').join(' ').split('_').join('-')
				     }

				     if(params.get('unitName')===null){
				     	unitNameParameter='';
				     }
				     if(params.get('unitName')!==null){
				     	unitNameParameter=params.get('unitName')
				     }
				     if(params.get('ongoingClosedValue')===null){
				     	ongoingClosedParameter='';
				     }
				     if(params.get('ongoingClosedValue')!==null){
				     	ongoingClosedParameter=params.get('ongoingClosedValue')
				     }
				     if(params.get('donorName')===null){
				     	donorNameParameter='';
				     }
				     if(params.get('donorName')!==null){

				     	donorNameParameter=params.get('donorName').split('-').join(' ').split('_').join('-')
				     }	
				     if(params.get('projectName')===null){
				     	projectNameParameter='';
				     }
				     if(params.get('projectName')!==null){
				     	let projectNameUrl=params.get('projectName')
				     
				     	projectNameParameter=projectNameUrl.split('-').join(' ').split('_').join('-')
				     }



			
						
					 //Only if there are parameter exists assign it to the countryNameParameter of the state
					 if(countryNameParameter !== '' || unitNameParameter!=='' || ongoingClosedParameter!=='' || donorNameParameter!=='' || projectNameParameter!==''){

					 	const payLoad={countryName: countryNameParameter,
					 				 	unitName: unitNameParameter, 
					 				 	ongoingClosedValue: ongoingClosedParameter,
					 				 	donorName: donorNameParameter, 
					 				 	projectName: projectNameParameter}

					 	console.log(payLoad)
					
					 	props.handleSearch(payLoad) //lift state up to assign the country parameter to the state's country Name in Filter App
					 	
					 }


					 
				}

				if(props.pageLocation!=="" && props.pageLocation!== undefined){
	           
		          let pageLocation=props.pageLocation;
		          console.log(pageLocation)
		           
		          setTimeout(function(){
		          	if(document.getElementById(pageLocation)){
		          		document.getElementById(pageLocation).scrollIntoView();
		          	}
		           
		            }, 300);
	          }
				
		}, [])


		

		
		const mapStyle={

	   			 height : '45em',
	    		position: 'relative',
	     		 };

	    const marginStyle={
	    	marginTop : '6rem'
	    }

	    
	    
	      		return(<div className="container-fluid" style={marginStyle}>
						<div className="row ">
							<div className="col-sm-4">

								<SearchFilter displayResult={props.displayResult} resetFilterApp={resetFilterApp} handleSearch={props.handleSearch} 
								countryNameParameter={props.countryName} unitNameParameter={props.unitName} donorNameParameter={props.donorName}
								 ongoingClosedParameter={props.ongoingClosedValue} projectNameParameter={props.projectTitle}/>

							</div>

							{
								//when the display result is set to true, show the map
								(props.displayResult===true)?(

									<div className="col-sm-8" >

										<FetchMarkersFilter changeFilterPage={displayFilterCountryPage} countryName={props.countryName} 
										unitName={props.unitName}   projectTitle={props.projectTitle} ongoingClosedValue={props.ongoingClosedValue} 
										donorName={props.donorName} mapStyle={mapStyle} location={props.location}/>
									</div>

								)://when there is an error
								(props.displayErrorMessage===true)?(

									<div className="col-sm-8" >
										<p>Please enter some values to search.</p>

									</div>
								):false
							}

						</div>
						
						{ 
							//when the displayResult is set to true, show the project titles
							(props.displayResult===true)? (

			    		
								<div className="container ">
		

		                      	<ProjectsCard  location={props.location} unitName={props.unitName} changeWebPage={displayFilterProjectPage} 
		                      				 countryName={props.countryName} projectTitle={props.projectTitle} donorName={props.donorName}
		    								 ongoingClosedValue={props.ongoingClosedValue} callingPage="filter/" changePageLocation={props.changePageLocation}/>
		    					
		    					<FetchFilterSummary  unitName={props.unitName} changeWebPage={displayFilterProjectPage} 
		                      				 countryName={props.countryName} projectTitle={props.projectTitle} donorName={props.donorName}
		    								 ongoingClosedValue={props.ongoingClosedValue} />
								

								<FetchFilterCharts countryName={props.countryName} 
											unitName={props.unitName}   projectTitle={props.projectTitle} ongoingClosedValue={props.ongoingClosedValue} 
											donorName={props.donorName} 	 
											 handleDisplayProjectPage={displayFilterProjectPage}/>
				

									
								</div>
								
						):false

					}
					
			 </div>
			)
			

}

/*function changeProjectPage(){
	console.log("change");
	const changeProjectPage = useStoreActions(actions => actions.filterProjectPageModel.changeFilterProjectPageValue);
	//changeProjectPage();

}*/


export default FilterAppHome;

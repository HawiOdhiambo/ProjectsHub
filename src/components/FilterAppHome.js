import React from 'react';
import FetchMarkersFilter from "./FetchMarkersFilter.js";

import ProjectsCard from "./ProjectsCard.js";//import the project titles and buttons
import SearchFilter from "./SearchFilter.js";//import the project titles and buttons
import FetchFilterCharts from "./FetchFilterCharts.js";//fetch the charts
import FetchFilterSummary from "./FetchFilterSummary";



class FilterAppHome extends React.Component{
 constructor(props){
   super(props);
   
 
   props.intializeFilterAppHome();//make sure the App component's state have right data set

 
   this.resetFilterApp=this.resetFilterApp.bind(this);
   this.displayFilterCountryPage=this.displayFilterCountryPage.bind(this)
   this.displayFilterProjectPage=this.displayFilterProjectPage.bind(this)
  	

  }

  //returns the filter App component to its default state
  resetFilterApp(){

  	this.props.resetFilterApp() //lift state up to handle a reset
  }

  componentDidUpdate(prevProps){

  	//this works with the navlink filter to ensure the app goes back to its original state
  	if(this.props.location.state!== undefined){
  		
  		if(this.props.location.state!== prevProps.location.state){
  	
  			//window.location.reload();
  			this.resetFilterApp()
  		}
  	}
  }
  //take to the next filter location.
  displayFilterCountryPage(e){
  


  	let countryName=window.$(e.target).attr("markerlocation"); //get the countryName with Jquery
  

  	this.props.handleDisplayFilterCountryPage(countryName) //pass it to the handleDisplayFilterCountryPage while lifting state
  }

  
  displayFilterProjectPage(p_id, project_title, unit, e){
  
  	this.props.handleDisplayFilterProjectPage(p_id, project_title, unit, e)
  }




	componentDidMount(){
		

			//check if there are a parameter in the url on refresh page. Handles the autosearch on mounting if there is a parameter
			if(this.props.location.search!==''){
			    
			     let params = new URLSearchParams(this.props.location.search);

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

				 
				
				 	this.props.handleSearch(countryNameParameter, unitNameParameter, ongoingClosedParameter, donorNameParameter, projectNameParameter) //lift state up to assign the country parameter to the state's country Name in Filter App
				 	
				 }


				 
			}

			if(this.props.pageLocation!=="" && this.props.pageLocation!== undefined){
           
	          let pageLocation=this.props.pageLocation;
	          console.log(pageLocation)
	           
	          setTimeout(function(){
	          	if(document.getElementById(pageLocation)){
	          		document.getElementById(pageLocation).scrollIntoView();
	          	}
	           
	            }, 300);
          }
			
	}


	

	render(){
	
	const mapStyle={

   			 height : '45em',
    		position: 'relative',
  
   		 };


    
    
      		return(<div className="container-fluid mt-5">
					<div className="row ">
						<div className="col-sm-4">

							<SearchFilter displayResult={this.props.displayResult} resetFilterApp={this.resetFilterApp} handleSearch={this.props.handleSearch} 
							countryNameParameter={this.props.countryName} unitNameParameter={this.props.unitName} donorNameParameter={this.props.donorName}
							 ongoingClosedParameter={this.props.ongoingClosedValue} projectNameParameter={this.props.projectTitle}/>

						</div>

						{
							//when the display result is set to true, show the map
							(this.props.displayResult===true)?(

								<div className="col-sm-8" >

									<FetchMarkersFilter changeFilterPage={this.displayFilterCountryPage} countryName={this.props.countryName} 
									unitName={this.props.unitName}   projectTitle={this.props.projectTitle} ongoingClosedValue={this.props.ongoingClosedValue} 
									donorName={this.props.donorName} mapStyle={mapStyle} location={this.props.location}/>
								</div>

							)://when there is an error
							(this.props.displayErrorMessage===true)?(

								<div className="col-sm-8" >
									<p>Please enter some values to search.</p>

								</div>
							):false
						}

					</div>
					
					{ 
						//when the displayResult is set to true, show the project titles
						(this.props.displayResult===true)? (

		    		
							<div className="container ">
	

	                      	<ProjectsCard  location={this.props.location} unitName={this.props.unitName} changeWebPage={this.displayFilterProjectPage} 
	                      				 countryName={this.props.countryName} projectTitle={this.props.projectTitle} donorName={this.props.donorName}
	    								 ongoingClosedValue={this.props.ongoingClosedValue} callingPage="filter/" changePageLocation={this.props.changePageLocation}/>
	    					
	    					<FetchFilterSummary  unitName={this.props.unitName} changeWebPage={this.displayFilterProjectPage} 
	                      				 countryName={this.props.countryName} projectTitle={this.props.projectTitle} donorName={this.props.donorName}
	    								 ongoingClosedValue={this.props.ongoingClosedValue} />
							

							<FetchFilterCharts countryName={this.props.countryName} 
										unitName={this.props.unitName}   projectTitle={this.props.projectTitle} ongoingClosedValue={this.props.ongoingClosedValue} 
										donorName={this.props.donorName} 	 
										 handleDisplayProjectPage={this.props.handleDisplayFilterProjectPage}/>
			

								
							</div>
							
					):false

				}
				
		 </div>
		)
		
	}
}



export default FilterAppHome;

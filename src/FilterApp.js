import React from 'react';
import Navbar from "./Navbar.js";
import FetchMarkersFilter from "./FetchMarkersFilter.js";
import FetchProjectDetails from "./FetchProjectDetails.js";
import ProjectsCard from "./ProjectsCard.js";//import the project titles and buttons
import {BrowserRouter as Router, Route, Redirect, Link} from "react-router-dom"
class FilterApp extends React.Component{
  constructor(props){
    super(props);
   
   this.state={
   		displayResult:'no',
   		countryName: ''
   }
   this.handleSearch=this.handleSearch.bind(this);
   this.resetFilterApp=this.resetFilterApp.bind(this);
  
  }
 //used to display the result of the search
  handleSearch(countryName, e){

  
  	this.setState({countryName:countryName, displayResult:'yes'});//enables the results of the search to show on the screen
  }

  //returns the filter App component to its default state
  resetFilterApp(){
  	console.log('reset')
  	this.setState({	displayResult:'no',	countryName: '' })
  }





  render(){
    const {countryName, displayResult}=this.state

    const displayResultStyle={
    	display:  displayResult,
    }

   

    let filterPageElements;
  
    if(displayResult==='yes'){
    	filterPageElements=<Redirect push to={{pathname:"/filter", search:"countryName="+countryName }}/>
    }

    return(
    	<Router>

    		{filterPageElements}

    		 <Route exact path='/filter' 
    		 			render={({location})=> <FilterAppHome handleSearch={this.handleSearch} displayResult={displayResult} 
    		 											resetFilterApp={this.resetFilterApp} countryName={countryName} location={location} />} />
    	</Router>
    	)
    
      
     
   
  }

}

class FilterAppHome extends React.Component{


	
	componentDidMount(){
		

			//check if there are a parameter in the url
			if(this.props.location.search!==''){
				console.log(this.props.match)
				 let params = new URLSearchParams(this.props.location.search);
				
				 let countryNameParameter=params.get('countryName')
					
					
				 //Only if the countryName exists assign it to the countryNameParameter of the state
				 if(countryNameParameter!== null){

				 
				 	//this.setState({countryNameParameter:countryNameParameter})
				 	this.props.handleSearch(countryNameParameter) //lift state up to assign the country parameter to the state's country Name in Filter App
				 	
				 }


				 
			}
			
	}
	componentDidUpdate(prevProps){
	
	console.log(this.props.location)
	let pathname = window. location. pathname; console. log(pathname);		
	}


	render(){
		 const mapStyle={

   			 height : '80vh',
    		position: 'relative',
  
   		 };
	
		if(this.props.displayResult==='no'){
			return(<div className="container-fluid mt-5">
					<div className="row ">
						<div className="col-sm-4">

							<SearchFilter handleSearch={this.props.handleSearch} countryNameParameter={this.props.countryName}/>

						</div>
					</div>
				</div>)
		}
		else {
			return (
    			<div className="container-fluid mt-5">
					<div className="row ">
						<div className="col-sm-4">

							<SearchFilter handleSearch={this.props.handleSearch} countryNameParameter={this.props.countryName}/>

						</div>
						<div className="col-sm-8" >

							<FetchMarkersFilter countryName={this.props.countryName} mapStyle={mapStyle}/>
						</div>
					</div>
					<div className="row ">
						<div className="col-sm-2"></div>
						
						<div className="col-sm-8"> 

	                      	<h2> Projects </h2>

	                      	<ProjectsCard   changeHomepage={this.redirectCountryPage} countryName={this.props.countryName}/>

						</div>
						
						<div className="col-sm-2"></div>
					</div>
				</div>);
		}
		
	}
}

//controls the filter
class SearchFilter extends React.Component{
	constructor(props){
		super(props);
		
		this.state={
			charEnteredCountry: undefined,
			
		}
	
		this.autosearchCountry=this.autosearchCountry.bind(this);
		this.handleSearch=this.handleSearch.bind(this);
		
	}



	autosearchCountry(countryName, e){
		
		this.setState({charEnteredCountry: countryName});


	}



      handleSearch(e){
      	let countryName=document.getElementById("countrySearch").value;
      	this.props.handleSearch(countryName, e); //passes the values to the function by the same title by reference


     }

	render(){
		const searchCardStyle={
						
						background: '#e2be1ffa'
						}
		const searchformStyle={
			width: '80%'
		}
		const inputStyle={
			display: 'inline',
  			//width: 'auto',
    		borderBottomRightRadius: '0',
    		borderTopRightRadius: '0',
		}
		const buttonStyle={
			display: 'inline-block',
  			width: 'auto',
    		borderRadius: '0',
		}
		const {charEnteredCountry, tbodyDisplayCountry}=this.state;

		return(<div>
			

				<div className="d-flex flex-column align-items-center p-3 py-4" style={searchCardStyle}>
					<h1 className=" mb-3">Discover</h1>
					<div className=" position-relative" style={searchformStyle}>

						<CountryInput inputStyle={inputStyle} buttonStyle={buttonStyle} autosearchCountry={this.autosearchCountry}
						 charEnteredCountry={charEnteredCountry} countryNameParameter={this.props.countryNameParameter}/>
					
						<div className="d-flex justify-content-around">
								<button type="button" className="btn btn-dark btn-lg">Clear All</button>
								<button type="button" className="btn btn-dark btn-lg" onClick={this.handleSearch}>Search</button>
						</div>
						
					</div>
				</div>
				

					
			
		</div>)
	}
}

class CountryInput extends React.Component{
	constructor(props){
		super(props);
		
		this.state={
			countries:[],
		}
		this.autosearchCountry=this.autosearchCountry.bind(this);
		this.onShowDropdown=this.onShowDropdown.bind(this);
		this.onHideDropdown=this.onHideDropdown.bind(this);
		this.onchangeInput=this.onchangeInput.bind(this);
		this.handleSelectedOption=this.handleSelectedOption.bind(this);
		this.handleClearInput=this.handleClearInput.bind(this);

		
	}
	

	componentDidUpdate(prevProps){
	
			if(this.props.charEnteredCountry!==prevProps.charEnteredCountry){


				  window.$.ajax(
		        	{
		            type:'GET',
		            url: "http://localhost/projects_hub/proj_hub/public/autosearch_country.php",
		            data: {charEntered: this.props.charEnteredCountry},
		            success: function(response){
		                    
		                   
		                    let countriesData=JSON.parse(response);
		                   
		                    getData(countriesData);
		                   
		                  

		                }
		         	 });
				   let  getData = countriesData =>{

				         this.setState({countries:countriesData})				        

				      }


			}

			if(prevProps.countryNameParameter!==this.props.countryNameParameter){
				
				//if the countryNameParameter is not empty or undefined, assign it to the input countrySearch
				if(this.props.countryNameParameter!=='' && this.props.countryNameParameter!==undefined){

					document.getElementById('countrySearch').value=this.props.countryNameParameter;
					document.getElementById('clearInputButton').style.display='inline-block';//display the clear input button
					
				 }
			
			}
						



		
		}

	componentDidMount(){

		window.$('#countryDropdown').on('show.bs.dropdown',this.onShowDropdown) //add event listener
		window.$('#countryDropdown').on('hide.bs.dropdown',this.onHideDropdown)



		
			
	}

	componentWillUnmount(){

		window.$('#countryDropdown').off('show.bs.dropdown', this.onShowDropdown)//remove event listener
		window.$('#countryDropdown').off('hide.bs.dropdown',this.onHideDropdown)
	}

	 onShowDropdown(){

		//console.log('show dropdown')
		
		
		this.autosearchCountry() //call autosearch
	}


	 onHideDropdown(){

		//console.log('hide dropdown')
		
		document.getElementById('countryDropdownHideButton').style.display='none'; //Show the hide button
		document.getElementById('countryDropdownShowButton').style.display='inline-block';//Hide the show button	
		
	}
	
	//what happens when you click on the country button

	autosearchCountry(e){

		document.getElementById('countryDropdownHideButton').style.display='inline-block'; //Show the hide button
		document.getElementById('countryDropdownShowButton').style.display='none';//Hide the show button
		
		let countryName= document.getElementById("countrySearch").value; //get the value in the input box
	
		this.props.autosearchCountry(countryName, e); //lift state up to retrieve countries
		
	}

	//handle onchange event in input
	onchangeInput(e){
		//console.log('change')
		//console.log(e)
		document.getElementById('clearInputButton').style.display='inline-block';//display the clear input button


		this.autosearchCountry() //send to autosearch Country

	}


	handleSelectedOption(e){
		//console.log("selected option")
		document.getElementById('clearInputButton').style.display='inline-block';//display the clear input button
		let countryName=window.$(e.target).attr("data-countryname")	
		
		document.getElementById("countrySearch").value=countryName;
		console.log(document.getElementById("countrySearch").value);

	}
	handleClearInput(){

		document.getElementById('countrySearch').value=''
		document.getElementById('clearInputButton').style.display='none'

	}





	render (){
		const {countries}=this.state;
		const dropdownStyle={
			    maxHeight: '16em',
			    overflow: 'auto',
			    position: 'absolute',
			    background: 'white',
			    width:'96%',
			    
		}
		const hideButtonStyle={
			display:'none'
		}

		return(	<div className="form-group dropdown d-flex " id="countryDropdown">
			
				
						<div id='countryButtonGroup' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className=" d-flex flex-grow-1">

							<input type="text" className="form-control  flex-grow-1" id="countrySearch" placeholder="Country" 
								style={this.props.inputStyle} onKeyPress={this.onchangeInput} />
								
							<button type='button' id="countryDropdownShowButton"className="form-control" 
							style={this.props.buttonStyle} ><i className='material-icons'>keyboard_arrow_right</i></button>
						
						</div>
						
				
							<button type='button' id="countryDropdownHideButton"className="form-control" 
									style={Object.assign({}, this.props.buttonStyle, hideButtonStyle)}   >
									<i className='material-icons'>keyboard_arrow_down</i></button>
								<button type='button' className="form-control" 
									style={Object.assign({}, this.props.buttonStyle, hideButtonStyle)} id='clearInputButton' onClick={this.handleClearInput}>
									<i className='material-icons'>clear</i></button>
					
						<div className="dropdown-menu" aria-labelledby="countrySearch" style={dropdownStyle}>
						{	

							countries.map( 
								country=> <button key={country.loc_id} className="d-block"  className="dropdown-item" type="button"
								data-countryname= {country.loc_name} onClick={this.handleSelectedOption}>{country.loc_name}</button>
								)

								
						}
						</div>
					
				</div>);
	}
}
export default FilterApp;

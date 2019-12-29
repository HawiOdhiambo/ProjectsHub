import React from 'react';
import CountryInput from "./CountryInput.js"
import UnitInput from "./UnitInput.js"
import OngoingClosedInput from "./OngoingClosedInput.js"
import DonorInput from "./DonorInput.js"
import ProjectNameInput from "./ProjectNameInput.js"
//controls the filter
class SearchFilter extends React.Component{
	constructor(props){
		super(props);
		
		this.state={
			charEnteredCountry: undefined,
			charEnteredUnit: undefined,
			charEnteredOngoingClosed: undefined,
			charEnteredDonor: undefined,
			charEnteredProjectName: undefined,

			//toggles everytime an input has been clicked. To ensure that an autosearch only happens when the input has been clicked
			countryFlag: false,
			unitFlag: false,
			ongoingClosedFlag: false,
			donorFlag: false,
			projectNameFlag:false
		}
	
		this.autosearchCountry=this.autosearchCountry.bind(this);
		this.autosearchUnit=this.autosearchUnit.bind(this)
		this.autosearchOngoingClosed=this.autosearchOngoingClosed.bind(this)
		this.autosearchDonor=this.autosearchDonor.bind(this)
		this.autosearchProjectName=this.autosearchProjectName.bind(this)



		this.handleClearCountryInput=this.handleClearCountryInput.bind(this);
		this.handleClearUnitInput=this.handleClearUnitInput.bind(this);
		this.handleClearOngoingClosedInput=this.handleClearOngoingClosedInput.bind(this);
		this.handleClearDonorInput=this.handleClearDonorInput.bind(this);
		this.handleClearProjectNameInput=this.handleClearProjectNameInput.bind(this);

			


		this.handleSearch=this.handleSearch.bind(this);
		this.handleClearAll=this.handleClearAll.bind(this)
		
	}


	//search for a country in the db
	autosearchCountry(countryName, e){
		
		this.setState({charEnteredCountry: countryName});


	}
	//autosearch Unit
	autosearchUnit(unitName, e){
		
		this.setState({charEnteredUnit: unitName});

	}

	//autosearch ongoingClosed
	autosearchOngoingClosed(ongoingClosed, e){
		
		this.setState({charEnteredOngoingClosed: ongoingClosed});

	}

	autosearchDonor(donorName, e){

		
		this.setState({charEnteredDonor: donorName, donorFlag: !this.state.donorFlag});

	}

	autosearchProjectName(projectName, e){
	

		
		this.setState({charEnteredProjectName: projectName, projectNameFlag: !this.state.projectNameFlag});

	}


	//handle clearing the country input
	handleClearCountryInput(){
		
		document.getElementById('countrySearch').value='';
		document.getElementById('clearInputCountryButton').style.display='none';
		this.setState({charEnteredCountry: undefined});

	}


	//handle clearing the unit input	
	handleClearUnitInput(){

		document.getElementById('unitSearch').value='';
		document.getElementById('clearInputUnitButton').style.display='none';
		this.setState({charEnteredUnit: undefined});

	}

	handleClearOngoingClosedInput(){

		document.getElementById('ongoingClosedSearch').value='';
		document.getElementById('clearInputOngoingClosedButton').style.display='none';
		this.setState({charEnteredOngoingClosed: undefined});

	}


	handleClearDonorInput(){

		document.getElementById('donorSearch').value='';
		document.getElementById('clearInputDonorButton').style.display='none';
		this.setState({charEnteredDonor: undefined});


	}
	handleClearProjectNameInput(){

		document.getElementById('projectNameSearch').value='';
		document.getElementById('clearInputProjectNameButton').style.display='none';
		this.setState({charEnteredProjectName: undefined});

	}


     handleSearch(e){
      	let countryName=document.getElementById("countrySearch").value;
      	let unitName=document.getElementById("unitSearch").value;
      	let ongoingClosedValue=document.getElementById("ongoingClosedSearch").value;
      	let donorValue=document.getElementById("donorSearch").value;
      	let projectName=document.getElementById("projectNameSearch").value;
      	let p_id=document.getElementById("projectNameSearch").getAttribute('data-project_id');
      	this.props.handleSearch(countryName,unitName, ongoingClosedValue, donorValue, projectName, p_id, e); //passes the values to the function by the same title by reference


     }
     //clear all fields in the form and hide the results
     handleClearAll(e){
     	//console.log('clear all fields and hide the results');

     	this.props.resetFilterApp() //lift state up to hide results


     }

  
     componentDidMount(){
    
   		//what happens when the  backResults button is clicked and the component has to mount

		//check to marke sure if the countryNameParameter is not empty before assigning it to the countrySearch Input
		if(this.props.countryNameParameter!=='' && this.props.countryNameParameter!==undefined){	
	
			document.getElementById('countrySearch').value=this.props.countryNameParameter;
			document.getElementById('clearInputCountryButton').style.display='inline-block';//display the clear input button
			this.setState({charEnteredCountry: this.props.countryNameParameter}); //set the local state to reflect the right values
		 }

		 if(this.props.unitNameParameter!=='' && this.props.unitNameParameter!==undefined){

				document.getElementById('unitSearch').value=this.props.unitNameParameter;
				document.getElementById('clearInputUnitButton').style.display='inline-block';//display the clear input button
				this.setState({charEnteredUnit: this.props.unitNameParameter});
				
			 }
		if(this.props.ongoingClosedParameter!=='' && this.props.ongoingClosedParameter!==undefined){

				document.getElementById('ongoingClosedSearch').value=this.props.ongoingClosedParameter;
				document.getElementById('clearInputOngoingClosedButton').style.display='inline-block';//display the clear input button
				this.setState({charEnteredOngoingClosed: this.props.ongoingClosedParameter});
				
			}
		if(this.props.donorNameParameter!=='' && this.props.donorNameParameter!==undefined){

				document.getElementById('donorSearch').value=this.props.donorNameParameter;
				document.getElementById('clearInputDonorButton').style.display='inline-block';//display the clear input button
				this.setState({charEnteredDonor: this.props.donorNameParameter});
			}

		if(this.props.projectNameParameter!=='' && this.props.projectNameParameter!==undefined){

				document.getElementById('projectNameSearch').value=this.props.projectNameParameter;
				document.getElementById('clearInputProjectNameButton').style.display='inline-block';//display the clear input button
				this.setState({charEnteredProjectName: this.props.projectNameParameter});
				
			}


     }
     componentDidUpdate(prevProps){

     	
     	//this happens when you have to refresh the filterAppHome using the browser
		if(prevProps.countryNameParameter!==this.props.countryNameParameter){
	
			//if the countryNameParameter is not empty or undefined, assign it to the input countrySearch
			if(this.props.countryNameParameter!=='' && this.props.countryNameParameter!==undefined){

				document.getElementById('countrySearch').value=this.props.countryNameParameter;
				document.getElementById('clearInputCountryButton').style.display='inline-block';//display the clear input button
				this.setState({charEnteredCountry: this.props.countryNameParameter});
			 }
			else{ 
				//this will happen especially when the filter button is clicked and when the clear all button is clicked
				this.handleClearCountryInput();
			}

		
		}

		if(prevProps.unitNameParameter!==this.props.unitNameParameter){
		
	
			//if the unitName is not empty or undefined, assign it to the input unitSearch element
			if(this.props.unitNameParameter!=='' && this.props.unitNameParameter!==undefined){

				document.getElementById('unitSearch').value=this.props.unitNameParameter;
				document.getElementById('clearInputUnitButton').style.display='inline-block';//display the clear input button
				this.setState({charEnteredUnit: this.props.unitNameParameter});
			 }
			else{ 	//this will happen especially when the filter button is clicked and when the clear all button is clicked
				
				this.handleClearUnitInput();
			}
		
		}

		if(prevProps.ongoingClosedParameter!==this.props.ongoingClosedParameter){
		
			//if the ongoingClosedParameter is not empty or undefined, assign it to the input ongoingClosedSearch element
			if(this.props.ongoingClosedParameter!=='' && this.props.ongoingClosedParameter!==undefined){

				document.getElementById('ongoingClosedSearch').value=this.props.ongoingClosedParameter;
				document.getElementById('clearInputOngoingClosedButton').style.display='inline-block';//display the clear input button
				this.setState({charEnteredOngoingClosed: this.props.ongoingClosedParameter});

			}
			else{ 	//this will happen especially when the filter button is clicked and when the clear all button is clicked
				
				this.handleClearOngoingClosedInput();
			}
		
		}
			
		if(prevProps.donorNameParameter!==this.props.donorNameParameter){
		
					//if the donorNameParameter is not empty or undefined, assign it to the input donorSearch element
			if(this.props.donorNameParameter!=='' && this.props.donorNameParameter!==undefined){

					document.getElementById('donorSearch').value=this.props.donorNameParameter;
					document.getElementById('clearInputDonorButton').style.display='inline-block';//display the clear input button
					this.setState({charEnteredDonor: this.props.donorNameParameter});
				}
				else{ 	//this will happen especially when the filter button is clicked and when the clear all button is clicked
					
					this.handleClearDonorInput();
				}
		
		}				

		if(prevProps.projectNameParameter!==this.props.projectNameParameter){
		
				//if the projectNameParameter is not empty or undefined, assign it to the input projectNameSearch element
			if(this.props.projectNameParameter!=='' && this.props.projectNameParameter!==undefined){

					document.getElementById('projectNameSearch').value=this.props.projectNameParameter;
					document.getElementById('clearInputProjectNameButton').style.display='inline-block';//display the clear input button
					this.setState({charEnteredProjectName: this.props.projectNameParameter});
					
				}

				else{ 	//this will happen especially when the filter button is clicked and when the clear all button is clicked
					
					this.handleClearProjectNameInput();
				}
		
		}	


     }


	render(){
		const searchCardStyle={
						
						background: '#E2BE1F'
						}
		const searchformStyle={
			width: '80%'
		}
		const inputStyle={
			display: 'inline',
  			color: '#009DC4',
    		borderBottomRightRadius: '0',
    		borderTopRightRadius: '0',
		}
		const buttonStyle={
			display: 'inline-block',
  			width: 'auto',
    		borderRadius: '0',
		}
		const {charEnteredCountry, charEnteredUnit, charEnteredOngoingClosed, charEnteredDonor, charEnteredProjectName,
				countryFlag, unitFlag, ongoingClosedFlag, donorFlag, projectNameFlag}=this.state;
		return(<div>
			

				<div className="d-flex flex-column align-items-center p-3 py-4" style={searchCardStyle}>
					<h1 className=" mb-3">Discover</h1>
					<div className=" position-relative" style={searchformStyle}>

						<CountryInput inputStyle={inputStyle} buttonStyle={buttonStyle} autosearchCountry={this.autosearchCountry}
						 charEnteredCountry={charEnteredCountry} countryNameParameter={this.props.countryNameParameter}  handleClearCountryInput={this.handleClearCountryInput}/>

						<UnitInput inputStyle={inputStyle} buttonStyle={buttonStyle} autosearchUnit={this.autosearchUnit}
						 charEnteredUnit={charEnteredUnit} unitNameParameter={this.props.unitNameParameter} 
						  handleClearUnitInput={this.handleClearUnitInput}/>

						 <OngoingClosedInput inputStyle={inputStyle} buttonStyle={buttonStyle} autosearchOngoingClosed={this.autosearchOngoingClosed} 
											 charEnteredOngoingClosed={charEnteredOngoingClosed} ongoingClosedParameter={this.props.ongoingClosedParameter} 
											 handleClearOngoingClosedInput={this.handleClearOngoingClosedInput}/>

						 <DonorInput inputStyle={inputStyle} buttonStyle={buttonStyle} autosearchDonor={this.autosearchDonor} 
									 charEnteredDonor={charEnteredDonor} 
									 charEnteredCountry={charEnteredCountry} charEnteredUnit={charEnteredUnit} 
									 charEnteredOngoingClosed={charEnteredOngoingClosed} charEnteredProjectName={charEnteredProjectName}
									 donorFlag={donorFlag}
									 handleClearDonorInput={this.handleClearDonorInput}/>

						<ProjectNameInput inputStyle={inputStyle} buttonStyle={buttonStyle} autosearchProjectName ={this.autosearchProjectName} 
										 charEnteredProjectName={charEnteredProjectName} 
										 charEnteredCountry={charEnteredCountry} charEnteredUnit={charEnteredUnit} 
								 		 charEnteredOngoingClosed={charEnteredOngoingClosed} charEnteredDonor={charEnteredDonor} 
										 projectNameFlag={projectNameFlag} 
										 handleClearProjectNameInput={this.handleClearProjectNameInput}/>

						<div className="d-flex justify-content-around">
								<button type="button" className="btn btn-dark btn-lg" onClick={this.handleClearAll}>Clear All</button>
								<button type="button" className="btn btn-dark btn-lg" onClick={this.handleSearch}>Search</button>
						</div>
						
					</div>
				</div>
				

					
			
		</div>)
	}
}
export default SearchFilter;

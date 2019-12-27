import React from 'react';


class DonorInput extends React.Component{
	constructor(props){
		super(props);
		
		this.state={
			donorNames:[],
		}
		this.autosearchDonor=this.autosearchDonor.bind(this);
		this.onShowDropdown=this.onShowDropdown.bind(this);
		this.onHideDropdown=this.onHideDropdown.bind(this);
		this.onchangeInput=this.onchangeInput.bind(this);
		this.handleSelectedOption=this.handleSelectedOption.bind(this);
		this.handleClearDonorInput=this.handleClearDonorInput.bind(this);

		
	}

	 		 
	componentDidUpdate(prevProps){
	
			/*checks whether the donor input has been clicked. If it has been clicked then, the donorFlag will be different. 
			This is because everytime a search is requested the donor flag is toggled. 
			Then it checks if any of the other variables are different, if not no search. If so it recomputes the state
			*/
		
			if(this.props.donorFlag!==prevProps.donorFlag 
				&& (prevProps.charEnteredDonor!== this.props.charEnteredDonor ||	prevProps.charEnteredCountry!== this.props.charEnteredCountry || 
				prevProps.charEnteredUnit !== this.props.charEnteredUnit || prevProps.charEnteredOngoingClosed !== this.props.charEnteredOngoingClosed ||
				prevProps.charEnteredProjectName !== this.props.charEnteredProjectName)){

				  window.$.ajax(
		        	{
		            type:'GET',
		            url: "http://localhost/projects_hub/proj_hub/public/autosearch_donor.php",
		            data: {charEnteredDonor: this.props.charEnteredDonor, charEnteredCountry: this.props.charEnteredCountry,
		            	 charEnteredUnit: this.props.charEnteredUnit, charEnteredOngoingClosed: this.props.charEnteredOngoingClosed,
		            		charEnteredProjectName:this.props.charEnteredProjectName},
		            success: function(response){
		                    
		                   
		                    let donorData=JSON.parse(response);
		                   
		                    getData(donorData);
		                   
		                  

		                }
		         	 });
				   let  getData = donorData =>{

				         this.setState({donorNames:donorData})				        

				      }


			}


		
		}

	componentDidMount(){

		window.$('#donorDropdown').on('show.bs.dropdown',this.onShowDropdown) //add event listener
		window.$('#donorDropdown').on('hide.bs.dropdown',this.onHideDropdown)

		
			
	}

	componentWillUnmount(){

		window.$('#donorDropdown').off('show.bs.dropdown', this.onShowDropdown)//remove event listener
		window.$('#donorDropdown').off('hide.bs.dropdown',this.onHideDropdown)
	}

	 onShowDropdown(){

		//console.log('show dropdown')
		
		
		this.autosearchDonor() //call autosearch
	}


	 onHideDropdown(){

		//console.log('hide dropdown')
		
		document.getElementById('donorDropdownHideButton').style.display='none'; //Show the hide button
		document.getElementById('donorDropdownShowButton').style.display='inline-block';//Hide the show button	
		
	}
	
	//what happens when you click on the donor button

	autosearchDonor(e){

		document.getElementById('donorDropdownHideButton').style.display='inline-block'; //Show the hide button
		document.getElementById('donorDropdownShowButton').style.display='none';//Hide the show button
		
		let donorName= document.getElementById("donorSearch").value; //get the value in the input box
	
		this.props.autosearchDonor(donorName, e); //lift state up to retrieve countries
		
	}

	//handle onchange event in input
	onchangeInput(e){
		//console.log('change')
		//console.log(e)
		document.getElementById('clearInputDonorButton').style.display='inline-block';//display the clear input button


		this.autosearchDonor() //send to autosearch Donor

	}


	handleSelectedOption(e){
		//console.log("selected option")
		document.getElementById('clearInputDonorButton').style.display='inline-block';//display the clear input button
		let donorValue=window.$(e.target).attr("data-ongoing_closed_value")	
		
		document.getElementById("donorSearch").value=donorValue;
		this.props.autosearchDonor(donorValue, e); //lift state up to retrieve countries
	}

	handleClearDonorInput(e){
		this.props.handleClearDonorInput();//lift state up to clear the donor input box
	}




	render (){
		const {donorNames}=this.state;
		const dropdownStyle={
			    maxHeight: '16em',
			    overflow: 'auto',
			    position: 'absolute',
			    background: 'white',
			    width: '96%',
			    
		}
		const hideButtonStyle={
			display:'none'
		}
		const dropdownItemStyle={
			whiteSpace:'normal'
		}
		return(	<div className="form-group dropdown d-flex " id="donorDropdown">
			
				
						<div id='donorButtonGroup' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className=" d-flex flex-grow-1">

							<input type="text" className="form-control  flex-grow-1" id="donorSearch" placeholder="Donor" 
								style={this.props.inputStyle} onChange={this.onchangeInput} />
								
							<button type='button' id="donorDropdownShowButton"className="form-control" 
							style={this.props.buttonStyle} ><i className='material-icons'>keyboard_arrow_right</i></button>
						
						</div>
						
				
							<button type='button' id="donorDropdownHideButton"className="form-control" 
									style={Object.assign({}, this.props.buttonStyle, hideButtonStyle)}   >
									<i className='material-icons'>keyboard_arrow_down</i></button>

							<button type='button' className="form-control" style={Object.assign({}, this.props.buttonStyle, hideButtonStyle)}
									 id='clearInputDonorButton' onClick={this.handleClearDonorInput}>
								<i className='material-icons'>clear</i></button>
				
						<div className="dropdown-menu" aria-labelledby="donorSearch" style={dropdownStyle}>
						{	

							donorNames.map( 
								donor=> <button key={donor.donor_id} className="d-block"  className="dropdown-item" type="button"
								data-ongoing_closed_value= {donor.donor_name} onClick={this.handleSelectedOption} style={dropdownItemStyle}>{donor.donor_name}</button>
								)

								
						}
						</div>
					
				</div>);
	}
}

export default DonorInput;

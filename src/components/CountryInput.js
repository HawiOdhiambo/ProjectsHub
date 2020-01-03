import React from 'react';


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
		this.handleClearCountryInput=this.handleClearCountryInput.bind(this);

		
	}
	

	componentDidUpdate(prevProps){
	
			if(this.props.charEnteredCountry!==prevProps.charEnteredCountry 
				&& this.props.charEnteredCountry!== undefined){


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
		document.getElementById('clearInputCountryButton').style.display='inline-block';//display the clear input button


		this.autosearchCountry() //send to autosearch Country

	}


	handleSelectedOption(e){
		//console.log("selected option")
		document.getElementById('clearInputCountryButton').style.display='inline-block';//display the clear input button
		let countryName=window.$(e.target).attr("data-countryname")	
		
		document.getElementById("countrySearch").value=countryName;
		this.props.autosearchCountry(countryName, e); //lift state up to retrieve countries
	}

	handleClearCountryInput(e){
		this.props.handleClearCountryInput();//lift state up to clear the country input box
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
								style={this.props.inputStyle} onChange={this.onchangeInput} />
								
							<button type='button' id="countryDropdownShowButton"className="form-control" 
							style={this.props.buttonStyle} ><i className='material-icons'>keyboard_arrow_right</i></button>
						
						</div>
						
				
							<button type='button' id="countryDropdownHideButton"className="form-control" 
									style={Object.assign({}, this.props.buttonStyle, hideButtonStyle)}   >
									<i className='material-icons'>keyboard_arrow_down</i></button>

								<button type='button' className="form-control" 
									style={Object.assign({}, this.props.buttonStyle, hideButtonStyle)} id='clearInputCountryButton' onClick={this.handleClearCountryInput}>
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

export default CountryInput;

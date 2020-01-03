import React from 'react';


class OngoingClosedInput extends React.Component{
	constructor(props){
		super(props);
		
		this.state={
			ongoingClosedValues:[],
		}
		this.autosearchOngoingClosed=this.autosearchOngoingClosed.bind(this);
		this.onShowDropdown=this.onShowDropdown.bind(this);
		this.onHideDropdown=this.onHideDropdown.bind(this);
		this.onchangeInput=this.onchangeInput.bind(this);
		this.handleSelectedOption=this.handleSelectedOption.bind(this);
		this.handleClearOngoingClosedInput=this.handleClearOngoingClosedInput.bind(this);

		
	}
	

	componentDidUpdate(prevProps){
	
			if(this.props.charEnteredOngoingClosed!==prevProps.charEnteredOngoingClosed
			 && this.props.charEnteredOngoingClosed!==undefined){


				  window.$.ajax(
		        	{
		            type:'GET',
		            url: "http://localhost/projects_hub/proj_hub/public/autosearch_ongoingClosed.php",
		            data: {charEntered: this.props.charEnteredOngoingClosed},
		            success: function(response){
		                    
		            
		                    let ongoingClosedData=JSON.parse(response);
		                   
		                    getData(ongoingClosedData);
		                   
		                  

		                }
		         	 });
				   let  getData = ongoingClosedData =>{

				         this.setState({ongoingClosedValues:ongoingClosedData})				        

				      }


			}


		
		}

	componentDidMount(){

		window.$('#ongoingClosedDropdown').on('show.bs.dropdown',this.onShowDropdown) //add event listener
		window.$('#ongoingClosedDropdown').on('hide.bs.dropdown',this.onHideDropdown)

		
			
	}

	componentWillUnmount(){

		window.$('#ongoingClosedDropdown').off('show.bs.dropdown', this.onShowDropdown)//remove event listener
		window.$('#ongoingClosedDropdown').off('hide.bs.dropdown',this.onHideDropdown)
	}

	 onShowDropdown(){

		
		this.autosearchOngoingClosed() //call autosearch
	}


	 onHideDropdown(){

		//console.log('hide dropdown')
		
		document.getElementById('ongoingClosedDropdownHideButton').style.display='none'; //Show the hide button
		document.getElementById('ongoingClosedDropdownShowButton').style.display='inline-block';//Hide the show button	
		
	}
	
	//what happens when you click on the ongoingClosed button

	autosearchOngoingClosed(e){

		document.getElementById('ongoingClosedDropdownHideButton').style.display='inline-block'; //Show the hide button
		document.getElementById('ongoingClosedDropdownShowButton').style.display='none';//Hide the show button
		
		let ongoingClosedValue= document.getElementById("ongoingClosedSearch").value; //get the value in the input box
	

		this.props.autosearchOngoingClosed(ongoingClosedValue, e); //lift state up to retrieve countries
		
	}

	//handle onchange event in input
	onchangeInput(e){
		//console.log('change')
		//console.log(e)
		document.getElementById('clearInputOngoingClosedButton').style.display='inline-block';//display the clear input button


		this.autosearchOngoingClosed() //send to autosearch OngoingClosed

	}


	handleSelectedOption(e){
		//console.log("selected option")
		document.getElementById('clearInputOngoingClosedButton').style.display='inline-block';//display the clear input button
		let ongoingClosedValue=window.$(e.target).attr("data-ongoing_closed_value")	
		
		document.getElementById("ongoingClosedSearch").value=ongoingClosedValue;
		this.props.autosearchOngoingClosed(ongoingClosedValue, e); //lift state up to retrieve ongoingClosedValues
	}

	handleClearOngoingClosedInput(e){
		this.props.handleClearOngoingClosedInput();//lift state up to clear the ongoingClosed input box
	}




	render (){
		const {ongoingClosedValues}=this.state;
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

		return(	<div className="form-group dropdown d-flex " id="ongoingClosedDropdown">
			
				
						<div id='ongoingClosedButtonGroup' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className=" d-flex flex-grow-1">

							<input type="text" className="form-control  flex-grow-1" id="ongoingClosedSearch" placeholder="Ongoing/Closed" 
								style={this.props.inputStyle} onChange={this.onchangeInput} />
								
							<button type='button' id="ongoingClosedDropdownShowButton"className="form-control" 
							style={this.props.buttonStyle} ><i className='material-icons'>keyboard_arrow_right</i></button>
						
						</div>
						
				
							<button type='button' id="ongoingClosedDropdownHideButton"className="form-control" 
									style={Object.assign({}, this.props.buttonStyle, hideButtonStyle)}   >
									<i className='material-icons'>keyboard_arrow_down</i></button>

							<button type='button' className="form-control" style={Object.assign({}, this.props.buttonStyle, hideButtonStyle)}
									 id='clearInputOngoingClosedButton' onClick={this.handleClearOngoingClosedInput}>
								<i className='material-icons'>clear</i></button>
				
						<div className="dropdown-menu" aria-labelledby="ongoingClosedSearch" style={dropdownStyle}>
						{	

							ongoingClosedValues.map( 
								ongoingClosedValue=> <button key={ongoingClosedValue.ongoingClosed_id} className="d-block"  className="dropdown-item" type="button"
								data-ongoing_closed_value= {ongoingClosedValue.ongoingClosed_Value} onClick={this.handleSelectedOption}>{ongoingClosedValue.ongoingClosed_Value}</button>
								)

								
						}
						</div>
					
				</div>);
	}
}

export default OngoingClosedInput;

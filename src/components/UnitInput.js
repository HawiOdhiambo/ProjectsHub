import React from 'react';

class UnitInput extends React.Component{
	constructor(props){
		super(props);
		
		this.state={
			unit:[],
		}
		this.autosearchUnit=this.autosearchUnit.bind(this);
		this.onShowDropdown=this.onShowDropdown.bind(this);
		this.onHideDropdown=this.onHideDropdown.bind(this);
		this.onchangeInput=this.onchangeInput.bind(this);
		this.handleSelectedOption=this.handleSelectedOption.bind(this);
		this.handleClearUnitInput=this.handleClearUnitInput.bind(this);

		
	}
	

	componentDidUpdate(prevProps){
	
			if(this.props.charEnteredUnit!==prevProps.charEnteredUnit 
				&& this.props.charEnteredUnit!==undefined ){


				  window.$.ajax(
		        	{
		            type:'GET',
		            url: "http://localhost/projects_hub/proj_hub/public/autosearch_unit.php",
		            data: {charEntered: this.props.charEnteredUnit},
		            success: function(response){
		                    
		                   
		                    let unitData=JSON.parse(response);
		                   
		                    getData(unitData);
		                   
		                  

		                }
		         	 });
				   let  getData = unitData =>{

				         this.setState({unit:unitData})				        

				      }


			}


		
		}

	componentDidMount(){

		window.$('#unitDropdown').on('show.bs.dropdown',this.onShowDropdown) //add event listener
		window.$('#unitDropdown').on('hide.bs.dropdown',this.onHideDropdown)

		
			
	}

	componentWillUnmount(){

		window.$('#unitDropdown').off('show.bs.dropdown', this.onShowDropdown)//remove event listener
		window.$('#unitDropdown').off('hide.bs.dropdown',this.onHideDropdown)
	}

	 onShowDropdown(){

		//console.log('show dropdown')
		
		
		this.autosearchUnit() //call autosearch
	}


	 onHideDropdown(){

		//console.log('hide dropdown')
		
		document.getElementById('unitDropdownHideButton').style.display='none'; //Show the hide button
		document.getElementById('unitDropdownShowButton').style.display='inline-block';//Hide the show button	
		
	}
	
	//what happens when you click on the unit button

	autosearchUnit(e){

		document.getElementById('unitDropdownHideButton').style.display='inline-block'; //Show the hide button
		document.getElementById('unitDropdownShowButton').style.display='none';//Hide the show button
		
		let unitName= document.getElementById("unitSearch").value; //get the value in the input box
	
		this.props.autosearchUnit(unitName, e); //lift state up to retrieve unit
		
	}

	//handle onchange event in input
	onchangeInput(e){
		//console.log('change')
		//console.log(e)
		document.getElementById('clearInputUnitButton').style.display='inline-block';//display the clear input button


		this.autosearchUnit() //send to autosearch Unit

	}


	handleSelectedOption(e){
		//console.log("selected option")
		document.getElementById('clearInputUnitButton').style.display='inline-block';//display the clear input button
		let unitName=window.$(e.target).attr("data-unitname")	
		
		document.getElementById("unitSearch").value=unitName;
		this.props.autosearchUnit(unitName, e); //lift state up to retrieve unit
	}

	handleClearUnitInput(e){
		this.props.handleClearUnitInput();//lift state up to clear the unit input box
	}




	render (){
		const {unit}=this.state;
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

		return(	<div className="form-group dropdown d-flex " id="unitDropdown">
			
				
						<div id='unitButtonGroup' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className=" d-flex flex-grow-1">

							<input type="text" className="form-control  flex-grow-1" id="unitSearch" placeholder="Unit" 
								style={this.props.inputStyle} onChange={this.onchangeInput} />
								
							<button type='button' id="unitDropdownShowButton"className="form-control" 
							style={this.props.buttonStyle} ><i className='material-icons'>keyboard_arrow_right</i></button>
						
						</div>
						
				
							<button type='button' id="unitDropdownHideButton"className="form-control" 
									style={Object.assign({}, this.props.buttonStyle, hideButtonStyle)}   >
									<i className='material-icons'>keyboard_arrow_down</i></button>

								<button type='button' className="form-control" 
									style={Object.assign({}, this.props.buttonStyle, hideButtonStyle)} id='clearInputUnitButton' onClick={this.handleClearUnitInput}>
									<i className='material-icons'>clear</i></button>
					
						<div className="dropdown-menu" aria-labelledby="unitSearch" style={dropdownStyle}>
						{	

							unit.map( 
								unit=> <button key={unit.unit_id} className="d-block"  className="dropdown-item" type="button"
								data-unitname= {unit.unit_name} onClick={this.handleSelectedOption}>{unit.unit_name}</button>
								)

								
						}
						</div>
					
				</div>);
	}
}

export default UnitInput;
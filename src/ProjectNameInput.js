import React from 'react';


class ProjectNameInput extends React.Component{
	constructor(props){
		super(props);
		
		this.state={
			projectNames:[],
		}
		this.autosearchProjectName=this.autosearchProjectName.bind(this);
		this.onShowDropdown=this.onShowDropdown.bind(this);
		this.onHideDropdown=this.onHideDropdown.bind(this);
		this.onchangeInput=this.onchangeInput.bind(this);
		this.handleSelectedOption=this.handleSelectedOption.bind(this);
		this.handleClearProjectNameInput=this.handleClearProjectNameInput.bind(this);

		
	}
	

	componentDidUpdate(prevProps){
			
			/*checks whether the projectName input has been clicked. If it has then, the projectNameFlag will be different. 
			This is because everytime a search is requested the projectNameflag's value is toggled. 
			It also checks if any of the other variables are different, if not no search. If so it recomputes the state
			*/

			
			if(this.props.projectNameFlag!==prevProps.projectNameFlag 
				&& (prevProps.charEnteredProjectName !== this.props.charEnteredProjectName ||	prevProps.charEnteredCountry!== this.props.charEnteredCountry || 
				prevProps.charEnteredUnit !== this.props.charEnteredUnit || prevProps.charEnteredOngoingClosed !== this.props.charEnteredOngoingClosed ||
				prevProps.charEnteredDonor!== this.props.charEnteredDonor)){
					

				  window.$.ajax(
		        	{
		            type:'GET',
		            url: "http://localhost/projects_hub/proj_hub/public/autosearch_projectName.php",
		            data: {charEnteredProjectName: this.props.charEnteredProjectName, charEnteredCountry: this.props.charEnteredCountry,
		            	 charEnteredUnit: this.props.charEnteredUnit, charEnteredOngoingClosed: this.props.charEnteredOngoingClosed,
		            	  charEnteredDonor: this.props.charEnteredDonor},
		            success: function(response){
		                    
		            		
		                    let projectNameData=JSON.parse(response);
		                   
		                    getData(projectNameData);
		                   
		                  

		                }
		         	 });
				   let  getData = projectNameData =>{

				         this.setState({projectNames:projectNameData})				        

				      }


			}


		
		}

	componentDidMount(){

		window.$('#projectNameDropdown').on('show.bs.dropdown',this.onShowDropdown) //add event listener
		window.$('#projectNameDropdown').on('hide.bs.dropdown',this.onHideDropdown)

		
			
	}

	componentWillUnmount(){

		window.$('#projectNameDropdown').off('show.bs.dropdown', this.onShowDropdown)//remove event listener
		window.$('#projectNameDropdown').off('hide.bs.dropdown',this.onHideDropdown)
	}

	 onShowDropdown(){

		//console.log('show dropdown')
		
		
		this.autosearchProjectName() //call autosearch
	}


	 onHideDropdown(){

		//console.log('hide dropdown')
		
		document.getElementById('projectNameDropdownHideButton').style.display='none'; //Show the hide button
		document.getElementById('projectNameDropdownShowButton').style.display='inline-block';//Hide the show button	
		
	}
	
	//what happens when you click on the projectName button

	autosearchProjectName(e){

		document.getElementById('projectNameDropdownHideButton').style.display='inline-block'; //Show the hide button
		document.getElementById('projectNameDropdownShowButton').style.display='none';//Hide the show button
		
		let projectNameValue= document.getElementById("projectNameSearch").value; //get the value in the input box
	
		this.props.autosearchProjectName(projectNameValue, e); //lift state up to retrieve countries
		
	}

	//handle onchange event in input
	onchangeInput(e){
		//console.log('change')
		//console.log(e)
		document.getElementById('clearInputProjectNameButton').style.display='inline-block';//display the clear input button


		this.autosearchProjectName() //send to autosearch ProjectName

	}


	handleSelectedOption(e){
		//console.log("selected option")
		document.getElementById('clearInputProjectNameButton').style.display='inline-block';//display the clear input button
		let projectNameValue=window.$(e.target).attr("data-project_name")	
		
		document.getElementById("projectNameSearch").value=projectNameValue;
		this.props.autosearchProjectName(projectNameValue, e); //lift state up to retrieve countries
		
	}

	handleClearProjectNameInput(e){
		this.props.handleClearProjectNameInput();//lift state up to clear the projectName input box
	}




	render (){
		const {projectNames}=this.state;
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
		return(	<div className="form-group dropdown d-flex " id="projectNameDropdown">
			
				
						<div id='projectNameButtonGroup' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className=" d-flex flex-grow-1">

							<input type="text" className="form-control  flex-grow-1" id="projectNameSearch" placeholder="Project Name" 
								style={this.props.inputStyle} onChange={this.onchangeInput} data-project_id=""/>
								
							<button type='button' id="projectNameDropdownShowButton"className="form-control" 
							style={this.props.buttonStyle} ><i className='material-icons'>keyboard_arrow_right</i></button>
						
						</div>
						
				
							<button type='button' id="projectNameDropdownHideButton"className="form-control" 
									style={Object.assign({}, this.props.buttonStyle, hideButtonStyle)}   >
									<i className='material-icons'>keyboard_arrow_down</i></button>

							<button type='button' className="form-control" style={Object.assign({}, this.props.buttonStyle, hideButtonStyle)}
									 id='clearInputProjectNameButton' onClick={this.handleClearProjectNameInput}>
								<i className='material-icons'>clear</i></button>
				
						<div className="dropdown-menu" aria-labelledby="projectNameSearch" style={dropdownStyle}>
						{	

							projectNames.map( 
								projectName=> <button key={projectName.project_id} className="d-block"  className="dropdown-item" type="button"
								data-project_name= {projectName.project_name} data-project_id={projectName.project_id}onClick={this.handleSelectedOption} style={dropdownItemStyle}>{projectName.project_name}</button>
								)

								
						}
						</div>
					
				</div>);
	}
}

export default ProjectNameInput;

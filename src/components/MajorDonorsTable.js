import React from "react";



class MajorDonorsTable extends React.Component{
	constructor(props){
		super(props);
		this.state={
		
			currButtonNumber:1, //stores the current button number
			tableLength:4,  //number of rows in the table
		
		}
		this.changeTableRows=this.changeTableRows.bind(this)
	}



		changeTableRows(buttonNumber, e){
		
		
			 this.setState({
	             currButtonNumber: buttonNumber,
	             
	        });
			

		}



		render(){
			const{currButtonNumber, tableLength}=this.state;
		
			return (<div >
							<CreateDonorTable pageNo={currButtonNumber} countryName={this.props.countryName}  unitName={this.props.unitName} projectTitle={this.props.projectTitle} 
                                    ongoingClosedValue={this.props.ongoingClosedValue}  donorName={this.props.donorName}/>
							<CreateButtons  tableLength={tableLength} changeTableRows={this.changeTableRows} countryName={this.props.countryName}  unitName={this.props.unitName} projectTitle={this.props.projectTitle} 
                                    ongoingClosedValue={this.props.ongoingClosedValue}  donorName={this.props.donorName}/>
						</div>
						)
			
		}

	}

	class CreateDonorTable extends React.Component{
		constructor(props){
			super(props);
			this.state={
				tableData:[]
			}

			this.mouseoverRow=this.mouseoverRow.bind(this)

		}

		componentDidMount(){
			this.ajax=window.$.ajax({
				type:"GET",
				url:"http://localhost/projects_hub/proj_hub/public/donor_chart/get_donors_table.php",
				data:{pageNo:this.props.pageNo, countryName: this.props.countryName, unitName: this.props.unitName, ongoingClosedValue:this.props.ongoingClosedValue,
				 donorName: this.props.donorName, projectTitle: this.props.projectTitle},
				success: function(response){
		        
		        let chartData=JSON.parse(response);
		        
		         getData(chartData)


		        	
		        
		        
		            }
		          });
		     
		     let  getData = data =>{

		     

		     		
		          this.setState({
		             tableData: data,
		             
		        });
		        
		         
		         
		      }
		}

		componentDidUpdate(prevProps){
			if(this.props.pageNo !== prevProps.pageNo || this.props.countryName!==prevProps.countryName
               ||  prevProps.unitName!==this.props.unitName || prevProps.ongoingClosedValue!==this.props.ongoingClosedValue 
               || prevProps.donorName!==this.props.donorName || prevProps.projectTitle!==this.props.projectTitle ){
				this.ajax=window.$.ajax({
				type:"GET",
				url:"http://localhost/projects_hub/proj_hub/public/donor_chart/get_donors_table.php",
				data:{pageNo:this.props.pageNo, countryName: this.props.countryName, unitName: this.props.unitName, ongoingClosedValue:this.props.ongoingClosedValue,
				 donorName: this.props.donorName, projectTitle: this.props.projectTitle},
				success: function(response){
		        
		        let chartData=JSON.parse(response);
		        
		         getData(chartData)


		        	
		        
		        
		            }
		          });
		     
		     let  getData = data =>{

		     

		     		
		          this.setState({
		             tableData: data,
		             
		        });
		        
		         
		         
		      }
			}

		}

		mouseoverRow(rowId, e){
		
			let rowNumber=rowId.split("X")[0]
		
			let circleId=rowNumber+"XdId"
			//window.$( "#"+circleId).trigger( "mouseover" );
			//let circle=window.$( "#"+circleId)
			//console.log(d3.select(circle))
		}

		
		componentWillUnmount(){
			this.ajax.abort()
		}

		render(){
	
			return (<div>
						<table className="table table-hover">
							<thead>
								<tr><th>Number of Projects</th><th>Donor Name</th></tr>
							</thead>
							<tbody>
							{
								 this.state.tableData.map((row, index)=> {
								 	let rowId=row.id+"XtId"
									return(<tr key={index+"tr"} onMouseOver={this.mouseoverRow.bind(this, rowId)}>

												<td key={index+"td"}>{row.number} </td>
												<td key={index+"td2"}>{row.donorName} </td>
											</tr>)
									})
							}
							</tbody>	
						</table>
				
					</div>) 
		}

	}
	class CreateButtons extends React.Component{
		constructor(props){
			super(props);
			this.state={
				totalButtonsNumber: undefined, //the total number of buttons in the table
				firstButtonNumber:1, //the first button of the set
				buttonSetNumber:3, //number of buttons in a set
				numOfSets:undefined
			}
			this.changeTableRows=this.changeTableRows.bind(this)
			this.calculateNextSet=this.calculateNextSet.bind(this)	
			this.calculatePreviousSet=this.calculatePreviousSet.bind(this)
			this.makeButtonActive=this.makeButtonActive.bind(this)
			

		}



		componentDidMount(){
			this.ajax=window.$.ajax({
				type:"GET",
				url:"http://localhost/projects_hub/proj_hub/public/donor_chart/get_table_total_buttons.php",
				data:{tableLength:this.props.tableLength,  countryName: this.props.countryName, unitName: this.props.unitName, ongoingClosedValue:this.props.ongoingClosedValue,
				 donorName: this.props.donorName, projectTitle: this.props.projectTitle},//send the table length to find the number of buttons by  dividing the total table rows by it. 
				success: function(response){
		      
		        let totalButtonsNumber=JSON.parse(response);
		        
		         getData(totalButtonsNumber)


		            }
		          });
		     
		     let  getData = data =>{

		     		let totalButtonsNumber=Math.ceil(data) //use only round number

		     		
		          this.setState({
		  
		             totalButtonsNumber:totalButtonsNumber,
		            
		        });
		        
		          this.calculateNumOfSets(totalButtonsNumber);
		          
	      }


	     
		}

		componentDidUpdate(prevProps){
			if(this.props.countryName!==prevProps.countryName
               ||  prevProps.unitName!==this.props.unitName || prevProps.ongoingClosedValue!==this.props.ongoingClosedValue 
               || prevProps.donorName!==this.props.donorName || prevProps.projectTitle!==this.props.projectTitle){

				this.ajax=window.$.ajax({
				type:"GET",
				url:"http://localhost/projects_hub/proj_hub/public/donor_chart/get_table_total_buttons.php",
				data:{tableLength:this.props.tableLength,  countryName: this.props.countryName, unitName: this.props.unitName, ongoingClosedValue:this.props.ongoingClosedValue,
				 donorName: this.props.donorName, projectTitle: this.props.projectTitle},//send the table length to find the number of buttons by  dividing the total table rows by it. 
			success: function(response){
		      
		        let totalButtonsNumber=JSON.parse(response);
		        	
		         getData(totalButtonsNumber)


		            }
		          });
		     
		     let  getData = data =>{

		     		let totalButtonsNumber=Math.ceil(data) //use only round number

		     		
		          this.setState({
		  
		             totalButtonsNumber:totalButtonsNumber,
		            
		        });
		        
		          this.calculateNumOfSets(totalButtonsNumber);
		          
	      		}

			}
		}
		calculateNumOfSets(totalButtonsNumber){
			let buttons=[];
			let numOfSets=Math.ceil(totalButtonsNumber/this.state.buttonSetNumber);

		


			    this.setState({
		  
		             numOfSets:numOfSets 
		            
		        });
		}
		calculateNextSet(){
			//add the setNumber and the first button number to find the first button number of the next set
			let firstButtonNumber=Math.abs(this.state.buttonSetNumber+this.state.firstButtonNumber)


			if(firstButtonNumber< this.state.totalButtonsNumber){
				
					this.setState({
						firstButtonNumber:firstButtonNumber
					})
			
			}
			if(firstButtonNumber=== this.state.totalButtonsNumber){
				this.setState({
						firstButtonNumber:firstButtonNumber
					})
			}
			this.changeTableRows(firstButtonNumber) //change table data
		}
		calculatePreviousSet(){
			//caluclate the previos set by subtracting the set number from the first button to get the prev first button number
			//make sure that buttonset number 
				let firstButtonNumber=Math.abs(this.state.buttonSetNumber-this.state.firstButtonNumber);
			if(firstButtonNumber< this.state.firstButtonNumber){
			
					this.setState({
						firstButtonNumber:firstButtonNumber
					})
			
			}

			this.changeTableRows(firstButtonNumber) //change the table data

		}

		//calculate the number of button in a page
		calculateButtons(){
			
			let buttons=[];
			const{buttonSetNumber, firstButtonNumber, totalButtonsNumber}=this.state;

			let lastButtonNumber=(firstButtonNumber+buttonSetNumber-1);//calculates the last button number in a set
			
			//the start the counter at the firstButtonNumber. 
			//the loop should loop buttonSetNumber times. Starting from the firstButtonNumber

			//t 
				if(lastButtonNumber< totalButtonsNumber || lastButtonNumber===totalButtonsNumber){

					for(let i=firstButtonNumber; i<(buttonSetNumber+firstButtonNumber); i++){
						let buttonNumber=i;

						//when the first button is appended,  make sure the button is active
						if(buttonNumber===firstButtonNumber){
							buttons.push(<button type="button" key={i} className="btn btn-outline-info active" onClick={this.makeButtonActive.bind(this, buttonNumber)} >{buttonNumber}</button>);
							
						}
						else{
							buttons.push(<button type="button" key={i} className="btn btn-outline-info" onClick={this.makeButtonActive.bind(this, buttonNumber)} >{buttonNumber}</button>);

						}

					}
				}
				//covers the displaying of the last button
				if(lastButtonNumber> totalButtonsNumber){
					for(let i=firstButtonNumber; i<(totalButtonsNumber+1); i++){
						
							let buttonNumber=i;
					//when the first button is appended,  make sure the button is active
						if(buttonNumber===firstButtonNumber){
							buttons.push(<button type="button" key={i} className="btn btn-outline-info active" onClick={this.makeButtonActive.bind(this, buttonNumber)} >{buttonNumber}</button>);
							
						}
						else{
							buttons.push(<button type="button" key={i} className="btn btn-outline-info" onClick={this.makeButtonActive.bind(this, buttonNumber)} >{buttonNumber}</button>);

						}
					}
				
					
				}

		
			return buttons;

			}
		
		makeButtonActive(buttonNumber, e){


			//if the any of the other buttons have an active, remove the active from them
			if(window.$(e.target).parent().children().hasClass("active")){
				window.$(e.target).parent().children().removeClass("active");	
				this.makeButtonActive(buttonNumber, e)
			}
			//if none have the active class, change the table rows(the data in the table). Also make the button clicked active
			else{
				window.$(e.target).addClass("active")
				this.changeTableRows(buttonNumber)
			}
		}

			
		changeTableRows(buttonNumber){
		
		
			this.props.changeTableRows(buttonNumber); //change the table data


		

		}

		
		componentWillUnmount(){
			this.ajax.abort()
		}
	

		render(){
			
		
			const buttons=this.calculateButtons();
			const {numOfSets, firstButtonNumber, buttonSetNumber, totalButtonsNumber}=this.state;
			return (
					<div className="d-flex justify-content-center" >
						<div className="btn-group">
							{firstButtonNumber>1 ? <button type="button" className="btn btn-outline-info" onClick={this.calculatePreviousSet}>Previous</button> : false }
							{buttons}
							{(numOfSets>1 && ((buttonSetNumber+firstButtonNumber)< totalButtonsNumber|| (buttonSetNumber+firstButtonNumber)=== totalButtonsNumber) )? 
								<button type="button" className="btn btn-outline-info"  onClick={this.calculateNextSet}>Next</button> : false }
						</div>				
					</div>
					) 
		}

	}


export default MajorDonorsTable;
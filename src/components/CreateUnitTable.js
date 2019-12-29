import React from "react";
import * as d3 from "d3";



	class CreateUnitTable extends React.Component{
		constructor(props){
			super(props);
			this.state={
				tableData:[]
			}

		}

		componentDidMount(){
			this.ajax=window.$.ajax({
				type:"GET",
				url:"http://localhost/projects_hub/proj_hub/public/unit_charts/get_unit_projects.php",
				data:{countryName: this.props.countryName, unitName: this.props.unitName, ongoingClosedValue:this.props.ongoingClosedValue,
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
			if(this.props.countryName!==prevProps.countryName
               ||  prevProps.unitName!==this.props.unitName || prevProps.ongoingClosedValue!==this.props.ongoingClosedValue 
               || prevProps.donorName!==this.props.donorName || prevProps.projectTitle!==this.props.projectTitle ){
				this.ajax=window.$.ajax({
						type:"GET",
						url:"http://localhost/projects_hub/proj_hub/public/unit_charts/get_unit_projects.php",
						data:{countryName: this.props.countryName, unitName: this.props.unitName, ongoingClosedValue:this.props.ongoingClosedValue,
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

		componentWillUnmount(){
		    this.ajax.abort()
		  }


	
		


		render(){
	
			return (<div>
						<table className="table table-hover">
							<thead>
								<tr><th>Total Projects</th><th>Unit Name</th><th>Ongoing Projects</th></tr>
							</thead>
							<tbody>
							{
								 this.state.tableData.map((row, index)=> {
								 
									return(<tr key={index+"tr"} >

												<td key={index+"td"}>{row.totalProjs} </td>
												<td key={index+"td2"}>{row.unitName} </td>
												<td key={index+"td3"}>{row.ongoingProjs} </td>

											</tr>)
									})
							}
							</tbody>	
						</table>
				
					</div>) 
		}

	}



export default CreateUnitTable;
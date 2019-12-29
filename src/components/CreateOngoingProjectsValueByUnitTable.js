import React from "react";
import * as d3 from "d3";
import * as numeral from 'numeral';


	class CreateOngoingProjectsValueByUnitTable extends React.Component{
		constructor(props){
			super(props);
			this.state={
				tableData:[]
			}

		}

		componentDidMount(){
			this.ajax=window.$.ajax({
				type:"GET",
				url:"http://localhost/projects_hub/proj_hub/public/value_charts/get_totalOngoingProjectsValue_by_unit.php",
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
               || prevProps.donorName!==this.props.donorName || prevProps.projectTitle!==this.props.projectTitle){
				this.ajax=window.$.ajax({
				type:"GET",
				url:"http://localhost/projects_hub/proj_hub/public/value_charts/get_totalOngoingProjectsValue_by_unit.php",
				data:{countryName: this.props.countryName, unitName: this.props.unitName, ongoingClosedValue:this.props.ongoingClosedValue,
				 		donorName: this.props.donorName, projectTitle: this.props.projectTitle},
				success: function(response){
		        //console.log(response)
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
								<tr><th>Unit Name</th><th>Ongoing Projects</th><th>Current Value in USD</th></tr>
							</thead>
							<tbody>
							{
								 this.state.tableData.map((row, index)=> {
								 
									return(<tr key={index+"tr"} >

												<td key={index+"td"}>{row.unitName} </td>
												<td key={index+"td2"}>{row.projCount} </td>
												<td key={index+"td3"}>{numeral(row.totalContribution).format('0,0')} </td> 

											</tr>)
									})
							}
							</tbody>	
						</table>
				
					</div>) 
		}

	}



export default CreateOngoingProjectsValueByUnitTable;
import React from "react";
import CreateBarChart from "./CreateBarChart.js"; //import the markers


class ProjectsPerUnitChart extends React.Component{
	constructor(props){
		super(props);
		this.state={
			chartData:[]
		}
	}


	componentDidMount(){
		this.ajax=window.$.ajax({
			type:"GET",
			url:"http://localhost/projects_hub/proj_hub/public/unit_charts/get_projects_per_unit_chart_home.php",
			data:{countryName: this.props.countryName, unitName: this.props.unitName, ongoingClosedValue:this.props.ongoingClosedValue,
				 donorName: this.props.donorName, projectTitle: this.props.projectTitle},
			success: function(response){


	        let chartData=JSON.parse(response);
	        
	         getData(chartData)


	        	
	        
	        
	            }
	          });
	     
	     let  getData = data =>{




	          this.setState({
	             chartData: data
	        });
	        

	      }
		}

			componentDidUpdate(prevProps){

			if(this.props.countryName!==prevProps.countryName
               ||  prevProps.unitName!==this.props.unitName || prevProps.ongoingClosedValue!==this.props.ongoingClosedValue 
               || prevProps.donorName!==this.props.donorName || prevProps.projectTitle!==this.props.projectTitle ){
				this.ajax=window.$.ajax({
				type:"GET",
				url:"http://localhost/projects_hub/proj_hub/public/unit_charts/get_projects_per_unit_chart_home.php",
				data:{countryName: this.props.countryName, unitName: this.props.unitName, ongoingClosedValue:this.props.ongoingClosedValue,
				 donorName: this.props.donorName, projectTitle: this.props.projectTitle},
				success: function(response){


		        let chartData=JSON.parse(response);
		        
		         getData(chartData)


		        	
		        
		        
		            }
		          });
		     
		     let  getData = data =>{




		          this.setState({
		             chartData: data
		        });
		        

		      }
			}
		
		}

		componentWillUnmount(){
			this.ajax.abort()
		}


		render(){
			const{chartData}=this.state;
			return <CreateBarChart chartData={chartData} handleDisplayProjectPage={this.props.handleDisplayProjectPage} headingId={this.props.headingId}/>
		}

	}


export default ProjectsPerUnitChart;
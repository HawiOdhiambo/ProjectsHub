
import React from "react";
import * as d3 from "d3";


class OngoingProjectsPerUnitChart extends React.Component{
	constructor(props){
		super(props);
		this.state={
			chartData:[]
		}
	}


	componentDidMount(){
		this.ajax=window.$.ajax({
			type:"GET",
			url:"http://localhost/projects_hub/proj_hub/public/unit_charts/get_ongoing_projects.php",
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
					url:"http://localhost/projects_hub/proj_hub/public/unit_charts/get_ongoing_projects.php",
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
			return <CreateDonotChart chartData={chartData} handleDisplayProjectPage={this.props.handleDisplayProjectPage} headingId={this.props.headingId}/>
		}

	}
	class CreateDonotChart extends React.Component{
		constructor(props){
			super(props);
			this.onResizeCanvas=this.onResizeCanvas.bind(this)
		}

		componentDidMount(){
			window.addEventListener("resize", this.onResizeCanvas)
		}

		componentDidUpdate(prevProps){
			if(this.props.chartData!==prevProps.chartData){

				let node=document.getElementById("ongoingProjectsPerUnitCanvas");
				while(node.hasChildNodes()){
					node.removeChild(node.firstChild)
				}
				if(!node.hasChildNodes()){
					this.drawData(this.props.chartData)

				}
				
			}
		}
		drawData(data){

			const windowCanvasWidth=window.$("#ongoingProjectsPerUnitCanvas").width();

			//const margin = {top: 50, right: (0.02*windowCanvasWidth), bottom: 50, left: (0.2*windowCanvasWidth)}
			const canvasHeight = windowCanvasWidth//500-margin.top - margin.bottom;
			const canvasWidth = windowCanvasWidth//-margin.left - margin.right; //use jquery to calculate the canvasWidth. Doing this makes the width responsive
			
			const radius = Math.min(canvasWidth, canvasHeight) / 2;
		

			//d3.select('#ongoingProjectsPerUnitCanvas').style("background", "whitesmoke");

		const  mouseover = function(d) {
			
			//make sure all the popups are closed
			document.querySelectorAll(".popover").forEach(function(node){
				window.$(node).popover('hide');
			})
			window.$(d3.event.target).popover('show');

			d3.select(d3.event.target)
				.attr("stroke", "#D3D3D3")
					.style("stroke-width", 2)
					.style("cursor","pointer")
					.style("transform", "scale(1.05)")

	  }	


		 		//when mouse is out 
	const  mouseout = function(d) {
								

				
		document.addEventListener("click", click)
			
			
				
	    d3.select(d3.event.target)
			.attr("stroke", "none")
				.style("transform", "scale(1)")				
		 }

		
	  const click= function(e){
		

		document.querySelectorAll(".popover").forEach(	function(node){
		
	  			//if the popover is targeted and it contains the proj title, hide the popover and display the homepageProjPage
	  		if((node.contains(e.target)) &&(window.$(e.target).hasClass("projTitle")) ){
				
	  				window.$(node).popover('hide');
	  				 setTimeout(function(){

              			document.removeEventListener("click", click)
               			displayHomePageProjectPage(e.target)

		                  }, 200);

	
			 	}
		
			else{
			
				window.$(node).popover('hide');
				document.removeEventListener("click", click);
			
				}
  		
		
			
		  })
  
 
	  }	
  //redirect to ProjectPage
	const  displayHomePageProjectPage= (el)=>{
	
			let projTitle=window.$(el).attr("data-project-title")
			let p_id=window.$(el).attr("data-id")
			let canvasId=this.props.headingId;
			
				
			this.props.handleDisplayProjectPage(projTitle, p_id, canvasId)//lift state up

		}		   	 
				

				
			const svgCanvas = d3.select(this.refs.ongoingProjectsPerUnitCanvas).append("svg")
								.attr("width", windowCanvasWidth)//
								.attr("height", canvasHeight )//+ margin.top + margin.bottom
					
					svgCanvas.append("g")
							.attr("class", "slices")
						    .attr("transform", "translate("+(windowCanvasWidth/2)+","+(canvasHeight/2)+")")//brings it to the bottom 

						const pie = d3.pie()
									.sort(null)
									.value(function(d) {
										return d.number;
									});


						const arc = d3.arc()
										.outerRadius(radius * 0.8)
										.innerRadius(radius * 0.5);


						const slice = svgCanvas.select(".slices").selectAll("path")
											.data(pie(data));

									slice.enter()
										.append("path")
										.attr("class", function(d) {return d.data.unitName; })
										//.attr("class", "slice")
										.attr("d", arc)
										.attr("data-content", (d)=>"<p class='popoverClass'><strong>"+d.data.number+" project(s)</strong></p><ul>"
		     							 		+d.data.records.map((record)=>"<li> <p  class='btn btn-link projTitle' data-id='"+record.p_id+"' data-project-title='"+record.project_title+"'>"+record.project_title+"</p></li>").join("")+"</ul>")
											
										.attr("data-placement", (d, i)=>{if(d.endAngle<3 || d.index===0 ) { return "right";} else{ return "left";}})//uses radians. If the start angle is <180 degrees, place the popup to the right else to the left
					       				.attr("data-html", true)
					       				.attr("whiteList", ()=>{
												let myDefaultWhiteList = window.$.fn.tooltip.Constructor.Default.whiteList;
												myDefaultWhiteList.p=['data-id', 'data-project-title'];
											})
										.attr("data-container", "#ongoingProjectsPerUnitCanvas")
					       				.on("mouseover", mouseover) // What to do when hovered over
						    			.on("mouseout", mouseout) // What to do when hovered out
						    			

			const xScale =  d3.scaleBand()
						   	  .domain(data.map(function(d) { return d.unitName}))//maps the unit name to the unit name.
						   	  .range([0, windowCanvasWidth]) //uses this to calculate the width of the bar
						   	  .paddingInner(0.1) //padding



						svgCanvas.append("g")
									.attr("class", "legend")

					
					let legendGroup=svgCanvas.select(".legend")	
									.selectAll("rect")
									.data(data)
									.enter()
									.append("g")
						   		 	.attr("transform", "translate("+0+","+radius*0.1+")")//brings it to the bottom 

								
										


										legendGroup.append("rect")
										.attr("width", 10)
										.attr("height", 10)
										.attr("class", (d)=>{return d.unitName})
										.attr("x", (d)=>{return xScale(d.unitName)})

						legendGroup.append("text").text((d)=>{return d.unitName}).attr("x", (d)=>{return xScale(d.unitName)+15}).attr("y", 10)
			}

		onResizeCanvas(){
			let node=document.getElementById("ongoingProjectsPerUnitCanvas"); //select the projPerUnitCanvas
			//check if the  node has children, if it does, remove the children
			while(node.hasChildNodes()){
				node.removeChild(node.firstChild)
			}
			if(!node.hasChildNodes()){
				this.drawData(this.props.chartData)
			}
			else{
				this.onResizeprojPerUnitCanvas(); //if the node still children, rerun the function. To prevent replication of the chart.
			}
			
		}
		componentWillUnmount(){
          window.removeEventListener("resize", this.onResizeCanvas)
        }
				

		render(){

			return (<div>
					
					<div id="ongoingProjectsPerUnitCanvas" ref="ongoingProjectsPerUnitCanvas" ></div> 
					
				</div>) 
		}

	}


export default OngoingProjectsPerUnitChart;
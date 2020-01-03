import React from "react";
import * as d3 from "d3";
import {unitColor}from "./unit_colors.js"; //import the markers

class MajorDonorsChart extends React.Component{
	constructor(props){
		super(props);
		this.state={
			chartData:[]
		}
	}


	componentDidMount(){
		this.ajax=window.$.ajax({
			type:"GET",
			url:"http://localhost/projects_hub/proj_hub/public/donor_chart/get_all_donors.php",
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
			url:"http://localhost/projects_hub/proj_hub/public/donor_chart/get_all_donors.php",
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
			return <CreateDonotChart chartData={chartData} donorCirclesRange={this.props.donorCirclesRange} 
					handleDisplayProjectPage={this.props.handleDisplayProjectPage} headingId={this.props.headingId}/>
		}

	}
	class CreateDonotChart extends React.Component{
		constructor(props){
			super(props);
			this.onResizeCanvas=this.onResizeCanvas.bind(this)
			
			this.simulation = d3.forceSimulation();
		}
		
		componentDidMount(){
			window.addEventListener("resize", this.onResizeCanvas)
		}

		componentDidUpdate(prevProps){


			if(this.props.chartData!==prevProps.chartData || prevProps.donorCirclesRange!==this.props.donorCirclesRange){

				let node=document.getElementById("MajorDonorsCanvas");
				
				while(node.hasChildNodes()){
					node.removeChild(node.firstChild)
				}
				if(!node.hasChildNodes()){
					
					this.drawData(this.props.chartData, prevProps)

				}
				
			}
		}

		drawData(data){

			const windowCanvasWidth=window.$("#MajorDonorsCanvas").width();

			const margin = {top: 50, right: (0.02*windowCanvasWidth), bottom: 50, left: (0.2*windowCanvasWidth)}
			const canvasHeight = 500-margin.top - margin.bottom;
			const canvasWidth = window.$("#MajorDonorsCanvas").width()-margin.left - margin.right; //use jquery to calculate the canvasWidth. Doing this makes the width responsive
			
			d3.select('#MajorDonorsCanvas').style("background", "whitesmoke");


			const size = d3.scaleLinear()
						   	 .domain([0, (d3.max(data, function(d) { return d.number; }))]) //calculate the greatest number in the dataset.
						     .range(this.props.donorCirclesRange)//circle radius

			/*const color =  d3.scaleOrdinal()
						   	  .domain(data.map(function(d) { return d.donorName}))//maps the unit name to the unit name.
						   	  .range(d3.schemePaired) //uses this to calculate the width of the bar
						   	 
			*/

			
			
			const svgCanvas = d3.select(this.refs.MajorDonorsCanvas).append("svg")
								.attr("width", canvasWidth + margin.left + margin.right)//
								.attr("height", canvasHeight )//+ margin.top + margin.bottom



			const definitions=svgCanvas.append("defs") //create the definitions for the linear gradients

			

		const  mouseover = function(d) {
			
			//make sure all the popups are closed
			document.querySelectorAll(".popover").forEach(function(node){
				window.$(node).popover('hide');
			})
			window.$(d3.event.target).popover('show');
			
					d3.select(d3.event.target)
						.attr("stroke", "#D3D3D3")
      					.style("stroke-width", 2)
      					.style("cursor","webkit-grab")
      					.style("cursor","grab")
      					

					
						let radius=d3.select(d3.event.target).attr("r")
      				d3.select(d3.event.target)
      					.attr("r", +radius+20)
      			
      				window.$(d3.event.target).parent().append(d3.event.target)


	  }	



				  		 		//when mouse is out 
	const  mouseout = function(d) {
								

				
		document.addEventListener("click", click)
			
			
				
	    d3.select(d3.event.target)
						.attr("stroke", "none")
      					.style("fill-opacity", 1)

      				let radius=d3.select(d3.event.target).attr("r")
      				d3.select(d3.event.target)
      					.attr("r", +radius-20)				
		 }

		
	  const click= function(e){
		

		document.querySelectorAll(".popover").forEach(	function(node){
		
	  			//if the popover is targeted and it contains the proj title, hide the popover and display the homepageProjPage
	  		if((node.contains(e.target)) &&(window.$(e.target).hasClass("projTitle"))){
				
	  				document.querySelectorAll(".popover").forEach(function(node){
									window.$(node).popover('hide');
								})


	  				 setTimeout(function(){

	  				 		
						  	document.querySelectorAll(".popover").forEach(function(node){
									window.$(node).popover('hide');
								})
			 	

              
               			displayHomePageProjectPage(e.target)

		                  }, 200);

	
			 	}
		
			else{
			
				window.$(node).popover('hide');
				document.removeEventListener("click", click);
			
				}
  		
		
			
		  })
  
 
	  }	
  //redirect to HomePageProjectPage
	const  displayHomePageProjectPage= (el)=>{
	
			let projTitle=window.$(el).attr("data-project-title")
			let p_id=window.$(el).attr("data-id")
			let canvasId=this.props.headingId;
		
			this.props.handleDisplayProjectPage(projTitle, p_id, canvasId)//lift state up

		}	



		 // What happens when a circle is dragged?
			  const  dragstarted=(d)=> {
			
			    if (!d3.event.active) //this.simulation.alphaTarget(.03).restart();
			    d.fx = d.x;
			    d.fy = d.y;
			  }
			 const dragged=(d)=> {
			    d.fx = d3.event.x;
			    d.fy = d3.event.y;
			  }
			 const dragended=(d)=> {
			    if (!d3.event.active) //this.simulation.alphaTarget(.03);
			    d.fx = null;
			    d.fy = null;
			  }

			

		const svgGroup=svgCanvas.append("g")

		const node=svgGroup.selectAll("circle")
						    .data(data)
						   
					node.exit().remove();

					
				const circles=node.enter()
						    .append("circle")
					        .attr("r", function(d){ return size(d.number)})
					        .attr("cx", canvasWidth / 2)
					        .attr("cy", canvasHeight / 2)
					        //.style("fill-opacity", 0.7)
			
					        .attr("data-content", (d)=>"<div class='popoverClass'><strong><p class=' text-center mr-3'>"+d.donorName+"</p><p class='text-center ml-3'>"+d.number+" project(s)</p></strong></div> <ul>"
		      						+d.records.map((record)=>"<li> <p  class='btn btn-link projTitle "+record.unit+"_PopupProjTitle' data-id='"+record.p_id+"' data-project-title='"+record.project_title+"'>"+record.project_title+"</p></li>").join("")+"</ul>")
							.attr("data-placement","right")
							.attr("data-html", true)
							.attr("whiteList", ()=>{
								let myDefaultWhiteList = window.$.fn.tooltip.Constructor.Default.whiteList;
								myDefaultWhiteList.p=['data-id', 'data-project-title'];
							})
					        .attr("data-placement","right")
					        .attr("data-html", true)
					        .attr("id", function(d){return d.id+"XdId"}) //create an id using the donor id and XdId
					        .style("fill", function(d){ 
					      
					        	return unitColor(d.unitString, definitions);
					        })
					        .attr("data-container", "#MajorDonorsCanvas")
						    .on("mouseover", mouseover) // What to do when hovered
						    .on("mouseout", mouseout) // What to do when hovered out
						      .call(d3.drag() // call specific function when circle is dragged
						           .on("start", dragstarted)
						           .on("drag", dragged)
						           .on("end", dragended))
						      .merge(node)
				
							

				
				//Features of the forces applied to the nodes:
				 
							 this.simulation.force("center", d3.forceCenter().x(canvasWidth*0.66).y(canvasHeight*0.5)) // Attraction to the center of the svg area
								      .force("charge", d3.forceManyBody().strength(2)) // Nodes are attracted one each other of value is > 0
								      .force("collide", d3.forceCollide().strength(.2).radius(function(d){return (size(d.number)+3) }).iterations(1)) // Force that avoids circle overlapping
											
					  // Apply these forces to the nodes and update their positions.
					  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
							
							this.simulation.nodes(data).on("tick."+this.props.countryName , function(){
									
								        circles.attr("cx", function(d){ return d.x; })
								            .attr("cy", function(d){ return d.y; })
								      });
			     
			     
							 this.simulation.alphaTarget(0.3).restart()
					

			}

		

		onResizeCanvas(){
			let node=document.getElementById("MajorDonorsCanvas"); //select the projPerUnitCanvas
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
          this.simulation.stop()
        }
			

		render(){
		
			return (<div>
					
					<div id="MajorDonorsCanvas" ref="MajorDonorsCanvas" ></div> 
					
				</div>) 
		}

	}


export default MajorDonorsChart;
import React from "react";
import * as d3 from "d3"
import {unitColor}from "./unit_colors.js"; //import the markers
import * as numeral from 'numeral';


class ProjectValueAgainstStartYear extends React.Component{
	constructor(props){
		super(props);
		this.state={
			chartData:[]
		}
	}


	componentDidMount(){
		this.ajax=window.$.ajax({
			type:"GET",
			url:"http://localhost/projects_hub/proj_hub/public/value_charts/get_totalProjectValue_against_startYear.php",
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
               || prevProps.donorName!==this.props.donorName || prevProps.projectTitle!==this.props.projectTitle){
					this.ajax=window.$.ajax({
					type:"GET",
					url:"http://localhost/projects_hub/proj_hub/public/value_charts/get_totalProjectValue_against_startYear.php",
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
			return <CreateProjectValueAgainstStartYearChart chartData={chartData} handleDisplayProjectPage={this.props.handleDisplayProjectPage}/>
		}

	}

class CreateProjectValueAgainstStartYearChart extends React.Component{
	constructor(props){
		super(props);
	
		this.onResizeCanvas=this.onResizeCanvas.bind(this);
		this.drawData=this.drawData.bind(this)
	}

	componentDidMount(){
		window.addEventListener("resize", this.onResizeCanvas)
	}

	componentDidUpdate(prevProps){
		if(this.props.chartData!==prevProps.chartData){

			let node=document.getElementById("ProjectValueAgainstStartYearCanvas");
			while(node.hasChildNodes()){
				node.removeChild(node.firstChild)
			}
			if(!node.hasChildNodes()){
				this.drawData(this.props.chartData)

			}
			
		}
	}
	drawData(data){
		const windowCanvasWidth=window.$("#ProjectValueAgainstStartYearCanvas").width(); //use jquert to get the width

		const margin = {top: 20, right: (0.1*windowCanvasWidth), bottom: 40, left: (0.18*windowCanvasWidth)}
		const canvasHeight = 500-margin.top - margin.bottom;
		const canvasWidth = window.$("#ProjectValueAgainstStartYearCanvas").width()-margin.left - margin.right; //use jquery to calculate the canvasWidth. Doing this makes the width responsive
	


		const yScale = d3.scaleLinear()
					   	 .domain([0, (d3.max(data, function(d) { return d.totalContribution; })+500000)]) //calculate the greatest number in the dataset.
					     .range([canvasHeight, 0])//makes the scale start at the bottom not top 
			  

		const xScale =  d3.scaleTime()
					   	  .domain(d3.extent(data.map(function(d) { return d3.timeParse("%Y")(d.startYear)})))//maps the unit name to the unit name.
					   	  .range([0, canvasWidth]) //uses this to calculate the width of the bar
					   	  //.paddingInner(0.1) //padding between the bars
					    
		const zScale = d3.scaleLinear()
					   	  .domain(d3.extent(data.map(function(d) { return  d.projNumber;})))//maps the unit name to the unit name.
						  .range([8, 18]);
				     	
		
		const svgCanvas = d3.select(this.refs.ProjectValueAgainstStartYearCanvas).append("svg")
							.attr("width", canvasWidth + margin.left + margin.right)
							.attr("height", canvasHeight + margin.top + margin.bottom)
							.append("g")
						    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
							    //.style("border", "1px solid black")

	const  mouseover = function(d) {
			console.log(document.querySelectorAll(".popover"))
			//make sure all the popups are closed
			document.querySelectorAll(".popover").forEach(function(node){
				window.$(node).popover('hide');
			})
			window.$(d3.event.target).popover('show');

			d3.select(d3.event.target)
				.attr("stroke", "#D3D3D3")
					.style("stroke-width", 2)
					.style("cursor","webkit-grab")
					.style("cursor","pointer")

	  }	


		 		//when mouse is out 
	const  mouseout = function(d) {
								

				
		document.addEventListener("click", click)
			
			
				
	    d3.select(d3.event.target)
			.attr("stroke", "none")
				.style("fill-opacity", 1)				
		 }

		
	  const click= function(e){
		

		document.querySelectorAll(".popover").forEach(	function(node){
		
	  			//if the popover is targeted and it contains the proj title, hide the popover and display the homepageProjPage
	  		if((node.contains(e.target)) &&(window.$(e.target).hasClass("projTitle")) ){
				
	  				window.$(node).popover('hide');
	  				 setTimeout(function(){

              
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
			let canvasId="ProjectValueAgainstStartYearCanvas";
			
				
			this.props.handleDisplayProjectPage(projTitle, p_id, canvasId)//lift state up

		}									
	
	 		svgCanvas.append("g")
					 .call(d3.axisLeft(yScale).tickSize(-canvasWidth).ticks(6));//create the y-axis 

			svgCanvas.append("g")
					    .attr("transform", "translate(0," + canvasHeight + ")")//brings it to the bottom 
					    .call(d3.axisBottom(xScale)); //creates the scale


          svgCanvas.append("path")
			      .datum(data)
			      .attr("fill", "none")
			      .attr("stroke", "steelblue")
			      .attr("stroke-width", 1.5)
			      .attr("d", d3.line()
			        .x(function(d) { return xScale(d3.timeParse("%Y")(d.startYear)) })
			        .y(function(d) { return yScale(d.totalContribution) })
			        .curve(d3.curveMonotoneX) 
			        )

		  svgCanvas.append("g")
		      .selectAll("circle")
		      .data(data)
		      .enter()
		      .append("circle")
		      	.attr("data-content", (d)=>"<p class='popoverClass'><strong><span class='mr-3'>$"+numeral(d.totalContribution).format('0,0')+"</span>+<span class='ml-3'>"+d.projNumber+" project(s)</span></strong></p> <ul>"
		      		+d.records.map((record)=>"<li> <p  class='btn btn-link projTitle "+record.unit+"_PopupProjTitle' data-id='"+record.p_id+"' data-project-title='"+record.project_title+"'>"+record.project_title+"</p></li>").join("")+"</ul>")
				.attr("data-placement","right")
				.attr("data-html", true)
				.attr("whiteList", ()=>{
					let myDefaultWhiteList = window.$.fn.tooltip.Constructor.Default.whiteList;
					myDefaultWhiteList.p=['data-id', 'data-project-title'];
				})
				.attr("data-container", "#ProjectValueAgainstStartYearCanvas")
		        .attr("cx", function(d) { return xScale(d3.timeParse("%Y")(d.startYear)) } )
		        .attr("cy", function(d) { return yScale(d.totalContribution)  } )
		        .attr("r", (d)=>{return zScale(d.projNumber)})
		        .style("fill", function(d){ 
					      
					        	return unitColor(d.unitString, svgCanvas);
					        })
				.on("mouseover", mouseover) // What to do when hovered	    
				.on("mouseout", mouseout) // What to do when hovered out
				
    	svgCanvas.selectAll("text").attr("font-size", "0.7rem") //customizes the font of the bar chart	
    		
    		svgCanvas.append("text")
					 .attr("transform","translate("+((canvasWidth/2)-20)+","+(canvasHeight+margin.bottom)+")" )
					 .text("Start Year")
					 .style("font-weight","bold")
					 .style("font-size","1rem")

		
    		svgCanvas.append("text")
					 //.attr("transform","translate("+(0-margin.left)+","+(canvasHeight/2)+")" )
					 .attr("transform", "rotate(-90)")
					 .attr("x", 0-(canvasHeight/2)-100)
					 .attr("y",0-(margin.left/2))
					 
					 .text("Current Project Value in USD")
					 .style("font-weight","bold")
					 .style("font-size","1rem")
	}
	onResizeCanvas(){
		let node=document.getElementById("ProjectValueAgainstStartYearCanvas"); //select the projPerUnitCanvas
		//check if the  node has children, if it does, remove the children
		while(node.hasChildNodes()){
			node.removeChild(node.firstChild)
		}
		if(!node.hasChildNodes()){

			this.drawData(this.props.chartData)
		}
		else{
			this.onResizeCanvas(); //if the node still children, rerun the function. To prevent replication of the chart.
		}
		
	}

	

    componentWillUnmount(){
      window.removeEventListener("resize", this.onResizeCanvas)
    }


	render(){
		return (<div>
			<div id="ProjectValueAgainstStartYearCanvas" ref="ProjectValueAgainstStartYearCanvas" ></div> 
				

		</div>)
	}
}
export default ProjectValueAgainstStartYear;
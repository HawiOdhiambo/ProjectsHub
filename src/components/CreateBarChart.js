import React from "react";
import * as d3 from "d3";


class CreateBarChart extends React.Component{
	constructor(props){
		super(props);
		this.onResizeprojPerUnitCanvas=this.onResizeprojPerUnitCanvas.bind(this)
	}

	componentDidMount(){
		window.addEventListener("resize", this.onResizeprojPerUnitCanvas)
	}

	componentDidUpdate(prevProps){
		if(this.props.chartData!==prevProps.chartData){

			let node=document.getElementById("projPerUnitCanvas");
			while(node.hasChildNodes()){
				node.removeChild(node.firstChild)
			}
			if(!node.hasChildNodes()){
				this.drawData(this.props.chartData)

			}
			
		}
	}
	drawData(data){

		const windowprojPerUnitCanvasWidth=window.$("#projPerUnitCanvas").width(); //use jquert to get the width

		const margin = {top: 20, right: (0.02*windowprojPerUnitCanvasWidth), bottom: 40, left: (0.18*windowprojPerUnitCanvasWidth)}
		const projPerUnitCanvasHeight = 400-margin.top - margin.bottom;
		const projPerUnitCanvasWidth = window.$("#projPerUnitCanvas").width()-margin.left - margin.right; //use jquery to calculate the projPerUnitCanvasWidth. Doing this makes the width responsive
	


		const yScale = d3.scaleLinear()
					   	 .domain([0, (d3.max(data, function(d) { return d.number; })+5)]) //calculate the greatest number in the dataset.
					     .range([projPerUnitCanvasHeight, 0])//makes the scale start at the bottom not top 
			  

		const xScale =  d3.scaleBand()
					   	  .domain(data.map(function(d) { return d.unitName}))//maps the unit name to the unit name.
					   	  .range([0, projPerUnitCanvasWidth]) //uses this to calculate the width of the bar
					   	  .paddingInner(0.1) //padding between the bars
					    

		
		const svgprojPerUnitCanvas = d3.select(this.refs.projPerUnitCanvas).append("svg")
							.attr("width", projPerUnitCanvasWidth + margin.left + margin.right)
							.attr("height", projPerUnitCanvasHeight + margin.top + margin.bottom)
							.append("g")
						    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
							    //.style("border", "1px solid black")

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
	  		if((node.contains(e.target)) &&(window.$(e.target).hasClass("projTitle"))){
				
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
			let canvasId=this.props.headingId;
			
				
			this.props.handleDisplayProjectPage(projTitle, p_id, canvasId)//lift state up

		}		   	 
	

											
			svgprojPerUnitCanvas.append("g")
					 .call(d3.axisLeft(yScale).tickSize(-projPerUnitCanvasWidth).ticks(6));//create the y-axis 

			svgprojPerUnitCanvas.append("g")
					    .attr("transform", "translate(0," + projPerUnitCanvasHeight + ")")//brings it to the bottom 
					    .call(d3.axisBottom(xScale)); //creates the scale

			svgprojPerUnitCanvas.selectAll("rect")
				    	 .data(data).enter() 
				         .append("rect")
				         .attr("width",(datapoint) => xScale.bandwidth()) //use the xscale to determine the width
				         .attr("height", (datapoint) => projPerUnitCanvasHeight-yScale(datapoint.number)) //use this to invert the width
						 .attr("data-content", (d)=>"<p class='popoverClass'><strong>"+d.number+" project(s)</strong></p><ul>"
											 		+d.records.map((record)=>"<li> <p  class='btn btn-link projTitle' data-id='"+record.p_id+"' data-project-title='"+record.project_title+"'>"+record.project_title+"</p></li>").join("")+"</ul>")
									
				         .attr("data-placement",(d, i)=> {

				         	if(i===0){
				         		return "left";	
				         	}
				         	else{
				         		return "right";
				         	}
				         })
				         //.attr("data-placement", "top")
					     .attr("data-html", true)
					     .attr("whiteList", ()=>{

								let myDefaultWhiteList = window.$.fn.tooltip.Constructor.Default.whiteList;
								myDefaultWhiteList.p=['data-id', 'data-project-title'];
							})
			
					     .attr("data-container", "#projPerUnitCanvas")
				         .attr("class", (datapoint) => datapoint.unitName) //used to style the bar" fill
				         .attr("x", (datapoint, iteration) => xScale(datapoint.unitName)) //determine the x value to plot from
        				 .attr("y", (datapoint) => yScale(datapoint.number)) //determine the y value to plot from
        				 .on("mouseover", mouseover)
        				 .on("mouseout", mouseout)
        				 

					    
    	svgprojPerUnitCanvas.selectAll("text").attr("font-size", "0.7rem") //customizes the font of the bar chart	
    		
    		svgprojPerUnitCanvas.append("text")
					 .attr("transform","translate("+((projPerUnitCanvasWidth/2)-20)+","+(projPerUnitCanvasHeight+margin.bottom)+")" )
					 .text("Unit")
					 .style("font-weight","bold")
					 .style("font-size","1.1rem")

		
    		svgprojPerUnitCanvas.append("text")
					 //.attr("transform","translate("+(0-margin.left)+","+(projPerUnitCanvasHeight/2)+")" )
					 .attr("transform", "rotate(-90)")
					 .attr("x", 0-(projPerUnitCanvasHeight/2)-50)
					 .attr("y",0-(margin.left/2))
					 
					 .text("Project(s)")
					 .style("font-weight","bold")
					 .style("font-size","1.1rem")
	}


	onResizeprojPerUnitCanvas(){
		let node=document.getElementById("projPerUnitCanvas"); //select the projPerUnitCanvas
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
      window.removeEventListener("resize", this.onResizeprojPerUnitCanvas)
    }

	render(){
		const h4Style={
			//width:"60%",
			textAlign:"center"
		}
		return (<div>
				
				<div id="projPerUnitCanvas" ref="projPerUnitCanvas" ></div> 
				
			</div>) 
	}

}
export default CreateBarChart;
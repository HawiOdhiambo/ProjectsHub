import React from "react";
import * as d3 from "d3"
import {unitColor}from "./unit_colors.js"; //import the unit gradient colors
import * as numeral from 'numeral';


class ProjectsPerGroupChart extends React.Component{
	constructor(props){
		super(props);
		this.state={
			chartData:[]
		}
	}


	componentDidMount(){
		this.ajax=window.$.ajax({
			type:"GET",
			url:"http://localhost/projects_hub/proj_hub/public/unit_charts/get_unit_projects_by_group.php",
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
					url:"http://localhost/projects_hub/proj_hub/public/unit_charts/get_unit_projects_by_group.php",
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
			return <CreateProjectsPerGroupChart chartData={chartData} handleDisplayProjectPage={this.props.handleDisplayProjectPage}/>
		}

	}

	class CreateProjectsPerGroupChart extends React.Component{
	constructor(props){
		super(props);
		this.onResizeCanvas=this.onResizeCanvas.bind(this)
	}

	componentDidMount(){
		window.addEventListener("resize", this.onResizeCanvas)
	}

	componentDidUpdate(prevProps){
		if(this.props.chartData!==prevProps.chartData){

			let node=document.getElementById("projPerGroupCanvas");
			while(node.hasChildNodes()){
				node.removeChild(node.firstChild)
			}
			if(!node.hasChildNodes()){
				this.drawData(this.props.chartData)

			}
			
		}
	}
	drawData(data){

		const windowCanvasWidth=window.$("#projPerGroupCanvas").width(); //use jquery to get the width
		let margin = {top: 20, right: (0.09*windowCanvasWidth), bottom: 60, left: (0.15*windowCanvasWidth) }//(0.18*windowCanvasWidth
		const chartA_X_translation=(windowCanvasWidth/2)+margin.right;

		
		

		
		const canvasHeight = 400-margin.top - margin.bottom;
		const canvasWidth = (windowCanvasWidth/2)-margin.right-margin.left; //use jquery to calculate the projPerUnitCanvasWidth. Doing this makes the width responsive
		
		const UN_GroupA=function(groupName){
				if(groupName==="African Group"){
	   	  			return "African Group";
	   	  		}
	   	  		if(groupName==="Asia and the Pacific Group"){
	   	  			return "Asia-Pacific Group";
	   	  		}
	   	  		if(groupName==="Eastern European Group"){
	   	  			return "Eastern European Group";
	   	  		}
	   	  		if(groupName==="Latin America and Caribbean Group"){
	   	  			return "L. America & Caribbean Group";
	   	  		}
	   	  		if(groupName==="Western European and Others Group"){
	   	  			return "W. European & Others Group";
	   	  		}
	   	  		if(groupName==="none"){
	   	  			return "none";
	   	  		}
		}

		const UN_GroupB=function(groupName){
			if(groupName==="African Group"){
   	  			return "African ";
   	  		}
   	  		if(groupName==="Asia and the Pacific Group"){
   	  			return "Asia-Pacific";
   	  		}
   	  		if(groupName==="Eastern European Group"){
   	  			return "E. European";
   	  		}
   	  		if(groupName==="Latin America and Caribbean Group"){
   	  			return "GRULAC";
   	  		}
   	  		if(groupName==="Western European and Others Group"){
   	  			return "WEOG";
   	  		}
   	  		if(groupName==="none"){
   	  			return "none";
   	  		}
		}

		//define the scales
		const xScale = d3.scaleLinear()
					   	 .domain([0, (d3.max(data, function(d) { return d.projectNumber; })+3)]) //calculate the greatest number in the dataset.
					     .range([0, canvasWidth])//makes the scale start at the bottom not top 
			  

		const yScale =  d3.scaleBand()
					   	  .domain(data.map(function(d) { 
					   	  		if(chartA_X_translation<640 && chartA_X_translation>480){
					   	  			return UN_GroupA(d.un_group)
					   	  		}
					   	  		if(chartA_X_translation<480){
					   	  			return UN_GroupB(d.un_group)
					   	  		}
					   	  		else{
									 return d.un_group;
					   	  		}


					   	 		}))//maps the unit name to the unit name.
					   	  .range([0, canvasHeight]) //uses this to calculate the width of the bar
					   	  .paddingInner(0.1) //padding between the bars

			const  mouseover = function(d) {
			
			//make sure all the popups are closed
			document.querySelectorAll(".popover").forEach(function(node){
				window.$(node).popover('hide');
			})
			

			d3.select(d3.event.target)
				.attr("stroke", "#D3D3D3")
					.style("stroke-width", 4)
					.style("cursor","pointer")
					

			window.$(d3.event.target).popover('show');

	  }	


		 		//when mouse is out 
	const  mouseout = function(d) {
								

				
		document.addEventListener("click", click)
			
			
				
	    d3.select(d3.event.target)
			.attr("stroke", "none")
								
		 }

		
	  const click= function(e){
		

		document.querySelectorAll(".popover").forEach(	function(node){
		
	  			//if the popover is targeted and it contains the proj title, hide the popover and display the homepageProjPage
	  		if((node.contains(e.target)) &&(e.target.getAttribute("class").includes("projTitle")) ){
				
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
  //redirect to HomePageProjectPage
	const  displayHomePageProjectPage= (el)=>{
	
			let projTitle=window.$(el).attr("data-project-title")
			let p_id=window.$(el).attr("data-id")
			let canvasId="projPerGroupCanvas";
			
				
			this.props.handleDisplayProjectPage(projTitle, p_id, canvasId)//lift state up

		}		   	 
				    
					   	 
		//define the canvas
		const svgCanvas = d3.select(this.refs.projPerGroupCanvas).append("svg")
							.attr("width", windowCanvasWidth)
							.attr("height", canvasHeight + margin.top + margin.bottom)


		const chartA=svgCanvas.append("g")
					 .attr("transform", "translate(" +chartA_X_translation + "," + margin.top + ")");

		
							    //.style("border", "1px solid black")


		
											
		//attach the axes to the canvas
			chartA.append("g")
					 .call(d3.axisLeft(yScale));//create the y-axis 

			chartA.append("g")
					    .attr("transform", "translate(0," + canvasHeight + ")")//brings it to the bottom 
					    .call(d3.axisBottom(xScale).tickSize(-canvasHeight).ticks(4)); //creates the scale


		//attach the bars to the canvas
			chartA.selectAll("rect")
				    	 .data(data).enter() 
				         .append("rect")
				         .attr("width",(datapoint) => xScale(datapoint.projectNumber)) //use the xscale to determine the width
				         .attr("height", (datapoint) =>  yScale.bandwidth()) //use this to invert the width
				         .attr("data-html", true)
 				         .attr("data-content", (d)=>"<p class='popoverClass'><strong>"+d.projectNumber+" project(s)</strong></p><ul>"
					 		+d.records.map((record)=>"<li> <p  class='btn btn-link projTitle "+record.unit+"_PopupProjTitle' data-id='"+record.p_id+"' data-project-title='"+record.project_title+"'>"+record.project_title+"</p></li>").join("")+"</ul>")

				         .attr("data-placement","right")
				         .attr("data-container", "#projPerGroupCanvas")
				          .style("fill", function(d){ 
					      
					        	return unitColor(d.unitString, svgCanvas);
					        })
				         //.attr("x", (datapoint, iteration) => xScale(datapoint.projectNumber)) //determine the x value to plot from
        				 .attr("y", (datapoint) =>{

        				 	if(chartA_X_translation<640 && chartA_X_translation>480){
  
          				 		let groupName=UN_GroupA(datapoint.un_group)
  									return yScale(groupName)
        				 	}
        				 	if(chartA_X_translation<480){
        				 		let groupName=UN_GroupB(datapoint.un_group)
					   	  			return yScale(groupName)
					   	  	}
					   	  		
        				 	else{
        				 		return yScale(datapoint.un_group)
        				 	}
        				 	

        				 	
        				 }) //determine the y value to plot from
        				 .on("mouseover", mouseover)
        				 .on("mouseout", mouseout)

					    
    	svgCanvas.selectAll("text").attr("font-size", "0.7rem") //customizes the font of the bar chart	
    		
    		chartA.append("text")
					 .attr("transform","translate("+((canvasWidth/2)-20)+","+(canvasHeight+margin.bottom-20)+")" )
					 .text("Number of Project(s)")
					 .style("font-weight","bold")
					 .style("font-size","1.1rem")


/*---------------------------------------CHART B-----------------------------------------------------------------*/

		const barWidthB=canvasWidth;
	
		const xScaleB = d3.scaleLinear()
					   	 .domain([0, (d3.max(data, function(d) { return d.totalContribution; })+10000000)]) //calculate the greatest number in the dataset.
					     .range([barWidthB, 0])//makes the scale start at the bottom not top 
			  


		const chartB=svgCanvas.append("g")
					 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



		//add the xAxis
		//for improved user experience vary the number of ticks in the x-axis 
				if(chartA_X_translation<400){

        				 chartB.append("g")
					    .attr("transform", "translate(0," + canvasHeight + ")")//brings it to the bottom 
					    .call(d3.axisBottom(xScaleB).tickSize(-canvasHeight).ticks(2)); //creates the scale

					}else{
						 chartB.append("g")
					    .attr("transform", "translate(0," + canvasHeight + ")")//brings it to the bottom 
					    .call(d3.axisBottom(xScaleB).tickSize(-canvasHeight).ticks(4)); //creates the scale
					}
					   	  	
				
			//add the yaxis		    
				chartB.append("g")
					 .attr("class", "yaxisChartB")
					 .attr("transform", "translate("+barWidthB+", 0)")//brings it to the right 
					 .call(d3.axisRight(yScale));//create the y-axis 

				chartB.select(".yaxisChartB").selectAll("text").attr("display", "none")//hide the text labels

					chartB.selectAll("rect")
				    	 .data(data).enter() 
				         .append("rect")
				         .attr("width",(datapoint) => barWidthB-xScaleB(datapoint.totalContribution)) //use the xscale to determine the width
				         .attr("height", (datapoint) =>  yScale.bandwidth()) //use this to invert the width
				         .attr("data-content", (datapoint)=> "$"+numeral(datapoint.totalContribution).format('0,0'))
				         .attr("data-placement","left")
				         .attr("data-container", "#projPerGroupCanvas")
				          .style("fill", function(d){ 
					      
					        	return unitColor(d.unitString, svgCanvas);
					        })
				         .attr("x", (datapoint, iteration) => xScaleB(datapoint.totalContribution)) //determine the x value to plot from
        				// .attr("y", (datapoint) => yScale(datapoint.un_group)) //determine the y value to plot from
        				 .attr("y", (datapoint) =>{

        				 	if(chartA_X_translation<640 && chartA_X_translation>480){
  
          				 		let groupName=UN_GroupA(datapoint.un_group)
  									return yScale(groupName)
        				 	}
        				 	if(chartA_X_translation<480){
        				 		let groupName=UN_GroupB(datapoint.un_group)
					   	  			return yScale(groupName)
					   	  	}
					   	  		
        				 	else{
        				 		return yScale(datapoint.un_group)
        				 	}
        				 	

        				 	
        				 }) //determine the y value to plot from	 

        				 .on("mouseover", this.onMouseOverBar)
        				 .on("mouseout", this.onMouseOutBar)

				chartB.append("text")
					 .attr("transform","translate(0,"+(canvasHeight+margin.bottom-20)+")" )
					 .text("Value of Projects in USD")
					 .style("font-weight","bold")
					 .style("font-size","1.1rem")

				
	}


	onResizeCanvas(){
		let node=document.getElementById("projPerGroupCanvas"); //select the projPerUnitCanvas
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

	onMouseOverBar(datapoint){

	
         window.$(d3.event.target).popover('show');
         d3.select(d3.event.target)
				.attr("stroke", "#D3D3D3")
					.style("stroke-width", 4)
					.style("cursor","pointer")

     
	}

	onMouseOutBar(datapoint, iteration){

		window.$(d3.event.target).popover('hide');
		    d3.select(d3.event.target)
			.attr("stroke", "none")
	}

    componentWillUnmount(){
      window.removeEventListener("resize", this.onResizeCanvas)
    }

	render(){

		return (<div>
				
				<div id="projPerGroupCanvas" ref="projPerGroupCanvas" ></div> 
				<p className="mt-3" >Bar graph showing the ongoing projects in a UN regional group and the total value of those ongoing projects</p>
			</div>) 
	}

}



export default ProjectsPerGroupChart;
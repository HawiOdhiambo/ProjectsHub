import React from 'react';
import * as d3 from 'd3';
import * as numeral from 'numeral';

class OngoingProjectsValueByUnit extends React.Component{
	constructor(props){
		super(props);
		this.state={
			chartData:[]
		}
	}
	componentDidMount(){
		this.ajax=window.$.ajax({
			type: 'GET',
			url:"http://localhost/projects_hub/proj_hub/public/value_charts/get_ongoing_proj_value_by_unit.php",
			data:{countryName: this.props.countryName, unitName: this.props.unitName, ongoingClosedValue:this.props.ongoingClosedValue,
				 		donorName: this.props.donorName, projectTitle: this.props.projectTitle},
			success: function(response){
		
				let chartData=JSON.parse(response)
				getData(chartData)
			}


		})
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
			type: 'GET',
			url:"http://localhost/projects_hub/proj_hub/public/value_charts/get_ongoing_proj_value_by_unit.php",
			data:{countryName: this.props.countryName, unitName: this.props.unitName, ongoingClosedValue:this.props.ongoingClosedValue,
				 		donorName: this.props.donorName, projectTitle: this.props.projectTitle},
			success: function(response){
		
				let chartData=JSON.parse(response)
				getData(chartData)
			}


		})
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
		const {chartData}=this.state;
		return 	<CreateScatterChart chartData={chartData} handleDisplayProjectPage={this.props.handleDisplayProjectPage} headingId={this.props.headingId}/>
				
	}
}
class CreateScatterChart extends React.Component{
	constructor(props){
		super(props);
		this.onResizeCanvas=this.onResizeCanvas.bind(this)
	}
	componentDidMount(){
		window.addEventListener("resize", this.onResizeCanvas)
	}

	componentDidUpdate(prevProps){
		if(this.props.chartData!==prevProps.chartData){

			let node=document.getElementById("ongoingProjectsValueByUnitCanvas");
			while(node.hasChildNodes()){
				node.removeChild(node.firstChild)
			}
			if(!node.hasChildNodes()){
				this.drawData(this.props.chartData)

			}
			
		}
	}
	drawData(data){

		
		const windowCanvasWidth=window.$("#ongoingProjectsValueByUnitCanvas").width();
		const margin = {top: 20, right: (0.02*windowCanvasWidth), bottom: 40, left: (0.25*windowCanvasWidth)}
		const windowCanvasHeight= 500+margin.top + margin.bottom;
		const addionalY_DomainValue= 500000

		const canvasHeight = windowCanvasHeight-margin.top - margin.bottom;
		const canvasWidth = window.$("#ongoingProjectsValueByUnitCanvas").width()-margin.left - margin.right; //use jquery to calculate the projPerUnitCanvasWidth. Doing this makes the width responsive
	
		//define the yscale

		const maxY=d3.max(data, function(unitGroup) {
									return d3.max(unitGroup.contributionGroup, function(dp){
									
												return	 dp.contribution;
												})

								}) +addionalY_DomainValue

		const maxZ=d3.max(data, function(unitGroup) {
									return d3.max(unitGroup.contributionGroup, function(dp){
									
												return	 dp.total_duration_in_days;
												})

								}) 


		const minZ=d3.min(data, function(unitGroup) {
									return d3.min(unitGroup.contributionGroup, function(dp){
									
												return	 dp.total_duration_in_days;
												})

								}) 


		let yScale=d3.scaleLinear()
						.domain([ 0, maxY])
						.range([canvasHeight, 0]);

						
		//define the xScale
		const xScale=d3.scaleBand()
						.domain(data.map(function(d){return d.unitName}))
						.range([0, canvasWidth])

		//define the zScale
		const zScale=d3.scaleLinear()
						.domain([minZ, maxZ])
						.range([10, 30]);

			

		//define the svg canvas
		const svgCanvas=d3.select(this.refs.ongoingProjectsValueByUnitCanvas).append("svg")
						.attr("width", windowCanvasWidth)
						.attr("height", windowCanvasHeight)


		const chart=svgCanvas.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			
		const yAxis=chart.append("g")
						.call(d3.axisLeft(yScale))//.ticks(6) .tickSize(-canvasWidth)

		const xAxis=chart.append("g").attr("class", "ongoingProjectsValueByUnitXaxis")
							 .attr("transform", "translate(0," + canvasHeight + ")")//brings it to the bottom 
								 .call(d3.axisBottom(xScale).tickSize(-canvasHeight)); //creates the scale

		
		d3.select(".ongoingProjectsValueByUnitXaxis").selectAll("text").attr("dy", "1.7em")
			//when mouse is over a circle, show a popup
			const  mouseover = function(d) {
					//make sure all previous popups are closed
					document.querySelectorAll(".popover").forEach(function(node){
							window.$(node).popover('hide');
						})	

					d3.select(d3.event.target)
						.attr("stroke", "#D3D3D3")
      					.style("stroke-width", 2)
      					.style("cursor","webkit-grab")
      					.style("cursor","pointer")
      					

					
						let radius=d3.select(d3.event.target).attr("r")
      				d3.select(d3.event.target)
      					.attr("r", +radius+20)
      			
      				//window.$(d3.event.target).parent().append(d3.event.target)
      				window.$(d3.event.target).popover('show');
      				
      				
				    
				  }	

			//when mouse is out of the circle 
	const  mouseout = function(d) {

		//remove the styles						
	d3.select(d3.event.target)
						.attr("stroke", "none")
      					.style("fill-opacity", 1)

		let radius=d3.select(d3.event.target).attr("r")
		d3.select(d3.event.target)
			.attr("r", +radius-20)
					
		document.addEventListener("click", click)
			
		const target=d3.event.target;
			
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
			let canvasId=this.props.headingId;
			
				
			this.props.handleDisplayProjectPage(projTitle, p_id, canvasId)//lift state up

		}			  
	
			  let idleTimeout;
	
			   let zoom=false;

			//return the chart to original state after a few seconds
  			function idled() { 
  			
  				idleTimeout=clearTimeout(idleTimeout)
  				resetChart() //returns the data in the chart back to the default
  				zoom=false;
  				//applyForces(zoom)//applies the forces to the circles so they don't overlap
 
  					
  			}


  			//what happens when an area of the chart is selected
			const brushed=function(){
				
				 let extent = d3.event.selection;


					if(extent){
						
						idleTimeout=clearTimeout(idleTimeout)//makess sure any time out is cleared
				
						yScale.domain([ yScale.invert(extent[1][1]), yScale.invert(extent[0][1])]).range([canvasHeight, 0]) //use the selected area to create a new scale
				  		yAxis.transition().duration(1000).call(d3.axisLeft(yScale))
				  		
				 
				  		chart.selectAll("circle")
						      .transition().duration(1000)
				
						      .attr("cy", function(d) { 
							
									
									return yScale(d.contribution);
								
								 })

						      			
						      				

					     	  .style("visibility", function(d) { 
													
										if (yScale(d.contribution)>canvasHeight)
														      	{return "hidden"} else{return "visible"}
										
									
									 })


					       zoom=true;
					      
					       chart.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
					}
					else{
						

								if(!idleTimeout){

						 		idleTimeout=setTimeout(idled, 5000);

								}
						
					}
				
			}	

			const resetChart= function(){
				 	
						yScale.domain([ 0, maxY])

						yAxis.transition().duration(1000).call(d3.axisLeft(yScale))

						chart.selectAll("circle")
					      .transition().duration(1000)
					      
					      .attr("cy", function (d) { return yScale(d.contribution); } )
					      .style("visibility", function(d) { 
													
												if (yScale(d.contribution)>canvasHeight)
																      	{return "hidden"} else{return "visible"}
												
									
											 })

			}

			//add a brush
			let brush=d3.brush()
						.extent([[0, 0], [canvasWidth, canvasHeight]])
						.on("end", brushed)

			
					
				chart.append("g")
					      .attr("class", "brush")
					      .call(brush);

		
			data.forEach((datapoint)=>{
					
					let unitName=datapoint.unitName;

						chart.selectAll('circle.'+unitName)
						.data(datapoint.contributionGroup)
						.enter()
						.append('circle')
						.attr("cx", (d)=>{return xScale(unitName)+(xScale.bandwidth()/2)})


						  .attr("cy", function(d) { 
									
										return yScale(d.contribution);
									
								 })

						   .attr("r", function(d) { 

																					
										return zScale(d.total_duration_in_days);
								
								 })
						
						
						.attr("class", (d)=>{return unitName})
						.style("opacity", "0.7")
						.attr("data-content", (datapoint)=>"<div><p class='popoverClass'><strong><span class='mr-3'>$"+numeral(datapoint.contribution).format('0,0')+"</span>+<span class='ml-3'>"+datapoint.projCount+" project(s)</span></strong></p>"+
					    									datapoint.records.map((record)=>
					    									"<p class=' btn btn-link projTitle mb-0' data-id='"+record.p_id+"' data-project-title='"+record.project_title+"' >"+record.project_title+
					    									"</p><ul><li>Duration: "+(record.duration_in_days/365).toPrecision(2)+" year(s) </li></ul>").join(""))
					     .attr("data-placement","right")
					    .attr("data-html", true)

					    .attr("whiteList", ()=>{
											let myDefaultWhiteList = window.$.fn.tooltip.Constructor.Default.whiteList;
											myDefaultWhiteList.p=['data-id', 'data-project-title'];
										})
						.attr("data-container", "#ongoingProjectsValueByUnitCanvas")
					    .on("mouseover", mouseover) // What to do when hovered
						.on("mouseout", mouseout) // What to do when hovered out									+ "</div>")

				})
		    
	

	
        		
        		chart.append("text")
    					 .attr("transform","translate("+((canvasWidth/2)-20)+","+(canvasHeight+margin.bottom)+")" )
    					 .text("Unit")
    					 .style("font-weight","bold")
    					 .style("font-size","1.1rem")

    		
        		chart.append("text")
    					 //.attr("transform","translate("+(0-margin.left)+","+(projPerUnitCanvasHeight/2)+")" )
    					 .attr("transform", "rotate(-90)")
    					 .attr("x", 0-(canvasHeight/2)-50)
    					 .attr("y",0-(margin.left/2))
    					 
    					 .text("Value in USD")
    					 .style("font-weight","bold")
    					 .style("font-size","1.1rem")
    				
		
			}
	

			

			


	onResizeCanvas(){
		let node=document.getElementById("ongoingProjectsValueByUnitCanvas"); //select the projPerUnitCanvas
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

			<div id="ongoingProjectsValueByUnitCanvas" ref="ongoingProjectsValueByUnitCanvas"></div>
			
		</div>)
	}

}

export default OngoingProjectsValueByUnit;
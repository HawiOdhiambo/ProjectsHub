import React from 'react';
import * as d3 from 'd3';
import * as numeral from 'numeral';

class TotalOngoingProjectsValueByUnit extends React.Component{
	constructor(props){
		super(props);
		this.state={
			chartData:[]
		}
	}
	componentDidMount(){
		this.ajax=window.$.ajax({
			type: 'GET',
			url:"http://localhost/projects_hub/proj_hub/public/value_charts/get_totalOngoingProjectsValue_by_unit.php",
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
			url:"http://localhost/projects_hub/proj_hub/public/value_charts/get_totalOngoingProjectsValue_by_unit.php",
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
		return 	<CreateBarChart chartData={chartData}/>
				
	}
}
class CreateBarChart extends React.Component{
	constructor(props){
		super(props);
		this.onResizeCanvas=this.onResizeCanvas.bind(this)
	}
	componentDidMount(){
		window.addEventListener("resize", this.onResizeCanvas)
	}

	componentDidUpdate(prevProps){
		if(this.props.chartData!==prevProps.chartData){

			let node=document.getElementById("totalOngoingProjectsValueByUnitCanvas");
			while(node.hasChildNodes()){
				node.removeChild(node.firstChild)
			}
			if(!node.hasChildNodes()){
				this.drawData(this.props.chartData)

			}
			
		}
	}
	drawData(data){
		const windowCanvasWidth=window.$("#totalOngoingProjectsValueByUnitCanvas").width();
		const margin = {top: 20, right: (0.02*windowCanvasWidth), bottom: 40, left: (0.25*windowCanvasWidth)}
		const windowCanvasHeight= 200+margin.top + margin.bottom;
		const addional_DomainValue= 500000

		const canvasHeight = windowCanvasHeight-margin.top - margin.bottom;
		const canvasWidth = windowCanvasWidth-margin.left - margin.right; //use jquery to calculate the projPerUnitCanvasWidth. Doing this makes the width responsive
	
		//define the xScale
		let xScale=d3.scaleLinear()
						.domain([ 0, (d3.max(data, function(d) { return d.totalContribution; })+addional_DomainValue)])
						//(d3.min(data, function(d) { return d.totalContribution; }))
						.range([0, canvasWidth])

		//define the YScale
		const yScale=d3.scaleBand()
						.domain(data.map(function(d){return d.unitName}))
						.range([canvasHeight, 0])	
						.paddingInner(0.1) //padding between the bars
		//define the svg canvas
		const svgCanvas=d3.select(this.refs.totalOngoingProjectsValueByUnitCanvas).append("svg")
						.attr("width", windowCanvasWidth)
						.attr("height", windowCanvasHeight)


		const chart=svgCanvas.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			
		const yAxis=chart.append("g")
						.call(d3.axisLeft(yScale))//.ticks(6) .tickSize(-canvasWidth)

		const xAxis=chart.append("g")
							 .attr("transform", "translate(0," + canvasHeight + ")")//brings it to the bottom 
								 .call(d3.axisBottom(xScale).ticks(6)); //creates the scale

		const onMouseOverBar=function(datapoint){

		
             window.$(d3.event.target).popover('show');

         
		}

		const onMouseOutBar=function(datapoint, iteration){
	
			window.$(d3.event.target).popover('hide');
		}

				chart.selectAll("rect")
					    	 .data(data).enter() 
					         .append("rect")
					         .attr("height",(datapoint) => yScale.bandwidth()) //use the xscale to determine the width
					         .attr("width", (datapoint) => xScale(datapoint.totalContribution)) //use this to invert the width
					         .attr("data-content", (datapoint)=> "$"+numeral(datapoint.totalContribution).format('0,0'))
					         .attr("data-placement","right")
					         .attr("class", (datapoint) => datapoint.unitName) //used to style the bar" fill
					         //.attr("x", (datapoint, iteration) => xScale(datapoint.totalContribution)) //determine the x value to plot from
	        				 .attr("y", (datapoint) => yScale(datapoint.unitName)) //determine the y value to plot from
	        				 .on("mouseover", onMouseOverBar)
	        				 .on("mouseout", onMouseOutBar)


	        //add axis titles
	        chart.append("text")
    					 .attr("transform","translate("+((canvasWidth/2)-60)+","+(canvasHeight+margin.bottom)+")" )
    					 .text("Value in USD")
    					 .style("font-weight","bold")
    					 .style("font-size","1.1rem")

    		
        		chart.append("text")
    					 //.attr("transform","translate("+(0-margin.left)+","+(projPerUnitCanvasHeight/2)+")" )
    					 .attr("transform", "rotate(-90)")
    					 .attr("x", 0-((canvasHeight/2)+20))
    					 .attr("y",0-(margin.left/2)+20)
    					 .text("Unit")
    					 .style("font-weight","bold")
    					 .style("font-size","1.1rem")
	}


	onResizeCanvas(){
		let node=document.getElementById("totalOngoingProjectsValueByUnitCanvas"); //select the projPerUnitCanvas
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

			<div id="totalOngoingProjectsValueByUnitCanvas" ref="totalOngoingProjectsValueByUnitCanvas"></div>
			
		</div>)
	}
}

export default TotalOngoingProjectsValueByUnit
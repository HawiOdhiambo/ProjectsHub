import React from 'react';
	
class FetchSummary extends React.Component{

	constructor(props){
		super(props);
		this.state={
			summaryData:[]
		}
	}

	componentDidMount(){
			window.$.ajax(
	      {
	      
	      type:'GET',
	      url: this.props.fetchSummaryUrl,
	      data:{countryName: this.props.countryName, unitName: this.props.unitName, ongoingClosedValue:this.props.ongoingClosedValue,
				 		donorName: this.props.donorName, projectTitle: this.props.projectTitle},
	      success: function(response){
	        
	        console.log()
	        let summaryData=JSON.parse(response);
	        
	         getData(summaryData)


	        
	        
	        
	            }
	          });
	     
	     let  getData = data =>{




	          this.setState({
	             summaryData: data
	        });
	        

	      }
		}
			componentDidUpdate(prevProps){
			if(this.props.countryName!==prevProps.countryName
               ||  prevProps.unitName!==this.props.unitName || prevProps.ongoingClosedValue!==this.props.ongoingClosedValue 
               || prevProps.donorName!==this.props.donorName || prevProps.projectTitle!==this.props.projectTitle){
						window.$.ajax(
					      {
					      
					      type:'GET',
					      url: this.props.fetchSummaryUrl,
					      data:{countryName: this.props.countryName, unitName: this.props.unitName, ongoingClosedValue:this.props.ongoingClosedValue,
								 		donorName: this.props.donorName, projectTitle: this.props.projectTitle},
					      success: function(response){
					        
					        console.log()
					        let summaryData=JSON.parse(response);
					        
					         getData(summaryData)


					        
					        
					        
					            }
					          });
					     
					     let  getData = data =>{




					          this.setState({
					             summaryData: data
					        });
					        

					      }
				}
		}
	






	render(){
		const{summaryData}=this.state;

		const summaryStyle={
	
			flexBasis:'20%',
			textAlign:'center',
			flexGrow:'1',
			height: '9em',
			padding:'2%'
		}

		const summaryBoxStyle={
			display:'flex',
			marginBottom: '2.5em',
			flexWrap: 'wrap'		
		}
		const summaryVariableStyle={
			0:{
				background:'#0075DB',
				color:'white'
			},
			1:{
				background:'#00B7E6',
				color:'white'
			},
			2:{
				background:'#0ACFC1',
				color:'white'
			},
			3:{
				background:'#00E695',
				color:'white'
			},
			4:{
				background:'#00DB51',
				color:'white'
			}
		}
			


	

		return(<div style={summaryBoxStyle}>
				{
					
					summaryData.map((summary, index)=>{
						
					  return (<span  style={Object.assign(summaryVariableStyle[index], summaryStyle)} key={index}>
					  				<h1>{summary.number}</h1>
					  				<p>{summary.description}</p>
					  				</span>)
				
					})
				}
			



			 </div>) 
	}
}

export default FetchSummary;

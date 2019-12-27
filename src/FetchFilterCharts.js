 import React from 'react';
import ProjectsPerUnitChart from "./ProjectsPerUnitChart.js";//get the ProjectsPerUnitChart
import MajorDonorsChart from "./MajorDonorsChart.js";//get the ProjectsPerUnitChart
import MajorDonorsTable from "./MajorDonorsTable.js";//get the ProjectsPerUnitChart
import OngoingProjectsPerUnitChart from "./OngoingProjectsPerUnitChart.js";//get the ProjectsPerUnitChart
import CreateUnitTable from "./CreateUnitTable.js";//get the ProjectsPerUnitChart
import OngoingProjectsValueByUnit from "./OngoingProjectsValueByUnit.js";//get the ProjectsPerUnitChart
import TotalOngoingProjectsValueByUnit from "./TotalOngoingProjectsValueByUnit.js";//get the TotalOngoingProjectsValueByUnit
import CreateOngoingProjectsValueByUnitTable from "./CreateOngoingProjectsValueByUnitTable.js";//get the TotalOngoingProjectsValueByUnit
import ProjectsPerGroupChart from "./ProjectsPerGroupChart.js";//get the ProjectsPerGroupChart
import ProjectValueAgainstStartYear from "./ProjectValueAgainstStartYear.js";//get the ProjectsPerGroupChart
import ProjectValueAgainstStartYearTable from "./ProjectValueAgainstStartYearTable.js";//get the ProjectsPerGroupChart
 class FetchFilterCharts extends React.Component{

 	constructor(props){
 		super(props);

 		this.state={
 			pageData:[],
      countryName: this.props.countryName,
      unitName: this.props.unitName,
      ongoingClosedValue:this.props.ongoingClosedValue,
      donorName: this.props.donorName,
      projectTitle: this.props.projectTitle
 		}

 	}

	componentDidMount(){

        this.ajaxCall();


 	}

  static getDerivedStateFromProps(nextProps, prevState){

   if(prevState.countryName!==nextProps.countryName
               ||  nextProps.unitName!==prevState.unitName || nextProps.ongoingClosedValue!==prevState.ongoingClosedValue 
               || nextProps.donorName!==prevState.donorName || nextProps.projectTitle!==prevState.projectTitle){

       
        return{ countryName: nextProps.countryName,
                unitName: nextProps.unitName,
                ongoingClosedValue:nextProps.ongoingClosedValue,
                donorName: nextProps.donorName,
                projectTitle: nextProps.projectTitle}
   }
   else return null;

  }
 	componentDidUpdate(prevProps, prevState){


 		if(this.state.countryName!==prevState.countryName
               ||  prevState.unitName!==this.state.unitName || prevState.ongoingClosedValue!==this.state.ongoingClosedValue 
               || prevState.donorName!==this.state.donorName || prevState.projectTitle!==this.state.projectTitle){

        
        this.ajaxCall();

 		}
 	}


  ajaxCall(){

       this.ajax=window.$.ajax({
          type:'GET',
          url: "http://localhost/projects_hub/proj_hub/public/renderCharts/analyseChartData.php",
          data:{countryName: this.state.countryName, unitName: this.state.unitName, ongoingClosedValue:this.state.ongoingClosedValue,
            donorName: this.state.donorName, projectTitle: this.state.projectTitle},
          success:function(response){
           
            let pageData=JSON.parse(response);
            getData(pageData);

            // {pageData : pageData}
          }

      })


    let  getData = data =>{




          this.setState({
             pageData: data
        });
        

      }
  }

  componentWillUnmount(){
        this.ajax.abort()
     
      }

	 render(){


       const mapStyle={
        height: '35em',
        position: 'relative',     
        };

       const countryTitleStyle={
        textAlign: 'center',
        padding: '0.3em 0',
        color: '#6B662A',
       };

       const projTitle={
        color: '#6B662A',
       }
       const row_NavLinks_Style={
         marginTop:'2%',
        
       }
      const linkColor={
          color: '#0093B8'
      }
      const h4Style={
        textAlign:"center"
      }
      
      const fetchSummaryUrl="http://localhost/projects_hub/proj_hub/public/summary_charts/summary_homeCountryPage.php";
     
      const {totalUnitNumber, ongoingUnitNumber, donorsEngaged, ongoingProjNumber, startYearNumber, uniqueProjNumbers, un_groupCount}=this.state.pageData;
      
      let donorCirclesRange; //initialize

      if(uniqueProjNumbers===1){
         donorCirclesRange=[5, 30]
      }
      else{
         donorCirclesRange=[10,50];   
      }
        let ongoingClosedValueLowerCase;
      if(this.props.ongoingClosedValue!==undefined){
         ongoingClosedValueLowerCase=this.props.ongoingClosedValue.toLowerCase();
      }
     
      

	 	return (	<div>
                      { //check if there will be a distribution by unit chart, in order to see if you will place the heading
                        (totalUnitNumber>1 || ongoingUnitNumber>1)?(
                            <div className="row mt-3" id="projByUnitRow">
                              <div className="col-md-12">
                                <h4 style={h4Style}>Distribution of  Projects by Unit</h4>
                              </div>
                              
                           </div>
                          ):false
                      }
                    <div className="row mt-4">



                      {
                        //display the total number of project in a bar chart, when the units in a country are more than 1
                        (totalUnitNumber>1 && ongoingClosedValueLowerCase!=='ongoing')?(
                            <div className="col-md-8">
                              <div className="row">
                                <div className="col-md-6"> 
                                   
                                    <ProjectsPerUnitChart countryName={this.state.countryName} unitName={this.state.unitName} projectTitle={this.state.projectTitle} 
                                    ongoingClosedValue={this.state.ongoingClosedValue}  donorName={this.state.donorName} 
                                    handleDisplayProjectPage={this.props.handleDisplayProjectPage} headingId="projByUnitRow"/>  
                                    
                                    <p className="mt-3" style={h4Style}>Bar graph showing the <strong>total number of projects</strong> against<strong> unit </strong></p>
                                 </div>
                                 <div className="col-md-6">
                                  <CreateUnitTable countryName={this.state.countryName} unitName={this.state.unitName} projectTitle={this.state.projectTitle} 
                                    ongoingClosedValue={this.state.ongoingClosedValue}  donorName={this.state.donorName}/>
                                 </div>   
                               </div> 
                              </div>
                          ):false
                       }{
                        (ongoingUnitNumber>1 && ongoingClosedValueLowerCase!=='ongoing')?(
                            <div className="col-md-4">
                              <OngoingProjectsPerUnitChart handleDisplayProjectPage={this.props.handleDisplayProjectPage}
                               countryName={this.state.countryName}  unitName={this.state.unitName} projectTitle={this.state.projectTitle} 
                                    ongoingClosedValue={this.state.ongoingClosedValue}  donorName={this.state.donorName} headingId="projByUnitRow"/>
                              <p style={h4Style}>Donut chart showing the number of <strong> ongoing projects </strong> against<strong> unit</strong></p>
                          </div>
                          ):false
                      }
              
                        
                      </div>
                             {
                        (ongoingUnitNumber>1 && ongoingClosedValueLowerCase==='ongoing')?(
                          <div className="row">
                              <div className="col-md-4"></div>
                              <div className="col-md-4">
                                <OngoingProjectsPerUnitChart handleDisplayProjectPage={this.props.handleDisplayProjectPage}
                                 countryName={this.state.countryName}  unitName={this.state.unitName} projectTitle={this.state.projectTitle} 
                                      ongoingClosedValue={this.state.ongoingClosedValue}  donorName={this.state.donorName} headingId="projByUnitRow"/>
                                <p style={h4Style}>Donut chart showing the number of <strong> ongoing projects </strong> against<strong> unit</strong></p>
                            </div>
                            <div className="col-md-4"></div>
                          </div>
                          ):false
                      
                       }


                      {
                        (donorsEngaged>1)?(
                              <div className="row mt-3" id="majorDonorsRow">
                         
                                <div className="col-md-12 mb-3">
                                  <h4 style={h4Style}>Distribution of Projects by Donor</h4>
                                </div>
                                
                        

                                <div className="col-md-8">
                                   <MajorDonorsChart  countryName={this.state.countryName}  unitName={this.state.unitName} projectTitle={this.state.projectTitle} 
                                    ongoingClosedValue={this.state.ongoingClosedValue}  donorName={this.state.donorName} 
                                    donorCirclesRange={donorCirclesRange} handleDisplayProjectPage={this.props.handleDisplayProjectPage} headingId="majorDonorsRow"/>
                                    <p style={h4Style}>Circles showing  the <strong> total number of  projects that belong to a donor</strong></p>
                                </div>
                                <div className="col-md-4">
                                  <MajorDonorsTable countryName={this.state.countryName}  unitName={this.state.unitName} projectTitle={this.state.projectTitle} 
                                    ongoingClosedValue={this.state.ongoingClosedValue}  donorName={this.state.donorName}/>
                                </div>
                             
                             </div>
                        
                          ):false
                             
                      }
                       <div className="row mt-5" >
                       {
                        (ongoingProjNumber>1 || ongoingUnitNumber>1 || ongoingUnitNumber===1)?(
                                 
                            <div className="col-md-12 mb-3" id="ongoingProjRow">
                              <h4 style={h4Style}>Distribution of Ongoing Projects by Value</h4>
                             </div>
                         ):false
                       }


                      {
                        (ongoingProjNumber>1)?(
                             <div className="col-md-6" >
                              <OngoingProjectsValueByUnit handleDisplayProjectPage={this.props.handleDisplayProjectPage} countryName={this.state.countryName}  
                              unitName={this.state.unitName} projectTitle={this.state.projectTitle} 
                                    ongoingClosedValue={this.state.ongoingClosedValue}  donorName={this.state.donorName} headingId="ongoingProjRow"/>
                              <p style={h4Style}>Graph showing the <strong> value of each of ongoing project in a unit using circles that represent the duration of each project</strong></p>
                            </div>
                          ):false
                      }
                      {
                        (ongoingUnitNumber>1)?(
                          <div className="col-md-6 ">
                            <TotalOngoingProjectsValueByUnit countryName={this.state.countryName}  
                              unitName={this.state.unitName} projectTitle={this.state.projectTitle} 
                                    ongoingClosedValue={this.state.ongoingClosedValue}  donorName={this.state.donorName}/>

                            <p className="mb-5 mt-2" style={h4Style}>Graph showing <strong>the total value of ongoing projects in a unit</strong></p>
                            <CreateOngoingProjectsValueByUnitTable  countryName={this.state.countryName}  
                              unitName={this.state.unitName} projectTitle={this.state.projectTitle} 
                                    ongoingClosedValue={this.state.ongoingClosedValue}  donorName={this.state.donorName}/>
                          </div>

                          ):false
                      }
                      {
                        (ongoingUnitNumber===1&& ongoingProjNumber>1)?(
                           
                            
                            <div className="col-md-6 mt-5">
                            <CreateOngoingProjectsValueByUnitTable  countryName={this.state.countryName}  
                              unitName={this.state.unitName} projectTitle={this.state.projectTitle} 
                                    ongoingClosedValue={this.state.ongoingClosedValue}  donorName={this.state.donorName}/>
                          </div>
                             
                        
                          ):false
                      }

                      </div>
                      {
                        (ongoingUnitNumber===1 && ongoingProjNumber==1)?(
                          <div className="row">
                            <div className="col-md-3 "></div>
                                <div className="col-md-6 ">
                                <CreateOngoingProjectsValueByUnitTable  countryName={this.state.countryName}  
                                  unitName={this.state.unitName} projectTitle={this.state.projectTitle} 
                                        ongoingClosedValue={this.state.ongoingClosedValue}  donorName={this.state.donorName}/>
                              </div>
                              <div className="col-md-3"></div>
                          </div>
                          ):false
                      }
                    
                      {
                        //when there is more than one start year, show the start year graphs.
                        (startYearNumber>1)?(

                             <div className="row mt-3 mb-5" >

                                 <div className="col-md-9" id="ProjectValueAgainstStartYear" >
                                    <ProjectValueAgainstStartYear countryName={this.state.countryName}  
                                    unitName={this.state.unitName} projectTitle={this.state.projectTitle} 
                                    ongoingClosedValue={this.state.ongoingClosedValue}  donorName={this.state.donorName} handleDisplayProjectPage={this.props.handleDisplayProjectPage}/>
                                    <p className="mt-3" style={h4Style} >Line graph showing <strong>the current value of the ongoing projects</strong> against <strong>the start date of projects </strong>
                                      with circle sizes that represent the number of projects
                                      </p>
                                 </div>
                                 <div className="col-md-3" >
                                   <ProjectValueAgainstStartYearTable countryName={this.state.countryName}  
                                    unitName={this.state.unitName} projectTitle={this.state.projectTitle} 
                                    ongoingClosedValue={this.state.ongoingClosedValue}  donorName={this.state.donorName}/>
                                 </div>
                            
                             
                                
                             </div>

                          ):false
 						}
            {

              (un_groupCount>1 && ongoingProjNumber>1)?(
                 <div className="row mb-5">
                    
                    <div className="col-md-12">
                    <h4  style={h4Style}>Distribution of Ongoing Projects by UN regional groups</h4>
                  </div>
                  
                    <div className="col-md-12">
                        <ProjectsPerGroupChart countryName={this.state.countryName}  
                            unitName={this.state.unitName} projectTitle={this.state.projectTitle} donorName={this.state.donorName}
                            ongoingClosedValue={this.state.ongoingClosedValue} handleDisplayProjectPage={this.props.handleDisplayProjectPage}/>
                     </div>
               </div>

                ):false
            }
 						</div>
	 				)
 	}
}
 export default FetchFilterCharts;


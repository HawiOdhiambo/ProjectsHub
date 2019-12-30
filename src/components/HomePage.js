import React from 'react';

//import  "../App.scss";

//import {BrowserRouter as Router, Route, Redirect, Switch, Link} from "react-router-dom"
//import { HashLink as Link } from 'react-router-hash-link';
//import Navbar from "./Navbar.js"; //import the navbar
import FetchMarkersHome from "./FetchMarkersHome.js"; //import the markers
import FetchProjectDetails from "./FetchProjectDetails.js"; //import the project details
import ProjectsCard from "./ProjectsCard.js";//import the project titles and buttons
import FilterAppHome from "./FilterAppHome.js";
import FilterCountryPage from "./FilterCountryPage.js";
import FilterProjectPage from "./FilterProjectPage.js";
import FilterCountryPageProjectPage from "./FilterCountryPageProjectPage.js";
import FetchSummary from "./FetchSummary.js";//get the homepageSummary
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
import HomePageProjectPage from "./HomePageProjectPage.js";//get the ProjectsPerGroupChart
import ProjectValueAgainstStartYearTable from "./ProjectValueAgainstStartYearTable.js";//get the ProjectsPerGroupChart
import FetchFilterCharts from "./FetchFilterCharts.js";//fetch the charts



//controls the home page

 class HomePage extends React.Component{

  constructor(props){
    super(props);
    props.whenHomePage(); //initialize the homepage


  }

    componentDidMount(prevProps){

         if(this.props.pageLocation!==""){
           
          let pageLocation=this.props.pageLocation
           
          setTimeout(function(){

           //window.scrollTo(0, pageLocation);
           document.getElementById(pageLocation).scrollIntoView();
            }, 300);
          }
      
    }




  render(){
      const mapStyle={
      
        height : '45em',
        position: 'relative',
       
        };
        const h4Style={
    
        textAlign:"center"
      }

      const fetchSummaryUrl="http://localhost/projects_hub/proj_hub/public/summary_charts/get_summary_home.php";
      const donorCirclesRange=[8, 80]; 
    return (
            <div className='container-fluid'>
              <FetchMarkersHome changeHomepage={this.props.changeHomepage} mapStyle={mapStyle}/>
              <div className="container" >
                <FetchSummary  fetchSummaryUrl={fetchSummaryUrl}/>
                <div className="row mt-3" id="projByUnitRow">
                  <div className="col-md-12">
                    <h4 style={h4Style}>Distribution of  Projects by Unit</h4>
                  </div>
                  
               </div>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <ProjectsPerUnitChart handleDisplayProjectPage={this.props.handleDisplayProjectPage} headingId="projByUnitRow"/>
                    <p className="mt-3" style={h4Style}>Bar graph showing the <strong> total number of projects in each unit</strong></p>
                   
                  </div>
                  <div className="col-md-4 mt-3">
                       <CreateUnitTable/>
                  </div>
                   <div className="col-md-4">
                      <OngoingProjectsPerUnitChart handleDisplayProjectPage={this.props.handleDisplayProjectPage} headingId="projByUnitRow"/>
                      <p style={h4Style}>Donut chart showing the number of <strong> projects in each unit</strong></p>
                  </div>
                </div>
                <div className="row mt-3" id="majorDonorsRow">
                  <div className="col-md-12">
                    <h4 style={h4Style}>Distribution of Projects by Donor</h4>
                  </div>
                  
               </div>
                <div className="row mt-3" >

                  <div className="col-md-8">
                     <MajorDonorsChart donorCirclesRange={donorCirclesRange} handleDisplayProjectPage={this.props.handleDisplayProjectPage} headingId="majorDonorsRow"/>
                      <p style={h4Style}>Circles showing the number of <strong>projects belonging to each donor</strong></p>
                  </div>
                  <div className="col-md-4">
                    <MajorDonorsTable />
                  </div>
               
               </div>
               <div className="row mt-5" id="ongoingProjRow">
                  <div className="col-md-12">
                    <h4 style={h4Style}>Distribution of Ongoing Projects by Value</h4>
                  </div>
                  
               </div>
               <div className="row mb-3" >

                  <div className="col-md-6" >
                    <OngoingProjectsValueByUnit handleDisplayProjectPage={this.props.handleDisplayProjectPage} headingId="ongoingProjRow"/>
                    <p style={h4Style}>Graph showing the <strong> value of each of ongoing project in a unit using circles that represent the duration of each project</strong></p>
                  </div>
                  <div className="col-md-6 ">
                    <TotalOngoingProjectsValueByUnit/>
                    <p className="mb-5 mt-2" style={h4Style}>Graph showing the <strong>total value of ongoing projects in a unit</strong></p>
                    <CreateOngoingProjectsValueByUnitTable/>
                  </div>
               </div>
                <div className="row mb-5" >

                   <div className="col-md-9" >
                    <ProjectValueAgainstStartYear countryName={this.countryName} handleDisplayProjectPage={this.props.handleDisplayProjectPage}/>
                      <p className="mt-3" style={h4Style} >Line graph showing <strong>the current value of the ongoing projects</strong> against <strong>the start date of projects </strong>
                        with circle sizes that represent the number of projects
                        </p>
                   </div>
                   <div className="col-md-3" >
                     <ProjectValueAgainstStartYearTable/>
                   </div>
              
               
                  
               </div>
               <div className="row mt-4">
                  <div className="col-md-12">
                    <h4 className="text-center" style={h4Style}>Distribution of Ongoing Projects by UN regional groups</h4>
                  </div>
                  
               </div>
               <div className="row mb-5">
                <div className="col-md-12">
                    <ProjectsPerGroupChart handleDisplayProjectPage={this.props.handleDisplayProjectPage}/>
                 </div>
               </div>
              
              
             </div>
              
            </div>
              );
  }

}

export default HomePage;
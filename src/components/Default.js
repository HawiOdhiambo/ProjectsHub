import React from 'react';

import  "../App.scss";

import {BrowserRouter as Router, Route, Redirect, Switch, Link} from "react-router-dom"
//import { HashLink as Link } from 'react-router-hash-link';
import Navbar from "./Navbar.js"; //import the navbar
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

//contrrols the Default functionality
class Default extends React.Component{
  constructor(props){
    super(props);
    this.state={
      homepage:true,
      countryPage:false,
      countryProjectPage:false, 
      homepageProjectPage:false,

      //used by the filter

     
      displayFilterResults:false,
      displayFilterCountryPage:false,
      displayFilterCountryProjectPage: false,
      displayFilterProjectPage:false,
      
      displayErrorMessage:false,
         
      markerLocation:'', //for use by the country page and the project page

      projectTitleLocation:'',  //for use by the country page and the project page
      p_idLocation:'',


      pageLocation:'',
    //will also hold the country parameter from the filter
      searchFilterParams:{
        countryNameParam: '',
        projectNameParam:'',
        unitNameParam:'',
        ongoingClosedValueParam:'',
        donorNameParam:''
      }

    }

    this.activateCountrypage=this.activateCountrypage.bind(this);
    this.handleDisplayHomePageProjectPage=this.handleDisplayHomePageProjectPage.bind(this);
    this.handleDisplayCountryPageProjectPage=this.handleDisplayCountryPageProjectPage.bind(this);

    this.initializeCountryPage=this.initializeCountryPage.bind(this);
    this.initializeCountryProjectPage=this.initializeCountryProjectPage.bind(this);
    this.whenHomePage=this.whenHomePage.bind(this);
    this.initializeHomePageProjectPage=this.initializeHomePageProjectPage.bind(this)
  
    
    //pertain to the filter
    this.handleDisplayFilterCountryPage=this.handleDisplayFilterCountryPage.bind(this)
    this.handleDisplayFilterProjectPage=this.handleDisplayFilterProjectPage.bind(this)
    this.handleDisplayFilterCountryProjectPage=this.handleDisplayFilterCountryProjectPage.bind(this)
    this.handleFilterSearch=this.handleFilterSearch.bind(this);


    this.resetFilterDefault=this.resetFilterDefault.bind(this);
    this.resetHomeDefault=this.resetHomeDefault.bind(this)

    this.initalizeFilterProjectPage=this.initalizeFilterProjectPage.bind(this)
    this.intializeFilterDefaultHome=this.intializeFilterDefaultHome.bind(this)
    this.initializeFilterCountryPage=this.initializeFilterCountryPage.bind(this)
    this.initalizeFilterCountryProjectPage=this.initalizeFilterCountryProjectPage.bind(this)
   
    this.changePageLocation=this.changePageLocation.bind(this)
  }


  //activates the country page through clicking on more information on a marker
  activateCountrypage(e){

      let element=e.target;
      let markerLocation=element.getAttribute('markerlocation');



    this.setState({homepage:false, countryPage: true, countryProjectPage: false, homepageProjectPage: false, displayFilterCountryPage:false, displayFilterResults:false,
     displayFilterProjectPage:false,  displayFilterCountryProjectPage:false, markerLocation: markerLocation, pageLocation: ''});

    }

      //onclick projectName in HomePage
  handleDisplayHomePageProjectPage(projectTitle, p_id, pageLocation){
     
      this.setState({homepageProjectPage: true, projectTitleLocation:projectTitle, p_idLocation:p_id, homepage:false, countryPage: false, countryProjectPage: false, displayFilterCountryPage:false, displayFilterResults:false,
     displayFilterProjectPage:false,  displayFilterCountryProjectPage:false,  pageLocation: pageLocation })

  }

        //onclick projectName in countryPage
  handleDisplayCountryPageProjectPage(projectTitle, p_id, pageLocation){
     
      this.setState({homepage:false, countryPage: false, countryProjectPage: true, homepageProjectPage: false, 
          projectTitleLocation:projectTitle, p_idLocation:p_id, pageLocation: pageLocation, 
         displayFilterCountryPage:false, displayFilterResults:false,  displayFilterCountryProjectPage:false, displayFilterProjectPage:false })

  }
  //set the state markerLocation to  the marker location entered in the url.
  initializeCountryPage(markerLocation){

    this.setState({homepage:false, countryPage: true, countryProjectPage: false, homepageProjectPage: false, displayFilterCountryPage:false,displayFilterResults:false,
     displayFilterProjectPage:false,  displayFilterCountryProjectPage:false, projectTitleLocation:"", p_idLocation: "", markerLocation: markerLocation})

  }

  //initiialize the project page
  initializeCountryProjectPage(project_title, markerLocation, p_idLocation, pageLocation){
    
    this.setState({homepage:false, countryPage: false, countryProjectPage:true, homepageProjectPage: false, 

            displayFilterCountryPage:false,displayFilterResults:false, displayFilterProjectPage:false,  displayFilterCountryProjectPage:false, 

          projectTitleLocation: project_title, p_idLocation: p_idLocation, markerLocation: markerLocation, pageLocation: pageLocation})

  }

  //initializes the homepage
  whenHomePage(){

    this.setState({homepage:true, countryPage: false, countryProjectPage:false, homepageProjectPage: false, displayFilterCountryPage:false,displayFilterResults:false,
     displayFilterProjectPage:false,  displayFilterCountryProjectPage:false, projectTitleLocation:"", p_idLocation: "", markerLocation: ""});
  }


  initializeHomePageProjectPage(projectTitle, p_idLocation){
     this.setState({homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: true, displayFilterCountryPage:false,displayFilterResults:false,
     displayFilterProjectPage:false,  displayFilterCountryProjectPage:false, projectTitleLocation:projectTitle, p_idLocation: p_idLocation, markerLocation: ""});

  }


  //assist in initializing the filter DefaultHome


  intializeFilterDefaultHome(){
    this.setState({countryPage:false, homepage: false, countryProjectPage:false, homepageProjectPage: false, displayFilterCountryPage:false,displayFilterResults:false,
     displayFilterProjectPage:false,  displayFilterCountryProjectPage:false, 
     markerLocation:'', p_idLocation: '', projectTitleLocation:'' })
  }

    //initialize the filter CountryPage
  initializeFilterCountryPage(markerLocation, countryName, unitName, ongoingClosedValue, donorName, projectName){

    this.setState({homepage:false, countryPage: false, countryProjectPage:false,  homepageProjectPage: false, displayFilterCountryPage:true, displayFilterResults:false, 
      displayFilterProjectPage:false,  displayFilterCountryProjectPage:false,
         markerLocation: markerLocation, p_idLocation: '', projectTitleLocation:'',

      searchFilterParams:{ countryNameParam: countryName, unitNameParam: unitName, ongoingClosedValueParam:ongoingClosedValue, 
                   donorNameParam: donorName, projectNameParam:projectName}});
  }

      //initialize the filter CountryProjectPage
  initalizeFilterCountryProjectPage(markerLocation, pageLocation, countryName, unitName, ongoingClosedValue, donorName, projectName, projectTitleLocation){
    
     this.setState({homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: false, displayFilterCountryPage:false, displayFilterResults:false, 
      displayFilterProjectPage: false, displayFilterCountryProjectPage:true,
       projectTitleLocation:projectTitleLocation, markerLocation: markerLocation, p_idLocation: '', pageLocation: pageLocation,

      searchFilterParams:{countryNameParam: countryName, unitNameParam: unitName, ongoingClosedValueParam:ongoingClosedValue, 
                   donorNameParam: donorName, projectNameParam:projectName}
    });
  }


    //initialize the filter Project Page 
  initalizeFilterProjectPage(projectTitleLocation, p_idLocation, pageLocation, countryName, unitName, ongoingClosedValue, donorName, projectName){
  

    this.setState({homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: false, displayFilterCountryPage:false, displayFilterResults:false, 
      displayFilterProjectPage: true,  displayFilterCountryProjectPage:false, 
      projectTitleLocation:projectTitleLocation, markerLocation:'', p_idLocation: p_idLocation, pageLocation: pageLocation,

      searchFilterParams:{ countryNameParam: countryName, unitNameParam: unitName, ongoingClosedValueParam:ongoingClosedValue, 
                   donorNameParam: donorName, projectNameParam:projectName}
    });
  }


  //assists in the displaying of the information requested in the filter
  handleFilterSearch(countryName, unitName, ongoingClosedValue, donorName, projectName, p_id, e){

    if(countryName!==''|| unitName!=='' || ongoingClosedValue !=='' || donorName!=='' || projectName!==''){

         this.setState({homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: false, displayFilterCountryPage:false,  displayFilterResults: true,
                   displayFilterProjectPage:false,  displayFilterCountryProjectPage:false, displayErrorMessage:false,

                   searchFilterParams:{ countryNameParam: countryName, unitNameParam: unitName, ongoingClosedValueParam:ongoingClosedValue, 
                   donorNameParam: donorName, projectNameParam:projectName},

                   markerLocation:'', projectTitleLocation:'', p_idLocation: ''

                  });//enables the results of the search to show on the screen
    }
    else{

        this.setState({homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: false, displayFilterCountryPage:false,  displayFilterResults: false,
                   displayFilterProjectPage:false,  displayFilterCountryProjectPage:false, displayErrorMessage:true,

                   searchFilterParams:{ countryNameParam: countryName, unitNameParam: unitName, ongoingClosedValueParam:ongoingClosedValue, 
                   donorNameParam: donorName, projectNameParam:projectName},

                   markerLocation:'', projectTitleLocation:'', p_idLocation: ''

                  });//enables error message to show on the screen
    }
  
 
  }




  //assist in the displaying of the filter country page
  handleDisplayFilterCountryPage(countryName){
    

     this.setState({homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: false, 
      displayFilterCountryPage:true, displayFilterResults:false, 
      displayFilterProjectPage:false,  displayFilterCountryProjectPage:false,
       markerLocation: countryName, projectTitleLocation:'', p_idLocation: '', pageLocation: ''});
  }

  //assist in displaying filterPageProjectPage

  handleDisplayFilterProjectPage(projectTitle, p_id, pageLocation){
console.log("filterPageProjectPage")

    this.setState({homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: false, 
      displayFilterCountryPage:false, displayFilterResults:false, 
      displayFilterProjectPage:true,  displayFilterCountryProjectPage:false,
       markerLocation: '', projectTitleLocation:projectTitle, p_idLocation:p_id, pageLocation: pageLocation});

     //console.log(this.state) 
     
  }

//assist in displaying FilterCountryProjectPage
  handleDisplayFilterCountryProjectPage(projectTitle, p_id, pageLocation){

    console.log("handleDisplayFilterCountryProjectPage")

     this.setState({homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: false, 
      displayFilterCountryPage:false, displayFilterResults:false, 
      displayFilterProjectPage:false,  displayFilterCountryProjectPage:true,
        projectTitleLocation:projectTitle, p_idLocation:p_id, pageLocation: pageLocation});
    // console.log(this.state) 
       
  }


  //returns the filter Default component to its default state
  resetFilterDefault(){
  
    this.setState({homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: false, displayFilterCountryPage:false,  displayFilterResults:false, 
    displayFilterProjectPage:false,  displayFilterCountryProjectPage:false,


     searchFilterParams:{ countryNameParam: '', unitNameParam: '', ongoingClosedValueParam:'', 
                   donorNameParam: '', projectNameParam:''},

                   markerLocation:'', projectTitleLocation:'', p_idLocation: '', pageLocation: ''});//enables the results of the search to show on the screen

  }

  changePageLocation(pageLocation){
    this.setState({
      pageLocation:pageLocation
    })
  }

  resetHomeDefault(){

     this.setState({ pageLocation: ''});//reset the page location

   
  }


 render(){


 
   let  homepageElements;
   const { homepage,countryPage,countryProjectPage, homepageProjectPage,
    projectTitleLocation, markerLocation, p_idLocation, pageLocation,
    displayFilterCountryPage, displayFilterResults, displayErrorMessage, displayFilterProjectPage, displayFilterCountryProjectPage }=this.state;

    const {countryNameParam, projectNameParam, p_idParam, unitNameParam, ongoingClosedValueParam, donorNameParam}=this.state.searchFilterParams
    


 
    //Display country page
    if(countryPage===true && homepage === false && countryProjectPage ===false && homepageProjectPage===false
      && displayFilterCountryPage===false  && displayFilterResults===false && displayFilterProjectPage===false){
      
       let markerLocationUrl= markerLocation.split('-').join('_').split(' ').join('-')
    homepageElements=<Redirect push to={"/home/country/"+markerLocationUrl}/>
      
      
    }

  //Display the homepageProjectPage

if(countryPage===false && homepage=== false && countryProjectPage===false && homepageProjectPage===true
  && displayFilterCountryPage===false && displayFilterResults===false && displayFilterProjectPage===false 
  && displayFilterCountryProjectPage===false ){

          let projectTitleLocationUrl= projectTitleLocation.split('_').join('__').split('-').join('_').split(' ').join('-').concat("-").concat(p_idLocation);

          console.log( "/home/project/"+projectTitleLocationUrl)
          homepageElements=<Redirect push to={{pathname: "/home/project/"+projectTitleLocationUrl}}/>;

    }
//Display the countryProjectPage

if(countryPage===false && homepage=== false && countryProjectPage===true && homepageProjectPage===false
  && displayFilterCountryPage===false && displayFilterResults===false && displayFilterProjectPage===false 
  && displayFilterCountryProjectPage===false ){

           let projectTitleLocationUrl= projectTitleLocation.split('_').join('__').split('-').join('_').split(' ').join('-').concat("-").concat(p_idLocation);

          let markerLocationUrl=markerLocation.split('-').join('_').split(' ').join('-');

       console.log("/home/country/"+markerLocationUrl+"/project/"+projectTitleLocationUrl)
        homepageElements=<Redirect push to={{pathname:"/home/country/"+markerLocationUrl+"/project/"+projectTitleLocationUrl}}/>;


    }


    //if the displayfilterResults is set to false, make sure the url reads just /filter. 
    //This was mostly because of the event you click the clearAll button,

    //Display filter home page

    if(countryPage===false && homepage=== false && countryProjectPage===false && homepageProjectPage===false
        && displayFilterCountryPage===false && displayFilterResults===false && displayFilterProjectPage===false && displayFilterCountryProjectPage==false
        || displayErrorMessage===true){

       homepageElements=<Redirect push to="/filter"/>

    }

   





       //if the displayFilter results is set to true. So when the search button has been clicked.
    if(countryPage===false && homepage=== false && countryProjectPage===false && homepageProjectPage===false
      && displayFilterCountryPage===false && displayFilterResults===true && displayFilterProjectPage===false && displayFilterCountryProjectPage==false && displayErrorMessage===false){

          let paramsArray=[];


          if(countryNameParam!=="" && countryNameParam!==undefined){
            let param="countryName="+countryNameParam.split('-').join('_').split(' ').join('-');;
            paramsArray.push(param);
          }
          if(unitNameParam!=="" && unitNameParam!==undefined){
            let param="unitName="+unitNameParam;
            paramsArray.push(param);
          }
          if(ongoingClosedValueParam!=="" && ongoingClosedValueParam!==undefined){
            let param="ongoingClosedValue="+ongoingClosedValueParam;
            paramsArray.push(param);
          }
          if(donorNameParam!=="" && ongoingClosedValueParam!==undefined){
            let param="donorName="+donorNameParam.split('-').join('_').split(' ').join('-');;
            paramsArray.push(param);
          }
           if(projectNameParam!=="" && projectNameParam!==undefined){


               //let projectTitleLocationUrl= projectTitleLocation.split('_').join('__').split('-').join('_').split(' ').join('-').concat("-").concat(p_idLocation);

            let projectTitleUrl= projectNameParam.split('-').join('_').split(' ').join('-');
            let param="projectName="+projectTitleUrl;
            paramsArray.push(param);
          }

         
          let paramsArrayString=paramsArray.toString();
         
          let paramString=paramsArrayString.replace(/,/g,"&");
          
         

        homepageElements=<Redirect push to={{pathname:"/filter", search:paramString}}/>
    }

   
    //if the displayFilterCountryPage Filter value is true
   if(countryPage===false && homepage=== false && countryProjectPage===false && homepageProjectPage===false
      && displayFilterCountryPage===true  && displayFilterResults===false && displayFilterProjectPage===false 
      && displayFilterCountryProjectPage==false && displayErrorMessage===false){

         let paramsArray=[];


          if(countryNameParam!=="" && countryNameParam!==undefined){
            let param="countryName="+countryNameParam.split('-').join('_').split(' ').join('-');
            paramsArray.push(param);
          }
          if(unitNameParam!=="" && unitNameParam!==undefined){
            let param="unitName="+unitNameParam;
            paramsArray.push(param);
          }
          if(ongoingClosedValueParam!=="" && ongoingClosedValueParam!==undefined){
            let param="ongoingClosedValue="+ongoingClosedValueParam;
            paramsArray.push(param);
          }
          if(donorNameParam!=="" && ongoingClosedValueParam!==undefined){
            let param="donorName="+donorNameParam.split('-').join('_').split(' ').join('-');
            paramsArray.push(param);
          }
           if(projectNameParam!=="" && projectNameParam!==undefined){

            let projectTitleUrl= projectNameParam.split('-').join('_').split(' ').join('-');
            let param="projectName="+projectTitleUrl;
            paramsArray.push(param);
          }

         
          let paramsArrayString=paramsArray.toString();
         
          let paramString=paramsArrayString.replace(/,/g,"&");
          
          let markerLocationUrl=markerLocation.split('-').join('_').split(' ').join('-');
       
        homepageElements=<Redirect push to={{pathname:"/filter/country/"+markerLocationUrl, search:paramString}}/>;

     
    }

    //displayFilterProjectPage===true

    if( displayFilterProjectPage===true && countryPage===false && homepage=== false && countryProjectPage===false && homepageProjectPage===false
      && displayFilterCountryPage===false && displayFilterResults===false 
      && displayFilterCountryProjectPage===false ){

           let paramsArray=[];


          if(countryNameParam!=="" && countryNameParam!==undefined){
            let param="countryName="+countryNameParam.split('-').join('_').split(' ').join('-');
            paramsArray.push(param);
          }
          if(unitNameParam!=="" && unitNameParam!==undefined){
            let param="unitName="+unitNameParam;
            paramsArray.push(param);
          }
          if(ongoingClosedValueParam!=="" && ongoingClosedValueParam!==undefined){
            let param="ongoingClosedValue="+ongoingClosedValueParam;
            paramsArray.push(param);
          }
          if(donorNameParam!=="" && ongoingClosedValueParam!==undefined){
            let param="donorName="+donorNameParam.split('-').join('_').split(' ').join('-');
            paramsArray.push(param);
          }
           if(projectNameParam!=="" && projectNameParam!==undefined){

            let projectTitleUrl= projectNameParam.split('-').join('_').split(' ').join('-');
            let param="projectName="+projectTitleUrl;
            paramsArray.push(param);
          }

         
          let paramsArrayString=paramsArray.toString();
         
          let paramString=paramsArrayString.replace(/,/g,"&");

           let projectTitleLocationUrl= projectTitleLocation.split('_').join('__').split('-').join('_').split(' ').join('-').concat("-").concat(p_idLocation);

        console.log("/filter/project/"+projectTitleLocationUrl)
        homepageElements=<Redirect push to={{pathname:"/filter/project/"+projectTitleLocationUrl, search:paramString}}/>;


    }

  //show displayFilterCountryProjectPage===true
      if(displayFilterCountryProjectPage===true && countryPage===false && homepage=== false && countryProjectPage===false && homepageProjectPage===false
      && displayFilterCountryPage===false && displayFilterResults===false && displayFilterProjectPage===false 
      ){

           let paramsArray=[];


          if(countryNameParam!=="" && countryNameParam!==undefined){
            let param="countryName="+countryNameParam.split('-').join('_').split(' ').join('-');
            paramsArray.push(param);
          }
          if(unitNameParam!=="" && unitNameParam!==undefined){
            let param="unitName="+unitNameParam;
            paramsArray.push(param);
          }
          if(ongoingClosedValueParam!=="" && ongoingClosedValueParam!==undefined){
            let param="ongoingClosedValue="+ongoingClosedValueParam;
            paramsArray.push(param);
          }
          if(donorNameParam!=="" && ongoingClosedValueParam!==undefined){
            let param="donorName="+donorNameParam.split('-').join('_').split(' ').join('-');
            paramsArray.push(param);
          }
           if(projectNameParam!=="" && projectNameParam!==undefined){

            let projectTitleUrl= projectNameParam.split('-').join('_').split(' ').join('-');
            let param="projectName="+projectTitleUrl;
            paramsArray.push(param);
          }

         
          let paramsArrayString=paramsArray.toString();
         
          let paramString=paramsArrayString.replace(/,/g,"&");

           let projectTitleLocationUrl= projectTitleLocation.split('_').join('__').split('-').join('_').split(' ').join('-').concat("-").concat(p_idLocation);

            let markerLocationUrl=markerLocation.split('-').join('_').split(' ').join('-');
        
       console.log("/filter/country/"+markerLocationUrl+"/project/"+projectTitleLocationUrl)    
       homepageElements=<Redirect push to={{pathname:"/filter/country/"+markerLocationUrl+"/project/"+projectTitleLocationUrl, search:paramString}}/>;

   

    }


    return(
       
     <Router>

        <div>
          
           <Navbar resetFilterDefault={this.resetFilterDefault} resetHomeDefault={this.resetHomeDefault}/>
  
           {homepageElements} 

        <Switch>

           <Route exact path='/' render={()=> <HomePage changeHomepage={this.activateCountrypage}
                   whenHomePage={this.whenHomePage} handleDisplayProjectPage={this.handleDisplayHomePageProjectPage} pageLocation={pageLocation}/>} /> 

            <Route exact path='/home/country/:countryName' render={({match, location})=><CountryPage match={match} location={location}  
            handleDisplayProjectPage={this.handleDisplayCountryPageProjectPage}
            initializeCountryPage={this.initializeCountryPage} countryName={markerLocation} pageLocation={pageLocation} changePageLocation={this.changePageLocation}/>} />

            <Route exact path='/home/country/:countryName/project/:projectTitle'
          render={({match})=> <CountryProjectPage match={match} initializeCountryProjectPage={this.initializeCountryProjectPage}
                   projectTitleLocation={projectTitleLocation} p_idLocation={p_idLocation} countryName={markerLocation} pageLocation={pageLocation} changePageLocation={this.changePageLocation}/>} />

            <Route exact path='/home/project/:projectTitle'
          render={({match})=> <HomePageProjectPage match={match} initializeHomePageProjectPage={this.initializeHomePageProjectPage} 
                   projectTitleLocation={projectTitleLocation} p_idLocation={p_idLocation} />} />


          <Route  exact path='/filter' 

          render={({location, match})=> <FilterAppHome resetFilterDefault={this.resetFilterDefault}
                                         handleSearch={this.handleFilterSearch} displayResult={displayFilterResults} displayErrorMessage={displayErrorMessage}
                                        countryName={countryNameParam} unitName={unitNameParam} donorName={donorNameParam} ongoingClosedValue={ongoingClosedValueParam} 
                                        handleDisplayFilterCountryPage={this.handleDisplayFilterCountryPage}  projectTitle={projectNameParam}
                                        location={location} match={match} handleDisplayFilterProjectPage={this.handleDisplayFilterProjectPage} 
                                        intializeFilterDefaultHome={this.intializeFilterDefaultHome} pageLocation={pageLocation} changePageLocation={this.changePageLocation}/>} />

           <Route exact path='/filter/country/:countryName' 
                 render={({match, location})=><FilterCountryPage match={match}  location={location}
                                    countryName={countryNameParam} markerLocation={markerLocation} unitName={unitNameParam} donorName={donorNameParam} ongoingClosedValue={ongoingClosedValueParam} 
                                    handleDisplayFilterCountryProjectPage={this.handleDisplayFilterCountryProjectPage}  projectName={projectNameParam}
                                    initializeFilterCountryPage={this.initializeFilterCountryPage} pageLocation={pageLocation} changePageLocation={this.changePageLocation}/>}/>

            <Route exact path='/filter/country/:countryName/project/:projectTitle'  
                  render={(match, location)=><FilterCountryPageProjectPage match={match} location={location} markerLocation={markerLocation} countryName={countryNameParam}
                             unitName={unitNameParam} ongoingClosedValue={ongoingClosedValueParam}  donorName={donorNameParam} projectName={projectNameParam}
                                              initalizeFilterCountryProjectPage={this.initalizeFilterCountryProjectPage}
                                projectTitleLocation={projectTitleLocation} p_idLocation={p_idLocation} pageLocation={pageLocation} changePageLocation={this.changePageLocation}/>}/>

             <Route exact path='/filter/project/:projectTitle'  
                  render={(match, location)=><FilterProjectPage markerLocation={markerLocation} countryName={countryNameParam}
                             unitName={unitNameParam} ongoingClosedValue={ongoingClosedValueParam}  donorName={donorNameParam} 
                             initalizeFilterProjectPage={this.initalizeFilterProjectPage}
                              match={match} location={location} projectTitleLocation={projectTitleLocation} 
                              pageLocation={pageLocation} p_idLocation={p_idLocation} projectName={projectNameParam}/>}/>

          </Switch>
        </div>
      
    </Router>


      );
  
}
}
/*
  

          
          <Route exact path='/home/country/:countryName/project/:projectTitle'
          render={({match})=> <countryProjectPage match={match} initializeProjectPage={this.initializeProjectPage} p_id={p_id}
                   projectTitle={projectTitle} countryName={markerLocation}/>} />


         

           <Route exact path='/filter/project/:projectTitle'  
                  render={(match, location)=><FilterProjectPage countryName={markerLocation} initalizeFilterProjectPage={this.initalizeFilterProjectPage}
                               p_id={p_id} match={match} projectTitle={projectTitle} unitName={unitName} ongoingClosedValue={ongoingClosedValue} donorName={donorName} />}/>

            
*/



//controls the home page

export class HomePage extends React.Component{

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

//controls the country page
 class CountryPage extends React. Component{

constructor(props){
  super(props);

  this.state={
    pageData:[]
  }

if(this.props.countryName===''){

      this.countryName=this.props.match.params.countryName.split('-').join(' ').split('_').join('-');

      
      
    }
  if(this.props.countryName!==''){
    this.countryName=this.props.countryName;

  }

  //we restrict the initialization to when the prop.countryName is empty because we are 100% sure in this case the component has not been initialized
  props.initializeCountryPage(this.countryName);
  this.handleChangePageLocation=this.handleChangePageLocation.bind(this)

}

componentDidMount(){
  window.$.ajax({
      type:'GET',
      url: "http://localhost/projects_hub/proj_hub/public/renderCharts/analyseChartData.php",
      data:{countryName: this.countryName},
      success:function(response){
        
        let pageData=JSON.parse(response);
        getData(pageData);
      }

  })


  let  getData = data =>{




      this.setState({
         pageData: data
    });
    

  }

 if(this.props.pageLocation!==""){
   
  let pageLocation=this.props.pageLocation
   
  setTimeout(function(){

   //window.scrollTo(0, pageLocation);
   document.getElementById(pageLocation).scrollIntoView();
    }, 300);
  }
}

 handleChangePageLocation(){
      const pageLocation="mapContainer";
      this.props.changePageLocation(pageLocation)
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
     
      const {totalUnitNumber, ongoingUnitNumber, donorsEngaged, ongoingProjNumber, startYearNumber, uniqueProjNumbers}=this.state.pageData;
      
      let donorCirclesRange; //initialize

      if(uniqueProjNumbers===1){
         donorCirclesRange=[5, 30]
      }
      else{
         donorCirclesRange=[5,50];   
      }

     const projTitleColor={
        color: '#6B662A'
      }
          

     
    return (<div>

              <div className="container">
                  <div className="row" style={row_NavLinks_Style}>
                    <div className="col-sm-12">
                        <Link   to={{pathname:"/"}} 
                                style={linkColor} onClick={this.handleChangePageLocation}>
                          Home</Link>/
                     
                    </div>
                  </div>
                </div>

              <div className='container'>
                <div className='row'>

                  <div className='col-sm-4' >   
                    <h1 style={countryTitleStyle}>{this.countryName}</h1>
                  </div>
               </div>
              </div>


                 
                  <div className='container-fluid'>                 

                      <div className='row'>
                        <div className='col-sm-6' > 
                          



                          <FetchMarkersHome countryName={this.countryName} callingPage="countryPage" mapStyle={mapStyle}/>
                        </div>
                        <div className='col-sm-6' >

                             <ProjectsCard  location={this.props.location}countryName={this.countryName} callingPage="home/country" projTitleColor={projTitleColor} 
                             changePageLocation={this.props.changePageLocation}/>
                          
                            

                        </div>
                      </div>

                  </div>
                     <div className="container" >
                        <FetchSummary  fetchSummaryUrl={fetchSummaryUrl} countryName={this.countryName}/>

                          <FetchFilterCharts countryName={this.countryName} changeWebPage={this.displayFilterProjectPage} 
                             handleDisplayProjectPage={this.props.handleDisplayProjectPage}/>

                   </div> 
                   
                </div>);
  }

  
}


 class CountryProjectPage extends React.Component{

constructor(props){
  super(props);
 

  window.scrollTo(0,0); //make sure the window scrolls to top each time

  

  if(props.projectTitleLocation===""){

      let projTitleSplit=this.props.match.params.projectTitle.split('-');
      projTitleSplit.pop(); //remove the last element from the array

 
    this.projectTitle=projTitleSplit.join(' ').split('_').join('-').split('--').join('_');
    
  }
  else{
    this.projectTitle=this.props.projectTitleLocation;

  }



 if(props.p_idLocation===''){
       let projTitleSplit=this.props.match.params.projectTitle.split('-');
        this.p_idLocation=projTitleSplit.pop(); //remove the last element from the array
               
  }
  if(props.p_idLocation!==''){
    this.p_idLocation=this.props.p_idLocation;

  }


 if(props.countryName===''){
 
     this.countryName=props.match.params.countryName.split('-').join(' ').split('_').join('-');
          
  }
  if(props.countryName!==''){
    this.countryName=this.props.countryName;

  }
   
  if(props.pageLocation!==''){
    this.pageLocation=props.pageLocation;
  }
  if(props.pageLocation===''){
    this.pageLocation='';
  }

  //console.log(this.projectTitle+ this.countryName+ this.p_idLocation+ this.pageLocation)
 
  props.initializeCountryProjectPage(this.projectTitle, this.countryName, this.p_idLocation, this.pageLocation);
  this.handleChangePageLocation=this.handleChangePageLocation.bind(this)
}

 handleChangePageLocation(){
      const pageLocation="mapContainer";
      this.props.changePageLocation(pageLocation)
    }  


  render(){

    const row_NavLinks_Style={
      marginTop:'3%',
      
    }

    const linkColor={
      color: '#0093B8'
    }
 
    const markerLocationUrl=this.countryName.split('-').join('_').split(' ').join('-');
   
    return (<div> 

              <div className="container">
                  <div className="row" style={row_NavLinks_Style}>
                    <div className="col-sm-12">
                      <Link  to="/" style={linkColor} onClick={this.handleChangePageLocation} >Home</Link> /
                      <Link  to={`/home/country/${markerLocationUrl}`} style={linkColor}> {this.countryName}</Link>
                    </div>
                  </div>            
                 </div>  
                
                  <FetchProjectDetails project_title={this.projectTitle}  p_idLocation={this.p_idLocation} countryName={this.countryName}/>  
              
                
 
            
             


        </div>);
  }
}


export default Default;

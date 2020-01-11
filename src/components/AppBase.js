import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";


import { useStoreState, useStoreActions } from 'easy-peasy';
import  "../styles/App.scss";
import Navbar from "./Navbar.js"; //import the navbar
import FilterAppHome from "./FilterAppHome.js";
import FilterCountryPage from "./FilterCountryPage.js";
import FilterProjectPage from "./FilterProjectPage.js";
import FilterCountryPageProjectPage from "./FilterCountryPageProjectPage.js";
import HomePageProjectPage from "./HomePageProjectPage.js";//get the ProjectsPerGroupChart
import HomePage from "./HomePage";
import CountryProjectPage from './CountryProjectPage.js';
import CountryPage from './CountryPage.js';

//controls the app functionality
 function AppBase(props){

    let  homepageElements;


     
          


   
    const homepage = useStoreState(state => state.appStore.homepage);
    const countryPage = useStoreState(state => state.appStore.countryPage);

    const countryProjectPage = useStoreState(state => state.appStore.countryProjectPage);
    const homepageProjectPage = useStoreState(state => state.appStore.homepageProjectPage);

    const projectTitleLocation=useStoreState(state => state.appStore.projectTitleLocation)
    const p_idLocation=useStoreState(state => state.appStore.p_idLocation)

    const markerLocation = useStoreState(state => state.appStore.markerLocation);
    const pageLocation = useStoreState(state => state.appStore.pageLocation);

    const displayFilterCountryPage = useStoreState(state => state.appStore.displayFilterCountryPage);
    const displayFilterResults = useStoreState(state => state.appStore.displayFilterResults);
    const displayErrorMessage = useStoreState(state => state.appStore.displayErrorMessage);

    const displayFilterCountryProjectPage=useStoreState(state => state.appStore.displayFilterCountryProjectPage);
    const displayFilterProjectPage=useStoreState(state => state.appStore.displayFilterProjectPage);


    const countryNameParam = useStoreState(state => state.appStore.searchFilterParams.countryNameParam);
    const projectNameParam = useStoreState(state => state.appStore.searchFilterParams.projectNameParam);
    const unitNameParam = useStoreState(state => state.appStore.searchFilterParams.unitNameParam);
    const ongoingClosedValueParam = useStoreState(state => state.appStore.searchFilterParams.ongoingClosedValueParam);
    const donorNameParam = useStoreState(state => state.appStore.searchFilterParams.donorNameParam);


    /*Actions*/

    const activateCountrypage= useStoreActions(actions => actions.activateCountrypage);
    const whenHomePage = useStoreActions(actions => actions.whenHomePage);
    const handleDisplayHomePageProjectPage = useStoreActions(actions => actions.handleDisplayHomePageProjectPage);

    const resetFilterApp = useStoreActions(actions => actions.resetFilterApp);
    const resetHomeApp = useStoreActions(actions => actions.resetHomeApp);

    const handleFilterSearch = useStoreActions(actions => actions.handleFilterSearch);

    const handleDisplayFilterCountryProjectPage = useStoreActions(actions=> actions.handleDisplayFilterCountryProjectPage);
    const handleDisplayFilterCountryPage = useStoreActions(actions => actions.handleDisplayFilterCountryPage);
    const handleDisplayFilterProjectPage = useStoreActions(actions => actions.handleDisplayFilterProjectPage); 


    const intializeFilterAppHome = useStoreActions(actions => actions.intializeFilterAppHome);
    const initializeFilterCountryPage= useStoreActions(actions => actions.initializeFilterCountryPage);
    const initalizeFilterProjectPage=useStoreActions(actions => actions.initalizeFilterProjectPage);
    const initalizeFilterCountryProjectPage =  useStoreActions(actions => actions.initalizeFilterCountryProjectPage);

    const changePageLocation = useStoreActions(actions => actions.changePageLocation);

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

          homepageElements=<Redirect push to={{pathname: "/home/project/"+projectTitleLocationUrl}}/>;

    }
//Display the countryProjectPage

if(countryPage===false && homepage=== false && countryProjectPage===true && homepageProjectPage===false
  && displayFilterCountryPage===false && displayFilterResults===false && displayFilterProjectPage===false 
  && displayFilterCountryProjectPage===false ){

          let projectTitleLocationUrl= projectTitleLocation.split('_').join('__').split('-').join('_').split(' ').join('-').concat("-").concat(p_idLocation);

          let markerLocationUrl=markerLocation.split('-').join('_').split(' ').join('-');

      
        homepageElements=<Redirect push to={{pathname:"/home/country/"+markerLocationUrl+"/project/"+projectTitleLocationUrl}}/>;


    }


    //if the displayfilterResults is set to false, make sure the url reads just /filter. 
    //This was mostly because of the event you click the clearAll button,

    //Display filter home page

    if((countryPage===false && homepage=== false && countryProjectPage===false && homepageProjectPage===false
        && displayFilterCountryPage===false && displayFilterResults===false && displayFilterProjectPage===false && displayFilterCountryProjectPage===false)
        || displayErrorMessage===true){

      homepageElements=<Redirect push to="/filter"/>

    }

  





      //if the displayFilter results is set to true. So when the search button has been clicked.
    if(countryPage===false && homepage=== false && countryProjectPage===false && homepageProjectPage===false
      && displayFilterCountryPage===false && displayFilterResults===true && displayFilterProjectPage===false && displayFilterCountryProjectPage===false 
      && displayErrorMessage===false){

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
      && displayFilterCountryProjectPage===false && displayErrorMessage===false){

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

    if(countryPage===false && homepage=== false && countryProjectPage===false && homepageProjectPage===false
      && displayFilterCountryPage===false && displayFilterResults===false  && displayErrorMessage===false && displayFilterProjectPage===true 
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

    
        
        homepageElements=<Redirect push to={{pathname:"/filter/project/"+projectTitleLocationUrl, search:paramString}}/>;


    }

  //displayFilterCountryProjectPage
      if(countryPage===false && homepage=== false && countryProjectPage===false && homepageProjectPage===false
      && displayFilterCountryPage===false && displayFilterResults===false && displayErrorMessage===false &&  displayFilterProjectPage===false 
      && displayFilterCountryProjectPage===true ){

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
          
        
 
        homepageElements=<Redirect push to={{pathname:"/filter/country/"+markerLocationUrl+"/project/"+projectTitleLocationUrl, search:paramString}}/>;

  

    }


    return(
      
    <Router>

        <div>
          
        <Navbar resetFilterApp={resetFilterApp} resetHomeApp={resetHomeApp}/> 
  
          {homepageElements} 

          
        <Route exact path='/' render={()=> <HomePage changeHomepage={activateCountrypage}  countryName={countryNameParam}
          unitName={unitNameParam} ongoingClosedValue={ongoingClosedValueParam}  donorName={donorNameParam} projectName={projectNameParam}
          whenHomePage={whenHomePage} handleDisplayProjectPage={handleDisplayHomePageProjectPage} pageLocation={pageLocation}/>} /> 

          
       <Route exact path='/filter' 
        render={({location, match})=> <FilterAppHome resetFilterApp={resetFilterApp}
                                    handleSearch={handleFilterSearch} displayResult={displayFilterResults} displayErrorMessage={displayErrorMessage}
                                    countryName={countryNameParam} unitName={unitNameParam} donorName={donorNameParam} ongoingClosedValue={ongoingClosedValueParam} 
                                    handleDisplayFilterCountryPage={handleDisplayFilterCountryPage}  projectTitle={projectNameParam}
                                    location={location} match={match} handleDisplayFilterProjectPage={handleDisplayFilterProjectPage} 
                                    intializeFilterAppHome={intializeFilterAppHome} pageLocation={pageLocation} changePageLocation={changePageLocation}/>}/>

       <Route exact path='/filter/project/:projectTitle'  
            render={(match, location)=><FilterProjectPage markerLocation={markerLocation} countryName={countryNameParam}
                            unitName={unitNameParam} ongoingClosedValue={ongoingClosedValueParam}  donorName={donorNameParam} 
                            initalizeFilterProjectPage={initalizeFilterProjectPage}
                              match={match} location={location} projectTitleLocation={projectTitleLocation} 
                              pageLocation={pageLocation} p_idLocation={p_idLocation} projectName={projectNameParam}/>}/>

        <Route exact path='/filter/country/:countryName' 
            render={({match, location})=><FilterCountryPage match={match}  location={location}
                                countryName={countryNameParam} markerLocation={markerLocation} unitName={unitNameParam} donorName={donorNameParam} ongoingClosedValue={ongoingClosedValueParam} 
                                handleDisplayFilterCountryProjectPage={handleDisplayFilterCountryProjectPage}  projectName={projectNameParam}
                                initializeFilterCountryPage={initializeFilterCountryPage} pageLocation={pageLocation} changePageLocation={changePageLocation}/>}/>

            <Route exact path='/filter/country/:countryName/project/:projectTitle'  
                  render={(match, location)=><FilterCountryPageProjectPage match={match} location={location} markerLocation={markerLocation} countryName={countryNameParam}
                            unitName={unitNameParam} ongoingClosedValue={ongoingClosedValueParam}  donorName={donorNameParam} projectName={projectNameParam}
                                              initalizeFilterCountryProjectPage={initalizeFilterCountryProjectPage}
                                projectTitleLocation={projectTitleLocation} p_idLocation={p_idLocation} pageLocation={pageLocation} changePageLocation={changePageLocation}/>}/>

  

        </div>
      
    </Router>


      );
  

}
/*
 <Navbar resetFilterApp={this.resetFilterApp} resetHomeApp={this.resetHomeApp}/>
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


 

*/


export default AppBase;


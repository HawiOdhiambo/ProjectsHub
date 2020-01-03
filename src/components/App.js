import React from 'react';

import  "../App.scss";

import {BrowserRouter as Router, Route, Redirect} from "react-router-dom"
//import { HashLink as Link } from 'react-router-hash-link';
import Navbar from "./Navbar.js"; //import the navbar
import FilterAppHome from "./FilterAppHome.js";
import FilterCountryPage from "./FilterCountryPage.js";
import FilterProjectPage from "./FilterProjectPage.js";
import FilterCountryPageProjectPage from "./FilterCountryPageProjectPage.js";
import HomePageProjectPage from "./HomePageProjectPage.js";//get the ProjectsPerGroupChart
import HomePage from "./HomePage";
import CountryProjectPage from './CountryProjectPage.js';
import CountryPage from './CountryPage.js';

//contrrols the app functionality
class App extends React.Component{
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


    this.resetFilterApp=this.resetFilterApp.bind(this);
    this.resetHomeApp=this.resetHomeApp.bind(this)

    this.initalizeFilterProjectPage=this.initalizeFilterProjectPage.bind(this)
    this.intializeFilterAppHome=this.intializeFilterAppHome.bind(this)
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
     displayFilterProjectPage:false,  displayFilterCountryProjectPage:false, pageLocation: pageLocation })

  }

        //onclick projectName in countryPage
  handleDisplayCountryPageProjectPage(projectTitle, p_id, pageLocation){
     
      this.setState({homepage:false, countryPage: false, countryProjectPage: true, homepageProjectPage: false, 
          projectTitleLocation:projectTitle, p_idLocation:p_id, pageLocation: pageLocation, 
         displayFilterCountryPage:false, displayFilterResults:false, displayFilterCountryProjectPage:false, displayFilterProjectPage:false })

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


  //assist in initializing the filter appHome


  intializeFilterAppHome(){
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

    this.setState({homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: false, 
      displayFilterCountryPage:false, displayFilterResults:false, 
      displayFilterProjectPage:true,  displayFilterCountryProjectPage:false,
       markerLocation: '', projectTitleLocation:projectTitle, p_idLocation:p_id, pageLocation: pageLocation});
  }

  handleDisplayFilterCountryProjectPage(projectTitle, p_id, pageLocation){

     this.setState({homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: false, 
      displayFilterCountryPage:false, displayFilterResults:false, 
      displayFilterProjectPage:false,  displayFilterCountryProjectPage:true,
        projectTitleLocation:projectTitle, p_idLocation:p_id, pageLocation: pageLocation});
       
  }


  //returns the filter App component to its default state
  resetFilterApp(){
  
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

  resetHomeApp(){

     this.setState({ pageLocation: ''});//reset the page location

   
  }


 render(){


 
   let  homepageElements;
   const { homepage,countryPage,countryProjectPage, homepageProjectPage,
    projectTitleLocation, markerLocation, p_idLocation, pageLocation,
    displayFilterCountryPage, displayFilterResults, displayErrorMessage, displayFilterProjectPage, displayFilterCountryProjectPage }=this.state;

    const {countryNameParam, projectNameParam, unitNameParam, ongoingClosedValueParam, donorNameParam}=this.state.searchFilterParams
    


 
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

        console.log("/filter/project/"+projectTitleLocationUrl)
        console.log(this.state);   
        
        homepageElements=<Redirect push to={{pathname:"/filter/project/"+projectTitleLocationUrl, search:paramString}}/>;


    }

  //
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
          
         
        console.log( "/filter/country/"+markerLocationUrl+"/project/"+projectTitleLocationUrl)
        console.log(this.state);  
        homepageElements=<Redirect push to={{pathname:"/filter/country/"+markerLocationUrl+"/project/"+projectTitleLocationUrl, search:paramString}}/>;

   

    }


    return(
       
     <Router>

        <div>
          
           <Navbar resetFilterApp={this.resetFilterApp} resetHomeApp={this.resetHomeApp}/>
  
           {homepageElements} 

          

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

          render={({location, match})=> <FilterAppHome resetFilterApp={this.resetFilterApp}
                                         handleSearch={this.handleFilterSearch} displayResult={displayFilterResults} displayErrorMessage={displayErrorMessage}
                                        countryName={countryNameParam} unitName={unitNameParam} donorName={donorNameParam} ongoingClosedValue={ongoingClosedValueParam} 
                                        handleDisplayFilterCountryPage={this.handleDisplayFilterCountryPage}  projectTitle={projectNameParam}
                                        location={location} match={match} handleDisplayFilterProjectPage={this.handleDisplayFilterProjectPage} 
                                        intializeFilterAppHome={this.intializeFilterAppHome} pageLocation={pageLocation} changePageLocation={this.changePageLocation}/>} />

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












export default App;

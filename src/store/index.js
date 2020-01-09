import { createStore, action } from 'easy-peasy';

/*export const store= createStore({
    filters: {
        projects: [],
        countryNameParam: '',
        projectNameParam:'',
        unitNameParam:'',
        ongoingClosedValueParam: true,
        donorNameParam:''
    }

});*/

const storeModel ={
   appStore:{
          homepage:true,
          countryPage:false,
          countryProjectPage:false, 
          homepageProjectPage:false,

         
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
       },

   activateCountrypage: action((state, event)=>{


      let element=event.target;
      let markerLocation=element.getAttribute('markerlocation');

     state.appStore={homepage:false, countryPage: true, countryProjectPage: false, homepageProjectPage: false, displayFilterCountryPage:false, displayFilterResults:false,
     displayFilterProjectPage:false,  displayFilterCountryProjectPage:false, markerLocation: markerLocation, pageLocation: ''} 

   }),
    handleDisplayHomePageProjectPage:action((state, {projectTitle, p_id, pageLocation})=>{
     
        state.appStore={homepageProjectPage: true, projectTitleLocation:projectTitle, p_idLocation:p_id, homepage:false, countryPage: false, countryProjectPage: false, displayFilterCountryPage:false, displayFilterResults:false,
         displayFilterProjectPage:false,  displayFilterCountryProjectPage:false, pageLocation: pageLocation }

     }),

        //onclick projectName in countryPage
      handleDisplayCountryPageProjectPage: action((state, {projectTitle, p_id, pageLocation})=>{
         
           state.appStore={homepage:false, countryPage: false, countryProjectPage: true, homepageProjectPage: false, 
              projectTitleLocation:projectTitle, p_idLocation:p_id, pageLocation: pageLocation, 
             displayFilterCountryPage:false, displayFilterResults:false, displayFilterCountryProjectPage:false, displayFilterProjectPage:false }

      }),
      //set the state markerLocation to  the marker location entered in the url.
      initializeCountryPage: action((state, markerLocation)=>{

         state.appStore={homepage:false, countryPage: true, countryProjectPage: false, homepageProjectPage: false, displayFilterCountryPage:false,displayFilterResults:false,
         displayFilterProjectPage:false,  displayFilterCountryProjectPage:false, projectTitleLocation:"", p_idLocation: "", markerLocation: markerLocation}

      }),

      //initiialize the project page
      initializeCountryProjectPage: action((state, {project_title, markerLocation, p_idLocation, pageLocation}) => {
        
        state.appStore={homepage:false, countryPage: false, countryProjectPage:true, homepageProjectPage: false, 

                displayFilterCountryPage:false,displayFilterResults:false, displayFilterProjectPage:false,  displayFilterCountryProjectPage:false, 

              projectTitleLocation: project_title, p_idLocation: p_idLocation, markerLocation: markerLocation, pageLocation: pageLocation}

     }),

     //initializes the homepage
      whenHomePage:action((state) => {

        state.appStore={homepage:true, countryPage: false, countryProjectPage:false, homepageProjectPage: false, displayFilterCountryPage:false,displayFilterResults:false,
         displayFilterProjectPage:false,  displayFilterCountryProjectPage:false, projectTitleLocation:"", p_idLocation: "", markerLocation: ""};
      }),

      initializeHomePageProjectPage:action((state, {projectTitle, p_idLocation}) => {
         state.appStore={homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: true, displayFilterCountryPage:false,displayFilterResults:false,
         displayFilterProjectPage:false,  displayFilterCountryProjectPage:false, projectTitleLocation:projectTitle, p_idLocation: p_idLocation, markerLocation: ""};

      }),


      //assist in initializing the filter appHome
      intializeFilterAppHome:action((state) => {
        
         state.appStore.countryPage = false;
         state.appStore.homepage =  false;
         state.appStore.countryProjectPage = false;
         state.appStore.homepageProjectPage=  false;
         state.appStore.displayFilterCountryPage = false;
         state.appStore.displayFilterResults = false;
         state.appStore.displayFilterProjectPage = false;
         state.appStore.displayFilterCountryProjectPage = false; 
         state.appStore.markerLocation = '';
         state.appStore.p_idLocation =  '';
         state.appStore.projectTitleLocation= ''
      }),

        //initialize the filter CountryPage
      initializeFilterCountryPage:action((state,{markerLocation, countryName, unitName, ongoingClosedValue, donorName, projectName}) => {

        state.appStore={homepage:false, countryPage: false, countryProjectPage:false,  homepageProjectPage: false, displayFilterCountryPage:true, displayFilterResults:false, 
          displayFilterProjectPage:false,  displayFilterCountryProjectPage:false,
             markerLocation: markerLocation, p_idLocation: '', projectTitleLocation:'',

          searchFilterParams:{ countryNameParam: countryName, unitNameParam: unitName, ongoingClosedValueParam:ongoingClosedValue, 
                       donorNameParam: donorName, projectNameParam:projectName}};
      }),
          //initialize the filter CountryProjectPage
      initalizeFilterCountryProjectPage:action((state, {markerLocation, pageLocation, countryName, unitName, ongoingClosedValue, donorName, projectName, projectTitleLocation}) => {
        
         state.appStore={homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: false, displayFilterCountryPage:false, displayFilterResults:false, 
          displayFilterProjectPage: false, displayFilterCountryProjectPage:true,
           projectTitleLocation:projectTitleLocation, markerLocation: markerLocation, p_idLocation: '', pageLocation: pageLocation,

          searchFilterParams:{countryNameParam: countryName, unitNameParam: unitName, ongoingClosedValueParam:ongoingClosedValue, 
                       donorNameParam: donorName, projectNameParam:projectName}
          };
      }
    ),

        //initialize the filter Project Page 
      initalizeFilterProjectPage:action((state, {projectTitleLocation, p_idLocation, pageLocation, countryName, unitName, ongoingClosedValue, donorName, projectName}) => {
      

        state.appStore={homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: false, displayFilterCountryPage:false, displayFilterResults:false, 
          displayFilterProjectPage: true,  displayFilterCountryProjectPage:false, displayErrorMessage:false,
          projectTitleLocation:projectTitleLocation, markerLocation:'', p_idLocation: p_idLocation, pageLocation: pageLocation,

          searchFilterParams:{ countryNameParam: countryName, unitNameParam: unitName, ongoingClosedValueParam:ongoingClosedValue, 
                       donorNameParam: donorName, projectNameParam:projectName}
        };
      }),


      //assists in the displaying of the information requested in the filter
      handleFilterSearch: action((state, {countryName, unitName, ongoingClosedValue, donorName, projectName, p_id}) => {

        if(countryName!==''|| unitName!=='' || ongoingClosedValue !=='' || donorName!=='' || projectName!==''){

            state.appStore={homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: false, displayFilterCountryPage:false,  displayFilterResults: true,
                       displayFilterProjectPage:false,  displayFilterCountryProjectPage:false, displayErrorMessage:false,

                       searchFilterParams:{ countryNameParam: countryName, unitNameParam: unitName, ongoingClosedValueParam:ongoingClosedValue, 
                       donorNameParam: donorName, projectNameParam:projectName},

                       markerLocation:'', projectTitleLocation:'', p_idLocation: '',  pageLocation: ''

                      };//enables the results of the search to show on the screen
        }
        else{

             state.appStore={homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: false, displayFilterCountryPage:false,  displayFilterResults: false,
                       displayFilterProjectPage:false,  displayFilterCountryProjectPage:false, displayErrorMessage:true,

                       searchFilterParams:{ countryNameParam: countryName, unitNameParam: unitName, ongoingClosedValueParam:ongoingClosedValue, 
                       donorNameParam: donorName, projectNameParam:projectName},

                       markerLocation:'', projectTitleLocation:'', p_idLocation: '',  pageLocation: ''

                      };//enables error message to show on the screen
        }
      
     
      }),

      //assist in the displaying of the filter country page
      handleDisplayFilterCountryPage: action((state, countryName)=>{
        

         state.appStore={homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: false, 
          displayFilterCountryPage:true, displayFilterResults:false, 
          displayFilterProjectPage:false,  displayFilterCountryProjectPage:false,
           markerLocation: countryName, projectTitleLocation:'', p_idLocation: '', pageLocation: ''};
      }), 

      //assist in displaying filterPageProjectPage

      handleDisplayFilterProjectPage: action((state, {project_title, p_id, pageLocation}) =>{


        state.appStore.homepage=false;
        state.appStore.countryPage= false;
        state.appStore.countryProjectPage=false; 
        state.appStore.homepageProjectPage= false;

        state.appStore.displayFilterCountryPage=false;
        state.appStore. displayFilterResults=false; 

        state.appStore.displayFilterProjectPage=true; 
        state.appStore.displayFilterCountryProjectPage=false;

        state.appStore.markerLocation= '';
        state.appStore.projectTitleLocation=project_title;
        state.appStore.p_idLocation=p_id;
        state.appStore.pageLocation= pageLocation;
      }
    ),

      handleDisplayFilterCountryProjectPage: action((state, {projectTitle, p_id, pageLocation})=>{

        state.appStore={homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: false, 
          displayFilterCountryPage:false, displayFilterResults:false, 
          displayFilterProjectPage:false,  displayFilterCountryProjectPage:true,
            projectTitleLocation:projectTitle, p_idLocation:p_id, pageLocation: pageLocation};
           
      }),

      //returns the filter App component to its default state
      resetFilterApp:action((state)=>{
      
        state.appStore={homepage:false, countryPage: false, countryProjectPage:false, homepageProjectPage: false, 
        displayFilterCountryPage:false,  displayFilterResults:false, displayErrorMessage:false,
        displayFilterProjectPage:false,  displayFilterCountryProjectPage:false,


         searchFilterParams:{ countryNameParam: '', unitNameParam: '', ongoingClosedValueParam:'', 
                       donorNameParam: '', projectNameParam:''},

                       markerLocation:'', projectTitleLocation:'', p_idLocation: '', pageLocation: ''};//enables the results of the search to show on the screen

      }),

      changePageLocation: action((state, pageLocation)=>{
        state.appStore.pageLocation= pageLocation;

      }),

      resetHomeApp: action((state) => {
        
        state.appStore.pageLocation='';
       
      })

   
}

export const store= createStore(storeModel);

import { createStore, action } from 'easy-peasy';
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

      state.appStore.homepage = false;
      state.appStore.countryPage = true;
      state.appStore.countryProjectPage = false;
      state.appStore.homepageProjectPage = false;
      state.appStore.displayFilterCountryPage =false;
      state.appStore.displayFilterResults =false;
      state.appStore.displayFilterProjectPage =false;
      state.appStore.displayFilterCountryProjectPage =false; 
      state.appStore.markerLocation = markerLocation;
      state.appStore.pageLocation = '';
    
   }),

    handleDisplayHomePageProjectPage:action((state, {project_title, p_id, pageLocation})=>{
     
        state.appStore.homepageProjectPage =  true;
        state.appStore.projectTitleLocation = project_title;
        state.appStore.p_idLocation = p_id;
        state.appStore.homepage = false;
        state.appStore.countryPage =  false;
        state.appStore.countryProjectPage =  false;
        state.appStore.displayFilterCountryPage = false;
        state.appStore.displayFilterResults = false;
        state.appStore.displayFilterProjectPage = false;  
        state.appStore.displayFilterCountryProjectPage = false;
        state.appStore.pageLocation =  pageLocation;

     }),

        //onclick projectName in countryPage
      handleDisplayCountryPageProjectPage: action((state, {project_title, p_id, pageLocation})=>{
         
           state.appStore.homepage = false;
           state.appStore.countryPage =  false;
           state.appStore.countryProjectPage =  true;
           state.appStore.homepageProjectPage =  false; 
           state.appStore.projectTitleLocation = project_title;
           state.appStore.p_idLocation = p_id;
           state.appStore.pageLocation =  pageLocation;

           state.appStore.displayFilterCountryPage = false;
           state.appStore.displayFilterResults = false;
           state.appStore.displayFilterCountryProjectPage = false;
           state.appStore.displayFilterProjectPage = false;

      }),
      //set the state markerLocation to  the marker location entered in the url.
      initializeCountryPage: action((state, markerLocation)=>{

         state.appStore.homepage = false;
         state.appStore.countryPage =  true;
         state.appStore.countryProjectPage =  false;
         state.appStore.homepageProjectPage =  false;
         state.appStore.displayFilterCountryPage = false;
         state.appStore.displayFilterResults = false;

         state.appStore.displayFilterProjectPage = false; 
         state.appStore.displayFilterCountryProjectPage = false;
         state.appStore.projectTitleLocation = "";

         state.appStore.p_idLocation =  "";
         state.appStore.markerLocation =  markerLocation;

      }),

      //initiialize the project page
      initializeCountryProjectPage: action((state, {project_title, markerLocation, p_idLocation, pageLocation}) => {
        
        state.appStore.homepage = false;
        state.appStore.countryPage =  false; 
        state.appStore.countryProjectPage = true;
        state.appStore.homepageProjectPage =  false;
        state.appStore.displayFilterCountryPage = false;
        state.appStore.displayFilterResults = false;
        state.appStore.displayFilterProjectPage = false;
        state.appStore.displayFilterCountryProjectPage = false; 

        state.appStore.projectTitleLocation = project_title;
        state.appStore.p_idLocation =  p_idLocation;
        state.appStore.markerLocation =  markerLocation;
        state.appStore.pageLocation =  pageLocation;

     }),

     //initializes the homepage
      whenHomePage:action((state) => {

        state.appStore.homepage = true; 
        state.appStore.countryPage =  false; 
        state.appStore.countryProjectPage = false;
        state.appStore.homepageProjectPage =  false;
        state.appStore.displayFilterCountryPage = false;
        state.appStore.displayFilterResults = false;
        state.appStore.displayFilterProjectPage = false;
        state.appStore.displayFilterCountryProjectPage = false;
        state.appStore.projectTitleLocation = "";
        state.appStore.p_idLocation =  "";
        state.appStore.markerLocation =  "";
      }),

      initializeHomePageProjectPage:action((state, {projectTitle, p_idLocation}) => {
         state.appStore.homepage = false;
         state.appStore.countryPage =  false;
         state.appStore.countryProjectPage = false; 
         state.appStore.homepageProjectPage =  true; 
         state.appStore.displayFilterCountryPage = false;
         state.appStore.displayFilterResults = false;
         state.appStore.displayFilterProjectPage = false;  
         state.appStore.displayFilterCountryProjectPage = false;
         state.appStore.projectTitleLocation = projectTitle;
         state.appStore.p_idLocation =  p_idLocation; 
         state.appStore.markerLocation =  "";

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

        state.appStore.homepage = false;
        state.appStore.countryPage =  false; 
        state.appStore.countryProjectPage = false;
        state.appStore.homepageProjectPage =  false;

        state.appStore.displayFilterCountryPage = true; 
        state.appStore.displayFilterResults = false; 
        state.appStore.displayFilterProjectPage = false;
        state.appStore.displayFilterCountryProjectPage = false;

        state.appStore.markerLocation =  markerLocation;
        state.appStore.p_idLocation =  '';
        state.appStore.projectTitleLocation = '';

        state.appStore.searchFilterParams = { countryNameParam: countryName, unitNameParam: unitName, ongoingClosedValueParam:ongoingClosedValue, 
                       donorNameParam: donorName, projectNameParam:projectName};
      }),
          //initialize the filter CountryProjectPage
      initalizeFilterCountryProjectPage:action((state, {markerLocation, pageLocation, countryName, unitName, ongoingClosedValue, donorName, projectName, projectTitleLocation, p_idLocation}) => {
        
         state.appStore.homepage = false; 
         state.appStore.countryPage =  false;
         state.appStore.countryProjectPage = false;
         state.appStore.homepageProjectPage =  false;
         state.appStore.displayFilterCountryPage = false;
         state.appStore.displayFilterResults = false; 
         state.appStore.displayFilterProjectPage =  false; 
         state.appStore.displayFilterCountryProjectPage = true;
         state.appStore.projectTitleLocation = projectTitleLocation;
         state.appStore.markerLocation =  markerLocation;
         state.appStore.p_idLocation =  p_idLocation; 
         state.appStore.pageLocation =  pageLocation;

          state.appStore.searchFilterParams = {countryNameParam: countryName, unitNameParam: unitName, ongoingClosedValueParam:ongoingClosedValue, 
                       donorNameParam: donorName, projectNameParam:projectName};
         
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

            state.appStore.homepage = false; 
            state.appStore.countryPage =  false; 
            state.appStore.countryProjectPage = false;
            state.appStore.homepageProjectPage =  false;

            state.appStore.displayFilterCountryPage = false;
            state.appStore.displayFilterResults =  true;
            state.appStore.displayFilterProjectPage = false;
            state.appStore.displayFilterCountryProjectPage = false;
            state.appStore.displayErrorMessage = false;


            state.appStore.searchFilterParams = {countryNameParam: countryName, unitNameParam: unitName, ongoingClosedValueParam:ongoingClosedValue, 
             donorNameParam: donorName, projectNameParam:projectName};

             state.appStore.markerLocation = '';
             state.appStore.projectTitleLocation = '';
             state.appStore.p_idLocation =  '';
             state.appStore.pageLocation =  '';
            
        }
        else{

            state.appStore.homepage = false; 
            state.appStore.countryPage =  false; 
            state.appStore.countryProjectPage = false;
            state.appStore.homepageProjectPage =  false;

            state.appStore.displayFilterCountryPage = false;
            state.appStore.displayFilterResults =  false;
            state.appStore.displayFilterProjectPage = false;
            state.appStore.displayFilterCountryProjectPage = false;
            state.appStore.displayErrorMessage = true;


            state.appStore.searchFilterParams = {countryNameParam: countryName, unitNameParam: unitName, ongoingClosedValueParam:ongoingClosedValue, 
             donorNameParam: donorName, projectNameParam:projectName};

             state.appStore.markerLocation = '';
             state.appStore.projectTitleLocation = '';
             state.appStore.p_idLocation =  '';
             state.appStore.pageLocation =  '';
        }
      
     
      }),

      //assist in the displaying of the filter country page
      handleDisplayFilterCountryPage: action((state, {countryName})=>{
        

        state.appStore.homepage = false;
        state.appStore.countryPage =  false;
        state.appStore.countryProjectPage = false;
        state.appStore.homepageProjectPage =  false; 

        state.appStore.displayFilterCountryPage = true;
        state.appStore.displayFilterResults = false; 

        state.appStore.displayFilterProjectPage = false;
        state.appStore.displayFilterCountryProjectPage = false;

        state.appStore.markerLocation =  countryName;
        state.appStore.projectTitleLocation = '';
        state.appStore.p_idLocation =  '';
        state.appStore.pageLocation =  '';
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

      handleDisplayFilterCountryProjectPage: action((state, {projectTitle, p_id, pageLocation}) => {

        state.appStore.homepage = false;
        state.appStore.countryPage= false; 
        state.appStore.countryProjectPage=false;
        state.appStore.homepageProjectPage= false;

        state.appStore.displayFilterCountryPage=false;
        state.appStore.displayFilterResults=false; 

        state.appStore.displayFilterProjectPage=false; 
        state.appStore.displayFilterCountryProjectPage=true;

        state.appStore.projectTitleLocation=projectTitle;
        state.appStore.p_idLocation=p_id;
        state.appStore.pageLocation= pageLocation;
           
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

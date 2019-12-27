 import React from 'react';
 import {Link} from "react-router-dom"

import FetchProjectDetails from "./FetchProjectDetails.js"; //import the project details

 class FilterCountryPageProjectPage extends React.Component{

constructor(props){
  super(props);
            
//initalize values
  this.markerLocation='';
  this.projectTitleLocation='';
  this.countryName='';
  this.unitName='';
  this.ongoingClosedValue='';
  this.donorName='';
  this.projectName=''; 

//if markerlocation isn't set, get it from url
if(props.markerLocation===''){
  this.markerLocation=this.props.match.match.params.countryName.split('-').join(' ').split('_').join('-');;
        
   }
if(props.markerLocation!==''){
  this.markerLocation=this.props.markerLocation;

}






    //if the property countryName is set, assign it to the variable this.unitName
  if(props.countryName!==''){
    this.countryName=props.countryName
  }


  //if the property countryName is empty but the url has a parameter
  if(props.countryName==='' && props.match.location.search!=='' ){

       
         let params = new URLSearchParams(props.match.location.search);

         if(params.get('countryName')===null){
          
           this.countryName='';

         }
         if(params.get('countryName')!==null){

        
            this.countryName=params.get('countryName').split('-').join(' ').split('_').join('-'); 

         }

    }


    //if the property unitName is set, assign it to the variable this.unitName
  if(props.unitName!==''){
    this.unitName=props.unitName
  }


  //if the property UnitName is empty but the url has a parameter
  if(props.unitName==='' && props.match.location.search!==''){

         let params = new URLSearchParams(props.match.location.search);

         if(params.get('unitName')===null){
          
           this.unitName='';

         }
         if(params.get('unitName')!==null){

            this.unitName=params.get('unitName')

         }

    }

              //if the property unitName is set, assign it to the variable this.unitName
  if(props.ongoingClosedValue!==''){
    this.ongoingClosedValue=props.ongoingClosedValue
  }


  //if the property UnitName is empty but the url has a parameter
  if(props.ongoingClosedValue==='' && props.match.location.search!==''){

     let params = new URLSearchParams(props.match.location.search);

     if(params.get('ongoingClosedValue')===null){
      
       this.ongoingClosedValue='';

     }
     if(params.get('ongoingClosedValue')!==null){

        this.ongoingClosedValue=params.get('ongoingClosedValue')

     }

   }



   if(props.donorName!==''){
    this.donorName=props.donorName
  }

  //if the property donorName is empty but the url has a parameter
  if(props.donorName==='' && props.match.location.search!==''){

         let params = new URLSearchParams(props.match.location.search);

         if(params.get('donorName')===null){
          
           this.donorName='';

         }
         if(params.get('donorName')!==null){

            this.donorName=params.get('donorName').split('-').join(' ').split('_').join('-'); 

         }

    }

  if(props.projectName!==''){

    this.projectName=this.props.projectName;
  }

  //if the property projectTitle is empty but the url has a parameter
  if(props.projectName==='' && props.match.location.search!=='' ){

         let params = new URLSearchParams(props.match.location.search);

         if(params.get('projectName')===null){
          
           this.projectName='';

         }
         if(params.get('projectName')!==null){

            let projectTitleUrl=params.get('projectName');
           
           
            this.projectName=projectTitleUrl.split('-').join(' ').split('_').join('-');

         }

    }

   if(props.projectTitleLocation===""){

    let projTitleSplit=this.props.match.match.params.projectTitle.split('-');
     projTitleSplit.pop(); //remove the last element from the array
      
    this.projectTitleLocation=projTitleSplit.join(' ').split('_').join('-').split('--').join('_');

  }
  else{
    this.projectTitleLocation=this.props.projectTitleLocation;

  }



 if(props.p_idLocation===''){
    
    let projTitleSplit=this.props.match.match.params.projectTitle.split('-');
    this.p_idLocation=projTitleSplit.pop(); //remove the last element from the array
               
  }
  if(props.p_idLocation!==''){
    this.p_idLocation=this.props.p_idLocation;

  }
   

  if(props.pageLocation===""){
      this.pageLocation="";
  }
  if(props.pageLocation!==""){
      this.pageLocation=props.pageLocation
  }
   


 

 

   // console.log(this.markerLocation +this.pageLocation+this.countryName+this.unitName+this.ongoingClosedValue+ this.donorName+this.projectName+ this.projectTitleLocation)
   props.initalizeFilterCountryProjectPage(this.markerLocation, this.pageLocation, this.countryName, this.unitName, this.ongoingClosedValue,  this.donorName, this.projectName, this.projectTitleLocation);
  this.changePageLocation=this.changePageLocation.bind(this)
}

 changePageLocation(){
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
 
    let projectNameUrl='';
    let donorNameUrl='';
    let countryNameUrl='';
     let markerLocationUrl='';

    if(this.projectName!==''){
    
       projectNameUrl=this.projectName.split('-').join('_').split(' ').join('-');
    }
  
    if(this.countryName!==''){
        countryNameUrl=this.countryName.split('-').join('_').split(' ').join('-');
    }
      if(this.donorName!==''){
        donorNameUrl=this.donorName.split('-').join('_').split(' ').join('-');
    } 
    
    if(this.markerLocation!==''){
      markerLocationUrl=this.markerLocation.split('-').join('_').split(' ').join('-');
    } 
    

 
        
    return (<div> 

              <div className="container">
                  <div className="row" style={row_NavLinks_Style}>
                    <div className="col-sm-12">
                        <Link   to={{pathname:"/filter", search:this.props.match.location.search}} 
                                style={linkColor} onClick={this.changePageLocation}>
                          Back to Results</Link>/
    
                        
                        <Link   to={`/filter/country/${markerLocationUrl}`} style={linkColor} >{this.markerLocation}</Link>/
                       
               
                     
                    </div>
                  </div>            
                 </div>  
                
                  <FetchProjectDetails project_title={this.projectTitleLocation}  />  
              
                
 
            
             


        </div>);
  }
}
export default FilterCountryPageProjectPage;
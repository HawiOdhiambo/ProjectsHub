import React from 'react';

import { Link} from "react-router-dom"
import FetchProjectDetails from "./FetchProjectDetails.js"; //import the project details



//controls the home page


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

export default CountryProjectPage;
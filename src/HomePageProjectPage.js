import React from 'react';

import {Link} from "react-router-dom"
//import { HashLink as  } from 'react-router-hash-link';
import FetchProjectDetails from "./FetchProjectDetails.js"; //import the navbar

class HomePageProjectPage extends React.Component{

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
   

  props.initializeHomePageProjectPage(this.projectTitle, this.p_idLocation) ;
 
}

  render(){

    const row_NavLinks_Style={
      marginTop:'3%',
      
    }

    const linkColor={
      color: '#0093B8'
    }
 //   
    
    return (<div> 

              <div className="container">
                  <div className="row" style={row_NavLinks_Style}>
                    <div className="col-sm-12">
                    <Link  to="/"style={linkColor} >Home</Link>/
                     
                    </div>
                  </div>            
                 </div>  
                
                  <FetchProjectDetails project_title={this.projectTitle} p_idLocation={this.p_idLocation}/>  
              
                
 
            
             


        </div>);
  }
}
 export default HomePageProjectPage;
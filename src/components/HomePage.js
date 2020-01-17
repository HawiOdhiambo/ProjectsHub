import React from 'react';



import FetchMarkersHome from "./FetchMarkersHome.js"; //import the markers

import FetchFilterCharts from "./FetchFilterCharts.js";//fetch the charts
import FetchSummary from "./FetchSummary.js";//get the homepageSummary



//controls the home page

 class HomePage extends React.Component{

  constructor(props){
    super(props);
    props.whenHomePage(); //initialize the homepage

    this.displayHomePageProjectPage=this.displayHomePageProjectPage.bind(this)
  }

    componentDidMount(prevProps){

         if(this.props.pageLocation!==""){
           
          let pageLocation=this.props.pageLocation
           
          setTimeout(function(){
          if( document.getElementById(pageLocation)){
            document.getElementById(pageLocation).scrollIntoView();
          }
           
          
            }, 300);
          }
      
    }

   displayHomePageProjectPage(project_title, p_id, pageLocation, e){

      
        let payLoad={p_id: p_id, project_title: project_title, pageLocation: pageLocation }

       

        this.props.handleDisplayHomePageProjectPage(payLoad)
   
        
   }






  render(){
      const mapStyle={
      
        height : '45em',
        position: 'relative',
       
        };
        const h4Style={
    
        textAlign:"center"
      }

      const marginStyle={
        marginTop : '4rem'
      }

      const fetchSummaryUrl="http://localhost/projects_hub/proj_hub/public/summary_charts/get_summary_home.php";
      
    return (
            <div className='container-fluid' style={marginStyle}>
              <FetchMarkersHome changeHomepage={this.props.changeHomepage} mapStyle={mapStyle}/>

                <div className='container'>
                
                 <FetchSummary  fetchSummaryUrl={fetchSummaryUrl}/>

                <FetchFilterCharts  handleDisplayProjectPage={this.displayHomePageProjectPage}/>
            
                </div>
              
            </div>
              );
  }

}

export default HomePage;
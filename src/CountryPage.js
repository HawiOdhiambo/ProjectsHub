import React from 'react';
import { Link} from "react-router-dom"

import FetchMarkersHome from "./FetchMarkersHome.js"; //import the markers
import ProjectsCard from "./ProjectsCard.js";//import the project titles and buttons

import FetchSummary from "./FetchSummary.js";//get the homepageSummary

import FetchFilterCharts from "./FetchFilterCharts.js";//fetch the charts



//controls the home page



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
export default CountryPage;
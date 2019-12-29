import React from 'react';
import FetchMarkersFilter from "./FetchMarkersFilter.js";
import FetchProjectDetails from "./FetchProjectDetails.js";
import ProjectsCard from "./ProjectsCard.js";//import the project titles and buttons
import {Link} from "react-router-dom"
import FetchFilterCharts from "./FetchFilterCharts.js";//fetch the charts
import FetchFilterSummary from "./FetchFilterSummary";

class FilterCountryPage extends React.Component{
	constructor(props){
		super(props);
		 
	           //initalize values
        this.markerLocation='';
        
        this.countryName='';
        this.unitName='';
        this.ongoingClosedValue='';
        this.donorName='';
        this.projectName='';


         if(this.props.markerLocation===''){

           this.markerLocation=this.props.match.params.countryName.split('-').join(' ').split('_').join('-');  
               
          }
        if(this.props.markerLocation!==''){
           this.markerLocation=this.props.markerLocation;
          }

          

          //if the property countryName is set, assign it to the variable this.unitName
        if(this.props.countryName!==''){
          this.countryName=this.props.countryName
        }

   
        //if the property countryName is empty but the url has a parameter
        if(this.props.countryName==='' && this.props.location.search!==''){

               let params = new URLSearchParams(this.props.location.search);

               if(params.get('countryName')===null){
                
                 this.countryName='';

               }
               if(params.get('countryName')!==null){

                  this.countryName=params.get('countryName').split('-').join(' ').split('_').join('-')

               }

          }


          //if the property unitName is set, assign it to the variable this.unitName
        if(this.props.unitName!==''){
          this.unitName=this.props.unitName
        }

   
        //if the property UnitName is empty but the url has a parameter
        if(this.props.unitName==='' && this.props.location.search!==''){

               let params = new URLSearchParams(this.props.location.search);

               if(params.get('unitName')===null){
                
                 this.unitName='';

               }
               if(params.get('unitName')!==null){

                  this.unitName=params.get('unitName')

               }

          }

                    //if the property unitName is set, assign it to the variable this.unitName
        if(this.props.ongoingClosedValue!==''){
          this.ongoingClosedValue=this.props.ongoingClosedValue
        }

   
        //if the property UnitName is empty but the url has a parameter
        if(this.props.ongoingClosedValue==='' && this.props.location.search!==''){

           let params = new URLSearchParams(this.props.location.search);

           if(params.get('ongoingClosedValue')===null){
            
             this.ongoingClosedValue='';

           }
           if(params.get('ongoingClosedValue')!==null){

              this.ongoingClosedValue=params.get('ongoingClosedValue')

           }

         }



         if(this.props.donorName!==''){
          this.donorName=this.props.donorName
        }

        //if the property donorName is empty but the url has a parameter
        if(this.props.donorName==='' && this.props.location.search!==''){

               let params = new URLSearchParams(this.props.location.search);

               if(params.get('donorName')===null){
                
                 this.donorName='';

               }
               if(params.get('donorName')!==null){

                  this.donorName=params.get('donorName').split('-').join(' ').split('_').join('-');

               }

          }

        if(this.props.projectName!==''){
    
          this.projectName=this.props.projectName
        }

        //if the property projectTitle is empty but the url has a parameter
        if(this.props.projectName==='' && this.props.location.search!==''){

               let params = new URLSearchParams(this.props.location.search);

               if(params.get('projectName')===null){
                
                 this.projectName='';

               }
               if(params.get('projectName')!==null){

                  let projectTitleUrl=params.get('projectName')
                 
                  this.projectName=projectTitleUrl.split('-').join(' ').split('_').join('-');

               }

          }



     
   

      this.props.initializeFilterCountryPage(this.markerLocation, this.countryName, this.unitName, this.ongoingClosedValue, this.donorName, this.projectName); //initialize the app component with the right values




      //this.showFilterProjectPage=this.showFilterProjectPage.bind(this)
      this.changePageLocation=this.changePageLocation.bind(this)
  	}



	  showFilterProjectPage=(projectTitle, p_id, pageLocation)=>{

    
      console.log("handleDisplayFilterCountryProjectPage")  
       
  
  		this.props.handleDisplayFilterCountryProjectPage(projectTitle, p_id, pageLocation)
     }


 
    componentDidMount(){

      if(this.props.pageLocation!=="" && this.props.pageLocation!== undefined){
           
            let pageLocation=this.props.pageLocation;
            
             
            setTimeout(function(){
             document.getElementById(pageLocation).scrollIntoView();
              }, 300);
          }
      

    }
    
    changePageLocation(){
      const pageLocation="mapContainer";
      this.props.changePageLocation(pageLocation)
    }

  





  


	render(){
		const mapStyle={
	        height: '40em',
	        position: 'relative',     
        };

       const countryTitleStyle={
	        textAlign: 'center',
	        padding: '0.3em 0',
	        color: '#6B662A',
       };

       

       const row_NavLinks_Style={
      		marginTop:'2%',
    	  
    	}
      const linkColor={
      		color: '#0093B8'
    	}

      const projTitleColor={
        color: '#6B662A'
      }
    let projectNameUrl='';
    let donorNameUrl='';
    let countryNameUrl='';
   

  if(this.projectName!==''){
        projectNameUrl=this.projectName.split('-').join('_').split(' ').join('-');
    }
  
    if(this.countryName!==''){
        countryNameUrl=this.countryName.split('-').join('_').split(' ').join('-');
    }
    if(this.donorName!==''){
        donorNameUrl=this.donorName.split('-').join('_').split(' ').join('-');
    } 
 

    
		return (<div>

              <div className="container">
                  <div className="row" style={row_NavLinks_Style}>
                    <div className="col-sm-12">
                        <Link   to={{pathname:"/filter", search:this.props.location.search}} 
                                style={linkColor} onClick={this.changePageLocation}>
                          Back to Results</Link>/
                     
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
				                      



				                      <FetchMarkersFilter countryName={this.markerLocation} unitName={this.unitName} ongoingClosedValue={this.ongoingClosedValue} 
                              donorName={this.donorName} projectTitle={this.projectName} callingPage="countryPage" mapStyle={mapStyle}/>
				                    </div>
				                    <div className='col-sm-6' >

				                      

				                      <ProjectsCard location={this.props.location} countryName={this.markerLocation}  unitName={this.unitName} ongoingClosedValue={this.ongoingClosedValue} 
                              donorName={this.donorName} projectTitle={this.projectName}
                               callingPage="filter/country" changePageLocation={this.props.changePageLocation} projTitleColor={projTitleColor} /> 

                             				                        

				                    </div>
				                  </div>
                          <div className="container">

                            <FetchFilterSummary countryName={this.markerLocation}  unitName={this.unitName} ongoingClosedValue={this.ongoingClosedValue} 
                              donorName={this.donorName} projectTitle={this.projectName} />
              
                            
                            <FetchFilterCharts  countryName={this.markerLocation}  unitName={this.unitName} ongoingClosedValue={this.ongoingClosedValue} 
                              donorName={this.donorName} projectTitle={this.projectName} 
                                     handleDisplayProjectPage={this.showFilterProjectPage}/>
                          </div>
				              </div>
						</div>)
				}

}

export default  FilterCountryPage;

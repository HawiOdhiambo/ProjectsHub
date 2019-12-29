import React from 'react';
import MapBox from "./MapBox.js";

class FetchMarkersFilter extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
       markerData:[],
     
      
    };
    
    }




  
  componentDidMount(){

    
    
      this.ajax=window.$.ajax(
      {
       data:{countryName: this.props.countryName, unitName:this.props.unitName, ongoingClosedValue: this.props.ongoingClosedValue, 
              donorName:this.props.donorName, projectTitle:this.props.projectTitle},
      type:'GET',
      url: "http://localhost/projects_hub/proj_hub/public/get_markers_filter.php",

      success: function(response){
        
       
         getData(response)



        
        
            }
          });
     
     let  getData = data =>{




          this.setState({
             markerData: data
        });
        

      }

  }

    componentDidUpdate(prevProps){

      if(prevProps.countryName!==this.props.countryName || prevProps.unitName!==this.props.unitName 
          || prevProps.ongoingClosedValue!== this.props.ongoingClosedValue || prevProps.donorName !== this.props.donorName|| this.props.projectTitle !== prevProps.projectTitle){
        this.ajax= window.$.ajax(
          {
           data:{countryName: this.props.countryName, unitName:this.props.unitName, ongoingClosedValue: this.props.ongoingClosedValue,
            donorName: this.props.donorName, projectTitle:this.props.projectTitle},
          type:'GET',
          url: "http://localhost/projects_hub/proj_hub/public/get_markers_filter.php",

          success: function(response){
            
           
             getData(response)



            
            
                }
              });
         
         let  getData = data =>{




              this.setState({
                 markerData: data
            });
            

          }
      }
    


  }
  componentWillUnmount(){
    this.ajax.abort()
  }

    render(){

        

        const {markerData, mapCenterCoordinates}=this.state;
     

        return <MapBox markerData={markerData}  mapCenterCoordinates={mapCenterCoordinates} 
                      callingPage={this.props.callingPage} changeWebPage={this.props.changeFilterPage} mapStyle={this.props.mapStyle} 
                      countryName={this.props.countryName} location={this.props.location}/>

        
  }




}
export default FetchMarkersFilter;
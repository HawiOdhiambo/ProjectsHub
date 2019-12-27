import React from 'react';
import {country_bounding_boxes} from './country_bounding_boxes'

class FetchMarkers extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
       markerData:[],
     
      
    };
    
    }




  
  componentDidMount(){

    
    
      window.$.ajax(
      {
       data:{countryName: this.props.countryName},
      type:'GET',
      url: "http://localhost/projects_hub/proj_hub/public/get_markers.php",

      success: function(response){
        
         //console.log(response)
         getData(response)



        
        
            }
          });
     
     let  getData = data =>{




          this.setState({
             markerData: data
        });
        

      }



    
 

  }
    render(){


        const {markerData, mapCenterCoordinates}=this.state;
     

        

        return <MapBox markerData={markerData}  mapCenterCoordinates={mapCenterCoordinates} callingPage={this.props.callingPage} changeHomepage={this.props.changeHomepage} mapStyle={this.props.mapStyle}/>

        
  }




}



class MapBox extends React.Component {



 componentDidMount(){ 

      window.mapboxgl.accessToken = 'pk.eyJ1IjoiaGF3aW9kaGlhbWJvIiwiYSI6ImNqdjI1a3FxdjAxZ2YzeW5teG1rb2pic3YifQ.mXbtuo1XPn3UhMdCDRdWVA';

       this.map = new window.mapboxgl.Map({
        container: this.refs.mapContainer, // container id
        style: 'mapbox://styles/hawiodhiambo/cjv3jl89v1c1a1flaqc9u8uoz', // stylesheet location
        //center: [18.204777, 35.466676], // starting position [lng, lat]
        zoom: 1.25 // starting zoom
      });
 
     
      let nav = new window.mapboxgl.NavigationControl({showCompass:false});

     this.map.addControl(nav, 'bottom-right');

     

     

  

  }

  componentDidUpdate(prevProps){

    if(this.props.markerData!=prevProps.markerData){
      ////console.log(this.props.mapdata);
      var geojsonArray=JSON.parse(this.props.markerData);
     

        
      this.popupArray=[]; //store the popup objects
      let markersCollection=[]

      geojsonArray.features.forEach(marker=> {

   

        markersCollection.push(marker.geometry.coordinates);

        this.markerColor(marker);

        
      

    

    });

 

    

    if(geojsonArray.features.length!=1){
       markersCollection.push(markersCollection[0]);
       console.log(window.turf.bbox(window.turf.polygon([markersCollection]))); 

      let mapBounds=window.turf.bbox(window.turf.polygon([markersCollection]));

      this.map.fitBounds(mapBounds); 

    }
    else{

       this.map.fitBounds(country_bounding_boxes[geojsonArray.features[0].properties.loc_name]) 
    }
    
   
    
    

    


	}



}

  
   


     markerColor(marker) {

              let unitArray=marker.properties.unit;  
              let projectsNumber= marker.properties.projects_number;   
            
              let unitArrayLength=unitArray.length;

         
           
              if(projectsNumber==1 || unitArrayLength==1){
            
                  if(unitArray[0].includes("RMPU")){


                  let el = document.createElement('div');
                 
                  el.className = 'marker';
                  //console.log()
                  el.style.background="#BA91A7"; //purple
                   this.getMarkerSize(el, marker)
                 
                    
                  }
                  if(unitArray[0].includes("CPEDU")){
                      let el = document.createElement('div');
                      el.className = 'marker';
                       el.style.background="#F29C6B"; //orange
                   this.getMarkerSize(el, marker)

                  }
                  if(unitArray[0].includes("CCPU")){
                      let el = document.createElement('div');
                      el.className = 'marker';
                      el.style.background= "#a3d09b" //green
                   this.getMarkerSize(el, marker)

                  }

            }
            //if the project leaders array is 3 and the projects in the country exceed 1
            
            if(unitArrayLength==2 && projectsNumber > 1){
              

               if(unitArray.includes("RMPU")&& unitArray.includes("CPEDU")){
                
                   let el = document.createElement('div');
                   el.className = 'marker';
                  el.style.backgroundImage= "linear-gradient(to right, #BA91A7 0%, #BA91A7 50%, #F29C6B 50%)"
                   this.getMarkerSize(el, marker)

                }


                if(unitArray.includes("RMPU") && unitArray.includes("CCPU")){
                 
                
                    let el = document.createElement('div');
                      el.className = 'marker';
                      el.style.backgroundImage= "linear-gradient(to right, #BA91A7 0%, #BA91A7 50%, #a3d09b 50%)";
                      this.getMarkerSize(el, marker)
                }
                if(unitArray.includes("CCPU") && unitArray.includes("CPEDU")){
                 
                 let el = document.createElement('div');
                  el.className = 'marker';
                  el.style.backgroundImage= "linear-gradient(to right, #a3d09b 0%, #a3d09b 50%, #F29C6B 50%)"
                   this.getMarkerSize(el, marker)

                }

             }

            if(unitArrayLength==3){
              
                let el = document.createElement('div');
                el.className = 'marker';
                el.style.backgroundImage= "linear-gradient(to right, #a3d09b 0%, #a3d09b 33.3%, #BA91A7 33.3%, #BA91A7 66.6%, #F29C6B 66.6%)"
                this.getMarkerSize(el, marker)

         


           
               }
        }
        //get the marker size
       getMarkerSize(el, marker){

          const startValue=23;
          const rateIncrease=2;

          let projectsNumber= marker.properties.projects_number;  


          if(projectsNumber){
              let markerSize=(projectsNumber*rateIncrease)+startValue;
              //console.log(markerSize);
              //console.log(projectsNumber)
              el.style.width =markerSize + 'px';
              el.style.height = markerSize + 'px';
              this.createMarker(el, marker);        

          }
          
       





        }

       createMarker(el, marker){

          
          new window.mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(this.map);
         

            
        

        el.addEventListener('click', () => {

          if(this.popupArray.length!=0){
           
             this.popupArray.forEach(popup=>{
               popup.remove();
               this.popupArray.pop();
             
              });
            }

        


             let popup = new window.mapboxgl.Popup({closeOnClick:false, className:'popUpClass'})

             let htmlPopup = '<h4>'+marker.properties.loc_name+'</h4><p>'+marker.properties.projects_number+' projects<p>'
                                + '<a href="" id="more" markerLocation="'+marker.properties.loc_name+'">More information</a>';
            
                 popup.setLngLat(marker.geometry.coordinates).setHTML(htmlPopup)
                 popup.addTo(this.map);           

      

            this.popupArray.push(popup); 
           

            if(country_bounding_boxes[marker.properties.loc_name]){
             
              this.map.fitBounds(country_bounding_boxes[marker.properties.loc_name]) 
            
            }


              document.getElementById('more').addEventListener('click', (e) =>{
                e.preventDefault();
                 this.moreInfo(e);

              })
             

        }); 

        el.addEventListener('mouseover', () => {

          if(this.popupArray.length!=0){
           
             this.popupArray.forEach(popup=>{
               popup.remove();
               this.popupArray.pop();
             
              });
            }

        


             let popup = new window.mapboxgl.Popup({closeOnClick:false, className:'popUpClass'})

             let htmlPopup = '<h4>'+marker.properties.loc_name+'</h4><p>'+marker.properties.projects_number+' projects<p>'
                                + '<a href="" id="more" markerLocation="'+marker.properties.loc_name+'">More information</a>';
            
                 popup.setLngLat(marker.geometry.coordinates).setHTML(htmlPopup)
                 popup.addTo(this.map);           

      

            this.popupArray.push(popup); 
           

          

              document.getElementById('more').addEventListener('click', (e) =>{
                e.preventDefault();
                 this.moreInfo(e);

              })
             

        }); 


   




        }

        moreInfo(e){


     
         
            this.props.changeHomepage(e);

        }

        componentWillUnmount(){
          this.map.remove();
        }






 
  render(){
    const markerStyle={
        height:'1.5rem',
        width:'1.5rem',
        display:'inline-block',
        borderRadius:'50%',

         margin: '0% 0.4% 0% 2%'
        
        }
      const legendStyle={
        fontSize: '0.8rem',
        position: 'relative',
        fontSize: '0.8rem',
 
        bottom: '2.5em',
        background: 'white',
        zIndex: '2',

      }



      return(
              <div>
                <div id="mapContainer" ref="mapContainer" className="mdc-elevation--z1" style={this.props.mapStyle}/>
                <div className="container" >                 
                <div className="d-flex mt-2 justify-content-md-center text-muted " style={legendStyle}> 
                  
                
                      <span className="marker" style={markerStyle} className="CCPU"></span>Climate Change & Planning Unit
                      <span className="marker" style={markerStyle} className="CPEDU"></span>City Planning and Design Unit 
                     <span className="marker"style={markerStyle} className="RMPU"></span> Regional and Metropolitan Planning Unit
                    </div>
                 </div> 
                </div>

              
                
             
            )
            
           
          }

}


export default FetchMarkers;
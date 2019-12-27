import React from 'react';
import {country_bounding_boxes} from './country_bounding_boxes'

const countriesKeys=Object.keys(country_bounding_boxes)


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

     this.mappedMarkers=[] //store mapped markers

     this.popupArray=[]; //store the popup objects
     

  

  }

  //remove all the markers and popups on the map before mapping new ones


  componentDidUpdate(prevProps){

    if(this.props.markerData!==prevProps.markerData){

   
      
     
     
 
      this.mapCleaner(prevProps);//remove all previously mapped markers
        
    }
    
    if(this.props.markerData===prevProps.markerData && this.props.countryName!==prevProps.countryName){
    //if the country Name is present
        if(this.props.countryName !== ''){
            //console.log('marker data same but country name different')
             countriesKeys.find(countryName=> {
           
           if(countryName===this.props.countryName){
              this.map.fitBounds(country_bounding_boxes[this.props.countryName]) 
           }})

        }
        if(this.props.countryName === ''){
          //console.log('NO features')
             let defaultMapBounds=[-172, -38, 178, 53]; //default map bounds

              this.map.fitBounds(defaultMapBounds) 
        }


     }


  }

  mapCleaner(prevProps){

    if(this.mappedMarkers.length===0 ){
   
      this.markerMapper(prevProps)
    }
    else{

      //remove the markers on the map if present
      this.mappedMarkers.map( mapMarker =>{
       
          mapMarker.remove();
        

          let index = this.mappedMarkers.indexOf(mapMarker);
            if (index > -1) {
              this.mappedMarkers.splice(index, 1);
            }
      

      });

     
      //remove any popups if any present
     this.popupArray.map( popup =>{
         
          popup.remove();

          let index = this.popupArray.indexOf(popup);
            if (index > -1) {
              this.popupArray.splice(index, 1);
            }

      });

     this.mapCleaner(prevProps); //repeat until clean

    }



      

}



//used 
  markerMapper(prevProps){


       let geojsonArray=JSON.parse(this.props.markerData);

      let markersBoundingBoxCoordinates=[];//for use by the bounding box

    

    //loop through the array to display markers on the map
        geojsonArray.features.forEach(marker=> {

   

            markersBoundingBoxCoordinates.push(marker.properties.bounding_box.coordinates);

            this.markerColor(marker); //get the marker colors

        
      

    

      });

    //create the bounding box for the map
    //if the geojson length returned is greater than 1,  create a polygon from the points returned and  calculate a bounding box for the map
    if(geojsonArray.features.length>2){
  
  

       markersBoundingBoxCoordinates.push(markersBoundingBoxCoordinates[0]); //create a polygon by adding the first point to the array 
     
       let polygon=window.turf.polygon([markersBoundingBoxCoordinates])
       let polygonScaled=window.turf.transformScale(polygon, 1.5);
      let mapBounds=window.turf.bbox(polygonScaled);
      //console.log(mapBounds)
      this.map.fitBounds(mapBounds); 

    }

    if(geojsonArray.features.length===2){
  
  

    
      let lineString=window.turf.lineString(markersBoundingBoxCoordinates);

      console.log(lineString)

      let lineStringScaled=window.turf.transformScale(lineString, 3);
      console.log(lineStringScaled)

      let bbox=window.turf.bbox(lineStringScaled)
      console.log(bbox);
      
      
     
      this.map.fitBounds(bbox);
      

    }
    // if the geojson returned is equal to 1,  use the location name of the point returned to calculate the map's bounding box
    if(geojsonArray.features.length===1){
   
        //when there is only one location in the feature collection
       countriesKeys.find(countryName=> {
      
           if(countryName===geojsonArray.features[0].properties.loc_name){
               this.map.fitBounds(country_bounding_boxes[geojsonArray.features[0].properties.loc_name]) 
           }})
        
     
    }
    //if there are no markers returned, but there is a country name passed to the component, use the country name to calculate the bounding box. 
    if(geojsonArray.features.length===0 && this.props.countryName !== ''){

      //console.log('Country name present but marker data not')
      //console.log(this.props.countryName)
       countriesKeys.find(countryName=> {
           
           if(countryName===this.props.countryName){
              this.map.fitBounds(country_bounding_boxes[this.props.countryName]) 
           }})
      

    }

   if(geojsonArray.features.length===0 && this.props.countryName === ''){

        //console.log('NO features')
         let defaultMapBounds=[-172, -38, 178, 53];

          this.map.fitBounds(defaultMapBounds) 

    }


  }
  //if there is the previous marker data is the same as the new marker datam but the country names arent the same



  
   


     markerColor(marker) {

              let unitArray=marker.properties.unit;  
              let projectsNumber= marker.properties.projects_number;   
            
              let unitArrayLength=unitArray.length;

         
           
              if(projectsNumber==1 || unitArrayLength==1){
            
                  if(unitArray[0].includes("RMPU")){


                  let el = document.createElement('div');
                 
                  el.className = 'marker';
                  ////console.log()
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
              ////console.log(markerSize);
              ////console.log(projectsNumber)
              el.style.width =markerSize + 'px';
              el.style.height = markerSize + 'px';
              this.createMarker(el, marker);        

          }
          
       





        }

       createMarker(el, marker){

          
          let mapMarker=new window.mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(this.map);
         
          this.mappedMarkers.push(mapMarker);
            
        

        el.addEventListener('click', () => {

          if(this.popupArray.length!=0){
           
             this.popupArray.forEach(popup=>{
               popup.remove();
               this.popupArray.pop();
             
              });
            }

        


             let popup = new window.mapboxgl.Popup({closeOnClick:false, className:'popUpClass'})

             let htmlPopup = '<h4>'+marker.properties.loc_name+'</h4><p>'+marker.properties.projects_number+' projects<p>'
             
              let redirectPage='<a href="" id="more" markerLocation="'+marker.properties.loc_name+'">More information</a>';

              if(this.props.callingPage!=="countryPage"){
                htmlPopup+=redirectPage;

              }
            
                 popup.setLngLat(marker.geometry.coordinates).setHTML(htmlPopup)
                 popup.addTo(this.map);           

            //if the more element exists, add the event listener
              if(document.getElementById('more')){
                document.getElementById('more').addEventListener('click', (e) =>{
                  e.preventDefault();
                   this.moreInfo(e);

                });
              }
      

            this.popupArray.push(popup); 
           

            if(country_bounding_boxes[marker.properties.loc_name]){
             
              this.map.fitBounds(country_bounding_boxes[marker.properties.loc_name]) 
            
            }


             

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

            

              //create a link only if the page is not a country page
              if(this.props.callingPage!=="countryPage"){

                //let hrefUrl="/filter/country/"+marker.properties.loc_name+this.props.location.search;
                //let redirectPage='<a href="'+hrefUrl+'" >More information</a>';
                let redirectPage='<a href="" id="more" markerLocation="'+marker.properties.loc_name+'">More information</a>';
                htmlPopup+=redirectPage;
                

                
              }
            
                 popup.setLngLat(marker.geometry.coordinates).setHTML(htmlPopup)
                 popup.addTo(this.map);



              //if the more element exists, add the event listener
              if(document.getElementById('more')){
                document.getElementById('more').addEventListener('click', (e) =>{
                  e.preventDefault();
                   this.moreInfo(e);

                });
              }
      

            this.popupArray.push(popup); 
           

          

             

        }); 


   




        }

        moreInfo(e){


     
         
            this.props.changeWebPage(e);

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
                                
                <div className="container d-flex mt-2 justify-content-md-center text-muted " style={legendStyle}> 
                  <span className="marker" style={markerStyle} className="CCPU"></span>Climate Change & Planning Unit
                  <span className="marker" style={markerStyle} className="CPEDU"></span>City Planning and Design Unit 
                 <span className="marker"style={markerStyle} className="RMPU"></span> Regional and Metropolitan Planning Unit
                </div>
                 
                </div>

              
                
             
            )
            
           
          }

}


export default MapBox;
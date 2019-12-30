import React, { useState, useEffect } from 'react';
import MapBox from "./MapBox.js";

import { useStoreState, useStoreActions } from 'easy-peasy';

// class FetchMarkersHome extends React.Component {

//     constructor(props) {
//     super(props);
//     this.state = {
//        markerData:[],


//     };

//     }





//   componentDidMount(){



//       window.$.ajax(
//       {
//        data:{countryName: this.props.countryName},
//       type:'GET',
//       url: "http://localhost/projects_hub/proj_hub/public/get_markers_home.php",

//       success: function(response){

//         //console.log(response)
//          getData(response)





//             }
//           });

//      let  getData = data =>{




//           this.setState({
//              markerData: data
//         });


//       }

//   }

//     componentDidUpdate(prevProps){

//       if(prevProps.countryName!==this.props.countryName){
//          window.$.ajax(
//           {
//            data:{countryName: this.props.countryName},
//           type:'GET',
//           url: "http://localhost/projects_hub/proj_hub/public/get_markers_home.php",

//           success: function(response){

//              console.log(response)
//              getData(response)





//                 }
//               });

//          let  getData = data =>{




//               this.setState({
//                  markerData: data
//             });


//           }
//       }



//   }

//     render(){


//         const {markerData, mapCenterCoordinates}=this.state;




//         return <MapBox markerData={markerData}  mapCenterCoordinates={mapCenterCoordinates} callingPage={this.props.callingPage} 
//                         changeWebPage={this.props.changeHomepage} mapStyle={this.props.mapStyle}/>


//   }
// }

const FetchMarkersHome = (props) => {
  const markers = useStoreState(state => state.projects.markers);
  const fetchMarkers = useStoreActions(state => state.projects.markers);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchMarkers();
    setData(markers);

    return () => { };
  }, [fetchMarkers, markers])

  console.log(markers);

  return (
    <MapBox markerData={data} callingPage={props.callingPage}
      changeWebPage={props.changeHomepage} mapStyle={props.mapStyle} />
  )
}


export default FetchMarkersHome;
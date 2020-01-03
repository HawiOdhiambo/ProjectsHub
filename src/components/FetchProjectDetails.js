import React from 'react';
import CPEDU_default_image from '../images/CPEDU_default_image.jpg';
import RMPU_default_image from '../images/RMPU_default_image.jpg';
import CCPU_default_image from '../images/CCPU_default_image.jpg';
import * as numeral from 'numeral';

class FetchProjectDetails extends React.Component{
    constructor(props){
      super(props);
      this.state={
        projectDetails:{
          project_details:[]
        }
      }
   
    }

      
   

    componentDidMount(){


         
        this.ajax= window.$.ajax(
          {
           data:{project_title: this.props.project_title, loc_name: this.props.countryName, p_id: this.props.p_idLocation},
          type:'GET',
          url: "http://localhost/projects_hub/proj_hub/public/get_proj_details.php",

          success: function(response){
            
            
             getData(response)



            
            
                }
              });
         
         let  getData = data =>{

              let projectDetails=JSON.parse(data);


              this.setState({projectDetails: projectDetails});
            
            
          }




    }

     componentWillUnmount(){
      this.ajax.abort()
    }





      render(){
        

          const {projectDetails} = this.state;
          const innerProjectDetails=this.state.projectDetails.project_details;
          

          const projectTitleStyle={
             minHeight: '10em',
               display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color:'white',
              padding:'10%'
          }

          const detailHeadingStyle={
            textTransform:'capitalize'
          }
          
          const pictureStyle={
            width: 'inherit',
            height: '20em',
            objectFit: 'cover'
          }

          const allProjectDetailsStyle={
            borderLeft:'2px, solid'
          }


       


        return (
                <div>
                 <div className="container-fluid my-4">
                  <div className="row">
                    <div  className='col-sm-4 pr-sm-0'>
                    
                      <h2 className={projectDetails.project_details.unit} style={projectTitleStyle}> {projectDetails.project_title}</h2>

                      
                    </div>
                    <div className='col-sm-8 pl-sm-0'>
                      {
                        projectDetails.project_details.unit==="CCPU" ? <img src={CCPU_default_image} alt="CCPU_default_image" style={pictureStyle}/>
                        :  projectDetails.project_details.unit==="RMPU" ? <img src={RMPU_default_image} alt="RMPU_default_image" style={pictureStyle}/> 
                        : projectDetails.project_details.unit==="CPEDU" ? <img src={CPEDU_default_image} alt="CPEDU_default_image" style={pictureStyle}/> 
                        : false

                        
                      }

                    </div>
                  </div>
                 </div>

                  <div  className='container' style={allProjectDetailsStyle}>
                    {   Object.keys(innerProjectDetails).map( key => {
                       

                        if(key==='countries'){
                          //console.log(innerProjectDetails[key])
                          let info=innerProjectDetails[key].join(', ');
                          //console.log(innerProjectDetails[key].join(', '))
                      
                          return ( <div key={key+'_div'}>
                                    <h5 key={key+'_title'} style={detailHeadingStyle} className={projectDetails.project_details.unit+'_Title'}>{key.split('_').join(' ')} </h5>
                                    <p key={key}>{info} </p>
                                    </div>
                                    )

                        }
                           if(key==='donors'){
                          //console.log(innerProjectDetails[key])
                          let info=innerProjectDetails[key].join('; ');
              
                          return ( <div key={key+'_div'}>
                                    <h5 key={key+'_title'} style={detailHeadingStyle} className={projectDetails.project_details.unit+'_Title'}>{key.split('_').join(' ')} </h5>
                                    <p key={key}>{info} </p>
                                    </div>
                                    )

                        }
                        if(key==='proj_status'){
                          let projStatusTitle='Project Status';

                          return ( <div key={key+'_div'}>
                                    <h5 key={key+'_title'} style={detailHeadingStyle} className={projectDetails.project_details.unit+'_Title'}>{projStatusTitle} </h5>
                                    <p key={key} style={detailHeadingStyle} >{innerProjectDetails[key]} </p>
                                    </div>
                                    )

                        }
                        if(key==='contribution'){
                          

                          return ( <div key={key+'_div'}>
                                    <h5 key={key+'_title'} style={detailHeadingStyle} className={projectDetails.project_details.unit+'_Title'}>{key} </h5>
                                    <p key={key}>${numeral(innerProjectDetails[key]).format('0,0')} </p>
                                    </div>
                                    )

                        }
                        if(key==='unit'){
                          if(innerProjectDetails[key]==='CCPU'){
                            return(<div key={key+'_div'}>
                                    <h5 key={key+'_title'} style={detailHeadingStyle} className={projectDetails.project_details.unit+'_Title'}>{key} </h5>
                                     <p key={key}>Climate Change and Planning Unit </p>
                                  </div>
                                  );
                          }
                          if(innerProjectDetails[key]==='CPEDU'){
                            return( <div key={key+'_div'}>
                                      <h5 key={key+'_title'} style={detailHeadingStyle} className={projectDetails.project_details.unit+'_Title'}>{key} </h5>
                                       <p key={key}>City Planning and Extension Unit </p>
                                    </div>);
                          }
                           if(innerProjectDetails[key]==='RMPU'){
                            return( <div key={key+'_div'}>
                              <h5 key={key+'_title'} style={detailHeadingStyle} className={projectDetails.project_details.unit+'_Title'}>{key} </h5>
                               <p key={key}>Regional Planning and Metropolitan Unit </p>
                            </div>);
                          }
                        }

                        else{ 
                           return ( <div key={key+'_div'}>
                                    <h5 key={key+'_title'} style={detailHeadingStyle} className={projectDetails.project_details.unit+'_Title'}>{key.split('_').join(' ')} </h5>
                                    <p key={key}>{innerProjectDetails[key]} </p>
                                    </div>
                                    )
                        }
                       
                      
                       }) 

                       

                    }

                  </div>

                      
              </div>)
      
         
      }

}





export default FetchProjectDetails; 

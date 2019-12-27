import React from 'react';
 import {Link} from "react-router-dom"

class FetchProjectsTitles extends React.Component{
    constructor(props){
      super(props);
      this.state={
        projectsList:[]
      }

      this.setPageLocation=this.setPageLocation.bind(this)
      
    }

    componentDidUpdate(prevProps){

      if(this.props.pageNo!==prevProps.pageNo || this.props.countryName!==prevProps.countryName
               ||  prevProps.unitName!==this.props.unitName || prevProps.ongoingClosedValue!==this.props.ongoingClosedValue 
               || prevProps.donorName!==this.props.donorName || prevProps.projectTitle!==this.props.projectTitle ){
         
         this.ajax=window.$.ajax(
          {
           data:{countryName: this.props.countryName, unitName: this.props.unitName, pageNo: this.props.pageNo, 
                ongoingClosedValue:this.props.ongoingClosedValue, donorName: this.props.donorName, projectTitle: this.props.projectTitle},
          type:'GET',
          url: "http://localhost/projects_hub/proj_hub/public/get_proj_titles.php",

          success: function(response){
            
           
             getData(response)



            
            
                }
              });
         
         let  getData = data =>{

              let projListData=JSON.parse(data);

        

              this.setState({
                 projectsList: projListData
            });
            

          }
      }


    }

    componentDidMount(){
      
      this.ajax=window.$.ajax(
          {
           data:{countryName: this.props.countryName, unitName: this.props.unitName, pageNo: this.props.pageNo, 
                ongoingClosedValue:this.props.ongoingClosedValue, donorName: this.props.donorName, projectTitle: this.props.projectTitle},
          type:'GET',
          url: "http://localhost/projects_hub/proj_hub/public/get_proj_titles.php",

          success: function(response){
            
             
             getData(response)



            
            
                }
              });
         
         let  getData = data =>{

              let projListData=JSON.parse(data);

       


              this.setState({
                 projectsList: projListData
            });
            

          }




    }


    componentWillUnmount(){
      this.ajax.abort()
    }

    setPageLocation(){
      this.props.handleChangePageLocation()
    }



      render(){
          const {projectsList} = this.state;
          const projectStyle ={

                    padding: '2%',
                    color: 'white',
                    fontWeight: '500',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display:'block',
                    marginBottom:'0.5rem'
              
                    }
     
          let linkRoute;
          if(this.props.callingPage==="filter/country"){

            let markerLocationUrl=this.props.countryName.split('-').join('_').split(' ').join('-');

            linkRoute="/filter/country/"+markerLocationUrl+"/project/"
          }
          if(this.props.callingPage==="home/country"){
            let markerLocationUrl=this.props.countryName.split('-').join('_').split(' ').join('-');
            linkRoute="/home/country/"+markerLocationUrl+"/project/"
          }
          if(this.props.callingPage==="filter/"){
            linkRoute="/filter/project/"
          }



          return (<div >{projectsList.map(project=>

                    <Link  className={project.unit+' p_hoverTitle'} to={{pathname:`${linkRoute}${project.project_title.split('_').join('__').split('-').join('_').split(' ').join('-').concat("-").concat(project.p_id)}`, search:this.props.location.search}}  key={project.p_id} 
                    style={projectStyle} onClick={this.setPageLocation}>
                      {project.project_title}
                    </Link>


                  )}
                  
                  </div>

                  )
      }

}

export default FetchProjectsTitles; 




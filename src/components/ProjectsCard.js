import React from 'react';
import FetchProjectsTitles from "./FetchProjectsTitles.js";
import FetchButtons from "./FetchButtons.js";

class ProjectsCard extends React.Component{

  constructor(props){
    super(props);
    this.state={
      pageNo: 1
    }
   this.changeProjectTitlePage=this.changeProjectTitlePage.bind(this)
   this.handleChangePageLocation=this.handleChangePageLocation.bind(this)
  }
   //set the pageno to the page no clicked on the button 
   changeProjectTitlePage(pageNo, e){


        this.setState({pageNo: pageNo});

        //return <FetchMarkers countryName={this.props.match.params.markerLocation}/>
    }

    handleChangePageLocation(){
      const pageLocation="projectTitlesList";
      this.props.changePageLocation(pageLocation)
    }




  render(){

      const {pageNo} =this.state;

    return(<div id="projectTitlesList">

        <h2 style={this.props.projTitleColor}> Projects </h2>    

        <FetchProjectsTitles location={this.props.location} changeWebPage={this.props.changeWebPage}  countryName={this.props.countryName} 
                            unitName={this.props.unitName} pageNo={pageNo} ongoingClosedValue={this.props.ongoingClosedValue}
                             projectTitle={this.props.projectTitle} donorName={this.props.donorName} callingPage={this.props.callingPage}
                              handleChangePageLocation={this.handleChangePageLocation}/>
                        
        <FetchButtons countryName={this.props.countryName} unitName={this.props.unitName} 
              ongoingClosedValue={this.props.ongoingClosedValue} changeProjectTitlePage={this.changeProjectTitlePage} 
              projectTitle={this.props.projectTitle} donorName={this.props.donorName}/>

    </div>)
  }
}

export default ProjectsCard;
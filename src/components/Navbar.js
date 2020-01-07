import React from 'react';
import logo from '../images/logo.png';
import {NavLink} from "react-router-dom";

class Navbar extends React.Component{
  constructor(props){
    super(props);
    
    this.handleOnclickFilter=this.handleOnclickFilter.bind(this)
    this.state={
      reload: false
    }
    this.handleOnClickHome=this.handleOnClickHome.bind(this)
  }


//if the onclick is clicked toggle the values of filter. This will eventually assist with page reload at onclick filter
handleOnclickFilter(){

  let reloadValue=!this.state.reload
  this.setState({reload: reloadValue});
  this.props.resetFilterApp();

}

handleOnClickHome(){
   
  this.props.resetHomeApp();
}
render(){

const{reload}=this.state;

let imageSize ={
          width: '131px',
          height:'20px',
          marginTop: '0.3em'

        }
        

  let removeTextDecoration={
    textDecoration:'none'
  }
  const navWidth={
    width: '100%'
  }

      return(

            <div>
                
              
              
                <nav className="navbar navbar-expand-md  mdc-elevation--z5" role="navigation" style={navWidth} >
                   

                   <div className="container d-flex align-items-end ">   


                       <div className="navbar-brand order-md-1">
                                
                             
                        
                          
                          <NavLink  exact to="/" style={removeTextDecoration}><h2 id="projectsHub"> PROJECTS HUB</h2></NavLink> 
                          <NavLink  exact to="/"  style={removeTextDecoration}><p id="branch">Urban Planning And Design Branch</p></NavLink>

           
                       </div>

                          <div className="d-flex flex-row align-self-start order-md-3 px-md-3">
                          <i className="navbar-brand ">
                             <img src={logo} alt="Logo" style={imageSize}/>
                          </i>
                          <button type="button" id="toggler" className="navbar-toggler" data-toggle="collapse" data-target="#myNavbar">
                          <i className="material-icons icon-bar">menu</i>                  
                        </button>
                      </div>

                           
                        
                          
                       
                        <div className="collapse navbar-collapse justify-content-end align-self-md-stretch order-md-2 " id="myNavbar">
                          <ul className=" navbar-nav align-self-md-stretch" >

                              <li className="nav-item d-md-flex align-self-md-stretch">
                                <NavLink exact to="/"className="nav-link pt-md-3 px-md-3" onClick={this.handleOnClickHome} style={removeTextDecoration} isActive={checkLinkHome} >Home </NavLink>
                              </li>

                              <li className="nav-item d-md-flex align-self-md-stretch">
                                <NavLink   onClick={this.handleOnclickFilter} exact  to={{pathname: "/filter", state: { reload: reload }}}
                                  className="nav-link  pt-md-3 px-md-3" style={removeTextDecoration} isActive={checkLinkFilter}>Filter </NavLink></li>

                              
                              
                            </ul>
                        </div>

                     
                    

                      </div>

                    </nav>
                    
              </div>

        );
    }
}

function checkLinkHome(match, location){

  let locationPath=location.pathname;//get the url
  //if it exists then return true
  if(match){
    return true
  }
  if(locationPath.search("/home")!==-1){
    return true
  }
}

function checkLinkFilter(match, location){

  let locationPath=location.pathname;//get the url

    if(match){
      return true
    }
    if(locationPath.search("/filter")!==-1){
      return true
    }

}

export default Navbar;
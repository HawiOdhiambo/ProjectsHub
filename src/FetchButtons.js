import React from 'react';


class FetchButtons extends React.Component{

constructor(props){
  super(props);
  this.state={
    buttonNumber:'',
    activeButtonNumber: 1
  }
   this.changePage=this.changePage.bind(this)
}

  componentDidUpdate(prevProps){

    //if the value of the countryParameter/unitFilter in the filter has changed, get the number of  buttons needed

    if(this.props.countryName!==prevProps.countryName||this.props.unitName !==prevProps.unitName  || this.props.ongoingClosedValue!== prevProps.ongoingClosedValue 
      || prevProps.donorName!==this.props.donorName || prevProps.projectTitle!==this.props.projectTitle ){
      this.ajax=window.$.ajax(
        {
          data:{countryName: this.props.countryName, unitName: this.props.unitName,
               ongoingClosedValue: this.props.ongoingClosedValue, donorName: this.props.donorName, projectTitle: this.props.projectTitle},
          type:'GET',
          url: "http://localhost/projects_hub/proj_hub/public/get_button_number.php",

          success: function(response){
          
           
            getData(response)



          
          
              }
            });
       
        let  getData = projectsNumber =>{
          
            let numberOfRowsPerPage=4;


            let buttonNumber=Math.ceil(projectsNumber/numberOfRowsPerPage);
           
            this.setState({
               buttonNumber: buttonNumber
            });  
          }
       }
   
  }


  componentDidMount(){
  
   this.ajax=window.$.ajax(
      {
      data:{countryName: this.props.countryName, unitName: this.props.unitName,
         ongoingClosedValue: this.props.ongoingClosedValue, donorName: this.props.donorName, projectTitle: this.props.projectTitle},
      type:'GET',
      url: "http://localhost/projects_hub/proj_hub/public/get_button_number.php",

      success: function(response){
        
         
         getData(response)



        
        
            }
          });
     
     let  getData = projectsNumber =>{
          let numberOfRowsPerPage=4;


          let buttonNumber=Math.ceil(projectsNumber/numberOfRowsPerPage);
       
          this.setState({
             buttonNumber: buttonNumber
          });  
        }




    }
    changePage(pageNo, e){
      

      this.props.changeProjectTitlePage(pageNo, e);

      this.setState({
        activeButtonNumber: pageNo
      })


    }

    componentWillUnmount(){
      this.ajax.abort()
    }



  render(){
    const {buttonNumber, activeButtonNumber} = this.state;

    const buttonStyle={
      marginLeft:'1%'
    }

    let buttons=[];

    if(buttonNumber>1){
       for(let i=0; i<buttonNumber; i++){

            let pageNo=i+1;

            if(pageNo==activeButtonNumber){

                 buttons.push(<button className='btn btn-info' key={i} style={buttonStyle} onClick={this.changePage.bind(this, pageNo)}> {pageNo} </button>)    
            }
            else{
              buttons.push(<button className='btn btn-outline-info' key={i} style={buttonStyle} onClick={this.changePage.bind(this, pageNo)}> {pageNo} </button>)    

            }

           
         }
       }

   
          
    return <div>{buttons} </div>
  }
        

}
export default FetchButtons;
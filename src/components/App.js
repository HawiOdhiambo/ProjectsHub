import React, {Component} from 'react';

import {StoreProvider, useStoreState } from 'easy-peasy';
import  "../styles/App.scss";
import {store} from '../store';
import AppBase from './AppBase.js';



const App = () => {

  const displayFilterCountryProjectPage=false;
  const displayFilterProjectPage=false;


  
  return( 
    <StoreProvider store={store}>
         <PassStateApp/>
    </StoreProvider>
 
      )
};

const PassStateApp= ()=> {



    const displayFilterCountryProjectPage=useStoreState(state => state.appStore.displayFilterCountryProjectPage);
    const displayFilterProjectPage=useStoreState(state => state.appStore.displayFilterProjectPage);

  return( 

    <AppBase  displayFilterProjectPage={displayFilterProjectPage } displayFilterCountryProjectPage={displayFilterCountryProjectPage}/>

 
      )

}
 
  

export default App;

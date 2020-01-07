import React, {Component, useStoreState } from 'react';

import {StoreProvider} from 'easy-peasy';
import  "../styles/App.scss";
import {store} from '../store';



const App = () => {

  const displayFilterCountryProjectPage=false;
  const displayFilterProjectPage=false;
  return( 
    <StoreProvider store={store}>
      <AppBase  displayFilterProjectPage={displayFilterProjectPage } displayFilterCountryProjectPage={displayFilterCountryProjectPage}/>
    </StoreProvider>
 
      )
};

 
  

export default App;

import React, {Component, useEffect } from 'react';

import {StoreProvider, useStoreState } from 'easy-peasy';
import  "../styles/App.scss";
import {store} from '../store';
import AppBase from './AppBase.js';




const App = () => {


 

  
  return( 
    <StoreProvider store={store}>
         <AppBase/>
    </StoreProvider>
 
      )
};


 
  

export default App;

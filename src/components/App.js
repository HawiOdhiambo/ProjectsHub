import React from 'react';
import { StoreProvider } from 'easy-peasy';

import Default from './Default';
import store from '../store';

const App = () => {
  return (
    <StoreProvider store={store}>
      <Default/>
    </StoreProvider>
  )
}

export default App;
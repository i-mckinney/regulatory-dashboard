import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApiTable from './client-api/ApiTable';

function App() {
  
  return (
    <div className='ui container'>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path='/client-api' exact component={ApiTable} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

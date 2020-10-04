import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApiTable from './api-table/ApiTable';

function App() {
  return (
    <div className='ui container'>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path='/client-api-table' exact component={ApiTable} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
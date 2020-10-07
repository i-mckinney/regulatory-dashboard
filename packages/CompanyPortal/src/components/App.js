import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApiTable from './api-table/ApiTable';
import ApiTestUi from './api-testing-ui/ApiTestUi';

function App() {
  return (
    <div className='ui container'>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path='/client-api-table' exact component={ApiTable} />
          </Switch>
          <Switch>
            <Route path='/client-api-test' exact component={ApiTestUi} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

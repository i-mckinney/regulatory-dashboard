import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApiTable from './client-api/ApiTable';
import CreateApi from './client-api/CreateApi';
import EditApi from './client-api/EditApi';
import DeleteApi from './client-api/DeleteApi';

function App() {
  return (
    <div className='ui container'>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path='/client-api' exact component={ApiTable} />
            <Route path='/client-api/new' component={CreateApi} />
            <Route path='/client-api/edit/:id' component={EditApi} />
            <Route path='/client-api/delete/:id' component={DeleteApi} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApiTable from './user/ApiTable';
import CreateApi from './user/CreateApi';
import EditApi from './user/EditApi';
import DeleteApi from './user/DeleteApi';

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

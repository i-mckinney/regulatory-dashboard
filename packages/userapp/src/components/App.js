import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserTable from './user/UserTable'
import UserCreate from './user/UserCreate'
import UserEdit from './user/UserEdit'
import UserDelete from './user/UserDelete'

function App() {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/users" exact component={UserTable} />
            <Route path="/users/new" component={UserCreate}  />
            <Route path="/users/edit/:id" component={UserEdit} />
            <Route path="/users/delete/:id" component={UserDelete} />
          </Switch>
        </div>
    </BrowserRouter>
    </div>
  );
}

export default App;

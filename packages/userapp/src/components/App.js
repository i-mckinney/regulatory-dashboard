import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserTable from './user/UserTable'
import UserCreate from './user/UserCreate'
import UserEdit from './user/UserEdit'
import UserDelete from './user/UserDelete'
import { createGenerateClassName } from '@material-ui/core/styles'
import { JssProvider } from 'react-jss'

const generateClassName = createGenerateClassName({
  productionPrefix: "userapp-"
});

function App() {
  return (
    <div className="ui container">
      <JssProvider generateClassName={generateClassName}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/users" exact component={UserTable} />
              <Route path="/users/new" component={UserCreate} />
              <Route path="/users/edit/:id" component={UserEdit} />
              <Route path="/users/delete/:id" component={UserDelete} />
            </Switch>
          </div>
        </BrowserRouter>
      </JssProvider>
    </div>
  );
}

export default App;

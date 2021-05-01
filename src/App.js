import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';





import {Todo,Todoupdate} from './component';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        
        <Route exact path="/">
          <Todo />
        </Route>
        <Route exact path="/edit-todo">
          <Todoupdate />
        </Route>
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;

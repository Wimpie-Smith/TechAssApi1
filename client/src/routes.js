import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/home';
import ArtistDetail from  './components/artdetail'





const Routes = () => {
    return (
  <Switch>
      
       <Route path="/" exact component={Home}/>
       <Route  path="/details/:id" exaxt component={ArtistDetail}/>
   
       
  </Switch>
  
      
    )
  }
  
  export default Routes;
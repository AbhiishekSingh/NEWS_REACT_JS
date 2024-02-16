import './App.css';

import React, { Component } from 'react'
import Navbar from './Component/Navbar';
import HomePage from './Component/HomePage';
import { Route, Routes } from 'react-router-dom';

export default class App extends Component {
  pageSize=10;
  apiKey= "d1bbf68a92464dd5aa17ef8f406c980e"
  country= "in";
  render() {
    return (
      <div>
        <Navbar/>

        <Routes>
        <Route exact path='/' element={ <HomePage key="general" pageSize={this.pageSize} apiKey={this.apiKey} coutry={this.country} category="general"/>}/>
        <Route exact path='/business' element={ <HomePage key="business" pageSize={this.pageSize}  apiKey={this.apiKey} coutry={this.country} category="business"/>}/>
        <Route exact path='/science' element={ <HomePage key="science" pageSize={this.pageSize}  apiKey={this.apiKey} coutry={this.country} category="science"/>}/>
        <Route exact path='/health' element={ <HomePage key="health" pageSize={this.pageSize}  apiKey={this.apiKey} coutry={this.country} category="health"/>}/>
        <Route exact path='/sports' element={ <HomePage key="sports" pageSize={this.pageSize}  apiKey={this.apiKey} coutry={this.country} category="sports"/>}/>
        <Route exact path='/technology' element={ <HomePage key="technology" pageSize={this.pageSize}  apiKey={this.apiKey} coutry={this.country} category="technology"/>}/>
        <Route exact path='/entertainment' element={ <HomePage key="entertainment" pageSize={this.pageSize}  apiKey={this.apiKey} coutry={this.country} category="entertainment"/>}/>
        
        
      </Routes>

      </div>
    )
  }
}




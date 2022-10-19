import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
export default class App extends Component {
  pageSize = 6;
  country = "us";


  state = {
    progress: 0,
  }
  setProgress = (progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#ffffff'
            height={3}
            progress={this.state.progress}
          // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} key={"general"} pageSize={this.pageSize} country={this.country} category={"general"} />} />
            <Route path="/business" element={<News setProgress={this.setProgress} key={"business"} pageSize={this.pageSize} country={this.country} category={"business"} />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} key={"entertainment"} pageSize={this.pageSize} country={this.country} category={"entertainment"} />} />
            <Route path="/general" element={<News setProgress={this.setProgress} key={"general"} pageSize={this.pageSize} country={this.country} category={"general"} />} />
            <Route path="/health" element={<News setProgress={this.setProgress} key={"health"} pageSize={this.pageSize} country={this.country} category={"health"} />} />
            <Route path="/science" element={<News setProgress={this.setProgress} key={"science"} pageSize={this.pageSize} country={this.country} category={"science"} />} />
            <Route path="/sports" element={<News setProgress={this.setProgress} key={"sports"} pageSize={this.pageSize} country={this.country} category={"sports"} />} />
            <Route path="/technology" element={<News setProgress={this.setProgress} key={"technology"} pageSize={this.pageSize} country={this.country} category={"technology"} />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

import React, { useState } from 'react'
import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  let apiKey = process.env.REACT_APP_NEWS_API
  let pageSize = 8;
  const [loadProgress, setLoadProgress] = useState(0);

  const setProgress = async (progress) => {
    setLoadProgress(progress);
  }

  
  return (
      <>
      <Router>
        <LoadingBar
          // color='#f11946'
          color='#0d6efd'
          height={3}
          progress={loadProgress}
        />
        <NavBar/>
          <Routes>
            <Route exact element={<News setProgress={setProgress} apiKey={apiKey} key={'general'} pageSize={pageSize} country={'in'} category={'general'} />} path='/' />
            <Route exact element={<News setProgress={setProgress} apiKey={apiKey} key={'business'} pageSize={pageSize} country={'in'} category={'business'} />} path='/business' />
            <Route exact element={<News setProgress={setProgress} apiKey={apiKey} key={'entertainment'} pageSize={pageSize} country={'in'} category={'entertainment'} />} path='/entertainment' />
            <Route exact element={<News setProgress={setProgress} apiKey={apiKey} key={'general'} pageSize={pageSize} country={'in'} category={'general'} />} path='/general' />
            <Route exact element={<News setProgress={setProgress} apiKey={apiKey} key={'health'} pageSize={pageSize} country={'in'} category={'health'} />} path='/health' />
            <Route exact element={<News setProgress={setProgress} apiKey={apiKey} key={'science'} pageSize={pageSize} country={'in'} category={'science'} />} path='/science' />
            <Route exact element={<News setProgress={setProgress} apiKey={apiKey} key={'sports'} pageSize={pageSize} country={'in'} category={'sports'} />} path='/sports' />
            <Route exact element={<News setProgress={setProgress} apiKey={apiKey} key={'technology'} pageSize={pageSize} country={'in'} category={'technology'} />} path='/technology' />
          </Routes>
      </Router>
    </>
  )
  
}

export default App

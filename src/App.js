import React,{useState} from 'react'; 
import './App.css';
import Navbar from './Navbar';
import News from './News';
import { BrowserRouter as Router,Routes,Route, } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
const App=()=>  {
  const pageSize=15;
  const apiKey=process.env.REACT_APP_NEWS_API
  // apiKey='2a6dec6f53554ceabae6b69637878e38'
  // piKey=5886fc24a0304e898fbcaff7c080d976
  const [progress,setProgress]=useState(0)
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        
      />
        <Routes>
          <Route exact path='/' element={<News  apiKey={apiKey} setProgress={setProgress}  key='general' pageSize={pageSize} country="in" category='general'/>}/>
          <Route exact path='/business' element={<News  apiKey={apiKey} setProgress={setProgress}  key='business' pageSize={pageSize} country="in" category='Business'/>}/>
          <Route exact path='/entertainment' element={<News  apiKey={apiKey} setProgress={setProgress}  key='entertainment' pageSize={pageSize} country="in" category='Entertainment'/>}/>
          <Route exact path='/general' element={<News  apiKey={apiKey} setProgress={setProgress}  key='general' pageSize={pageSize} country="in" category='General'/>}/>
          <Route exact path='/health' element={<News  apiKey={apiKey} setProgress={setProgress}  key='health' pageSize={pageSize} country="in" category='Health'/>}/>
          <Route exact path='/science' element={<News  apiKey={apiKey} setProgress={setProgress}  key='science' pageSize={pageSize} country="in" category='Science'/>}/>
          <Route exact path='/sports' element={<News  apiKey={apiKey} setProgress={setProgress}  key='sports' pageSize={pageSize} country="in" category='Sports'/>}/>
          <Route exact path='/technology' element={<News  apiKey={apiKey} setProgress={setProgress}  key='technology' pageSize={pageSize} country="in" category='Technology'/>}/>
        </Routes>
        
        </Router>
      </div>
    )
  }
export default App;

// function App() {
//   return (
//     <div className="App">
//       <Navbar/>
//     </div>
//   );
// }
// 

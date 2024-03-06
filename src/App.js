
import './App.css';


import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';

//class based component (rcc)

const App =()=>{
   const page=5;

    //apikey1='891ae243852c4c09bb232ba4d42168f7'
    //apikey2='b631dfbd449f412d96f590635c53ca18'
  const  apikey= process.env.REACT_APP_NEWS_API;
    
    const [progress, setProgress] = useState(0)
  
     
  // c="hey"
   // render : first it coverts jsx into hexactpath=tml and renders the below html code

    return (
      // <div>App{c}</div>

      <>
        {/* // <div>App{c}</div> */}
        <BrowserRouter>
        <NavBar />
        <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
        
      />
        <Routes>
          {/* "key" is used to tell that we have to reMount or reRender the component by giving props */}
       <Route path='/'   element={<News  apikey={apikey} setProgress= {setProgress}  key="general" pageSize={page} country="in" category="general"/>}/>
       <Route path='/business'  element={<News apikey={apikey}  setProgress= {setProgress}  key="business" pageSize={page} country="in" category="business"/>}/>
      <Route  path='/entertainment'  element={<News apikey={apikey}  setProgress= {setProgress}  key="entertainment" pageSize={page} country="in" category="entertainment"/>}/>
      <Route path='/general'  element={<News apikey={apikey}  setProgress= {setProgress}  key="general" pageSize={page} country="in" category="general"/>}/>
      <Route path='/health'  element={<News apikey={apikey}  setProgress= {setProgress}  key="health" pageSize={page} country="in" category="health"/>}/>
       <Route path='/science' element={<News apikey={apikey}  setProgress= {setProgress}   key="science" pageSize={page} country="in" category="science"/>}/>
      <Route path='/sports' element={<News apikey={apikey}  setProgress= {setProgress}  key="sports" pageSize={page} country="in" category="sports"/>}/>
        <Route path='/technology'  element={<News apikey={apikey}  setProgress= {setProgress}  key="technology" pageSize={page} country="in" category="technology"/>}/>
        </Routes>
        </BrowserRouter>
        </>
    )
  
}

export default App;


//can pass the props but can't change it
//if want to set the state by passing the props u can do it but u can only set or change state not props.






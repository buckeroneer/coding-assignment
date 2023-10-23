import { Routes, Route } from "react-router-dom"
import 'reactjs-popup/dist/index.css'


import { Index, Header, Starred, WatchLater } from './components/index.js'

import './app.scss'

const App = () => {
  return (
    <div className="App">
      <Header/>

      <div className="container">
        <Routes>
          <Route path="/" element= {<Index/>}/>
          <Route path="/starred" element={<Starred/>} />
          <Route path="/watch-later" element={<WatchLater/>} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App

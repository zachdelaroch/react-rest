import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './Home';
import Update from './Update';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/update/:id' element={<Update />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

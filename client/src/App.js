import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WhoWeAre from './pages/WhoWeAre';
import OrderNow from './pages/OrderNow';
import FindARescue from './pages/FindARescue';
import GetInTouch from './pages/GetInTouch';

function App() {
  return (
      <main>
        <Header/>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/who-we-are' element={<WhoWeAre/>}/>
            <Route path='/order-now' element={<OrderNow/>}/>
            <Route path='/find-a-rescue' element={<FindARescue/>}/>
            <Route path='/get-in-touch' element={<GetInTouch/>}/>
          </Routes>  
        </BrowserRouter>  
        <Footer/>
      </main>
  );
}

export default App;

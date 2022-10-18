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
        <BrowserRouter>  
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/who-we-are' element={<WhoWeAre/>}/>
            <Route path='/shop' element={<OrderNow/>}/>
            <Route path='/find-a-rescue' element={<FindARescue/>}/>
            <Route path='/get-in-touch' element={<GetInTouch/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </main>
  );
}

export default App;

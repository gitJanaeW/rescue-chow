import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
  return (
      <main>
        <Header/>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            {/* <Route path='/' element={<WhoWeAre/>}/>
            <Route path='/' element={<OrderNow/>}/>
            <Route path='/' element={<FindARescue/>}/>
            <Route path='/' element={<GetInTouch/>}/> */}
          </Routes>  
        </BrowserRouter>
        
        <Footer/>
      </main>
  );
}

export default App;

import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './common/header';
import store from './store';
import Home from './pages/home';
import Detail from './pages/detail/loadable.js';
import Login from './pages/login';
import Write from './pages/write/index';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div>
      <BrowserRouter>
      <Header/>
          <Routes>
            <Route path='/' exact element={<Home/>}></Route>
            <Route path='/detail/:id' exact element={<Detail/>}></Route>
            <Route path='/write' exact element={<Write/>}></Route>
            <Route path='/login' exact element={<Login/>}></Route>
          </Routes>
      </BrowserRouter>
      </div>
    </Provider>
  );
}



export default App;

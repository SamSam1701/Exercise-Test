import { useEffect } from 'react';
import './App.css'
import Routers from './routers'
import { BrowserRouter } from 'react-router-dom';
import { login } from './api/auth';

function App() {

  // Gọi hàm login khi start app
  useEffect(() => {
    login();
  }, []);

  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  )
}

export default App

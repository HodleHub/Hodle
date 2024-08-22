import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Register from './components/register/Register';
import RelayProvider from './relay/RelayProvider';

const Home = () => {
  return (
    <h1 className='text-red-300'>ola</h1>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
]);

const App = () => {
  return (
    <RelayProvider>
      <RouterProvider router={router} />
    </RelayProvider>
  );
};



export default App;

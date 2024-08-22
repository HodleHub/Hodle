import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Register from './components/register/Register';

const Home = () => {
  return (
    <h1>ola</h1>
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
    <RouterProvider router={router} />
  );
};



export default App;

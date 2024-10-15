import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { route } from './route'

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   lazy: () => route(import('../components/app/login/Login')),
  // },
  // {
  //   lazy: () => route(import('../components/app/AppLayout')),
  // },
  {
    lazy: () => route(import('../App')),
  },
])

const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes

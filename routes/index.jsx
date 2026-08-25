import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import About from '../pages/About'
import Bridal from '../pages/Bridal'
import Contact from '../pages/Contact'
import Gallery from '../pages/Gallery'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Services from '../pages/Services'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'bridal', element: <Bridal /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'contact', element: <Contact /> },
      { path: 'about-us', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
})
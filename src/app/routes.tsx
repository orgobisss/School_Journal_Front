import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Diary } from './pages/Diary';
import { Journal } from './pages/Journal';
import { Schedule } from './pages/Schedule';
import { Homework } from './pages/Homework';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/diary',
    element: (
      <Layout>
        <Diary />
      </Layout>
    ),
  },
  {
    path: '/journal',
    element: (
      <Layout>
        <Journal />
      </Layout>
    ),
  },
  {
    path: '/schedule',
    element: (
      <Layout>
        <Schedule />
      </Layout>
    ),
  },
  {
    path: '/homework',
    element: (
      <Layout>
        <Homework />
      </Layout>
    ),
  },
]);

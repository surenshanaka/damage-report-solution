import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import Layout from './Layout';
import Report from './Report';
import Shop from './Shop';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/shops" element={<Shop />} />
          <Route path="/reports" element={<Report />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

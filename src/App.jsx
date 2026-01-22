import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import BookList from './features/books/BookList';
import Dashboard from './features/dashboard/Dashboard';
import './App.css';

const Settings = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
    <p className="text-gray-600">Application settings will be displayed here.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="books" element={<BookList />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthProvider from './components/AuthProvider';

import { store } from './store';
import ProtectedRoute from './components/ProtectedRoute'; 
import PublicLayout from './components/PublicLayout';
import DashboardLayout from './components/DashboardLayout';
import Home from './app/page';
import Login from './app/login/page';
import Dashboard from './app/painel/page';
import AddReceipt from './app/painel/registrar-abastecimento/page';
import Register from './app/registro/page';


function App(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
          <Route path="/registro" element={<PublicLayout><Register /></PublicLayout>} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['seller', 'manager']}>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-receipt"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AddReceipt />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../features/auth/ProtectedRoute';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Home } from '../pages/Home';
import { Title } from '../pages/Title';
import { Play } from '../pages/Play';
import { Account } from '../pages/Account';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/title/:id"
        element={
          <ProtectedRoute>
            <Title />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/play/:id"
        element={
          <ProtectedRoute>
            <Play />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

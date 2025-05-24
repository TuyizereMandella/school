import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import StudentList from './components/students/StudentList';
import StudentForm from './components/students/StudentForm';
import ClassList from './components/classes/ClassList';
import ClassForm from './components/classes/ClassForm';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Dashboard Component
const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <a href="/students/new" className="btn btn-primary block text-center">
              Add New Student
            </a>
            <a href="/classes/new" className="btn btn-primary block text-center">
              Add New Class
            </a>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Navigation</h2>
          <div className="space-y-4">
            <a href="/students" className="btn btn-secondary block text-center">
              View Students
            </a>
            <a href="/classes" className="btn btn-secondary block text-center">
              View Classes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="py-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Student Routes */}
              <Route
                path="/students"
                element={
                  <ProtectedRoute>
                    <StudentList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/students/new"
                element={
                  <ProtectedRoute>
                    <StudentForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/students/:id/edit"
                element={
                  <ProtectedRoute>
                    <StudentForm />
                  </ProtectedRoute>
                }
              />

              {/* Class Routes */}
              <Route
                path="/classes"
                element={
                  <ProtectedRoute>
                    <ClassList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/classes/new"
                element={
                  <ProtectedRoute>
                    <ClassForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/classes/:id/edit"
                element={
                  <ProtectedRoute>
                    <ClassForm />
                  </ProtectedRoute>
                }
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;

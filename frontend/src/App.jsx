// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import Login from './components/Login';
// import Register from './components/Register';
// import Dashboard from './components/Dashboard';
// import TransactionForm from './components/TransactionForm';

// const PrivateRoute = ({ children }) => {
//   const auth = useAuth();
//   return auth?.user ? children : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//           <Route path="/transaction" element={<PrivateRoute><TransactionForm /></PrivateRoute>} />
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, AuthContext } from './context/AuthContext';
// import Login from './components/Login';
// import Register from './components/Register';
// import Dashboard from './components/Dashboard';
// import TransactionForm from './components/TransactionForm';

// // Private Route Component
// const PrivateRoute = ({ children }) => {
//   const auth = useContext(AuthContext);
//   return auth?.user ? children : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//           <Route path="/transaction" element={<PrivateRoute><TransactionForm /></PrivateRoute>} />
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transaction" element={<TransactionForm />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
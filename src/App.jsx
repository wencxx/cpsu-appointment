import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import useAuthStore from "./store/authStore"
import Layout from '@/layout/layout'
import ApproveApplication from "./pages/approve-applications"
import PendingApplication from "./pages/pending-applications"
import ApproveRequests from "./pages/approve-requests"
import PendingRequests from "./pages/pending-requests"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"
import HistoryApplication from "./pages/history-application"
import HistoryRequest from "./pages/history-request"
import Calendar from "./pages/calendar"
import StudentApplication from './pages/student-application'
import StudentRequest from './pages/student-request'
import AboutUs from './pages/about-us'
import UserManual from './pages/user-manual'

function App() {
  const store = useAuthStore()
  const token = store.token
  const currentUser = store.currentUser
  return (
    <>
      <Router>
        <Routes>
            <Route path="/login" element={!token ? <LoginPage /> : (currentUser.role === 'admin' ? <Navigate to="/" /> : <Navigate to="/student/id-card-application" />)} />
            <Route path="/register" element={<RegisterPage />} />
             <Route
                path="/"
                element={token ? <Layout /> : <Navigate to="/login" />}
              >
              <Route index element={<ApproveApplication />} />
              <Route path="/pending-applications" element={<PendingApplication />} />
              <Route path="/approve-requests" element={<ApproveRequests />} />
              <Route path="/pending-requests" element={<PendingRequests />} />
              <Route path="/history-applications" element={<HistoryApplication />} />
              <Route path="/history-requests" element={<HistoryRequest />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/user-manual" element={<UserManual />} />
              <Route path="/student/id-card-application" element={<StudentApplication />} />
              <Route path="/student/good-moral-request" element={<StudentRequest />} />
            </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
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
import useAuthStore from "./store/authStore"

function App() {
  const store = useAuthStore()
  const token = store.token

  return (
    <>
      <Router>
        <Routes>
            <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/" />} />
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
            </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

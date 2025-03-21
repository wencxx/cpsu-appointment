import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from '@/layout/layout'
import ApproveApplication from "./pages/approve-applications"
import PendingApplication from "./pages/pending-applications"
import ApproveRequests from "./pages/approve-requests"
import PendingRequests from "./pages/pending-requests"
import LoginPage from "./pages/login"
import HistoryApplication from "./pages/history-application"
import HistoryRequest from "./pages/history-request"
import Calendar from "./pages/calendar"

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout />}>
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

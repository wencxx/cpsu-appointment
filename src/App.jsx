import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from '@/layout/layout'
import ApproveApplication from "./pages/approve-applications"
import PendingApplication from "./pages/pending-applications"
import ApproveRequests from "./pages/approve-requests"
import PendingRequests from "./pages/pending-requests"

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ApproveApplication />} />
              <Route path="/pending-applications" element={<PendingApplication />} />
              <Route path="/approve-requests" element={<ApproveRequests />} />
              <Route path="/pending-requests" element={<PendingRequests />} />
            </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

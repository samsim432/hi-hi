import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import SafetyPopup from "./components/SafetyPopup";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Resources from "./pages/Resources";
import EmergencyHelp from "./pages/EmergencyHelp";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

import Dashboard from "./pages/Dashboard";
import AICompanion from "./pages/AICompanion";
import MoodTracker from "./pages/MoodTracker";
import Journal from "./pages/Journal";
import SelfCheck from "./pages/SelfCheck";
import Profile from "./pages/Profile";
import TestAI from "./pages/TestAI";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SafetyPopup />

      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/emergency-help" element={<EmergencyHelp />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/test-ai" element={<TestAI />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="ai-companion" element={<AICompanion />} />
          <Route path="mood-tracker" element={<MoodTracker />} />
          <Route path="journal" element={<Journal />} />
          <Route path="self-check" element={<SelfCheck />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
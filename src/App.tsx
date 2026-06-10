import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useUIStore } from './stores/uiStore'
import LandingPage from './pages/landing/LandingPage'
import PricingPage from './pages/landing/PricingPage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import CommandCenter from './components/layout/CommandCenter'
import IntelligenceHub from './pages/command-center/IntelligenceHub'
import InitializeSystem from './pages/command-center/InitializeSystem'
import SystemOverview from './pages/command-center/SystemOverview'
import RequirementsStudio from './pages/command-center/RequirementsStudio'
import ArchitectureDesigner from './pages/command-center/ArchitectureDesigner'
import DatabaseDesigner from './pages/command-center/DatabaseDesigner'
import ApiExplorer from './pages/command-center/ApiExplorer'
import SecurityCenter from './pages/command-center/SecurityCenter'
import InfrastructurePlanner from './pages/command-center/InfrastructurePlanner'
import CostSimulator from './pages/command-center/CostSimulator'
import SprintPlanner from './pages/command-center/SprintPlanner'
import EngineeringCorps from './pages/command-center/EngineeringCorps'
import RiskIntelligence from './pages/command-center/RiskIntelligence'
import DocumentationHub from './pages/command-center/DocumentationHub'
import CTOIntelligence from './pages/command-center/CTOIntelligence'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useUIStore((s) => s.isAuthenticated)
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/command-center"
          element={
            <ProtectedRoute>
              <CommandCenter />
            </ProtectedRoute>
          }
        >
          <Route index element={<IntelligenceHub />} />
          <Route path="initialize" element={<InitializeSystem />} />
          <Route path="overview" element={<SystemOverview />} />
          <Route path="requirements" element={<RequirementsStudio />} />
          <Route path="architecture" element={<ArchitectureDesigner />} />
          <Route path="database" element={<DatabaseDesigner />} />
          <Route path="api" element={<ApiExplorer />} />
          <Route path="security" element={<SecurityCenter />} />
          <Route path="infrastructure" element={<InfrastructurePlanner />} />
          <Route path="costs" element={<CostSimulator />} />
          <Route path="sprints" element={<SprintPlanner />} />
          <Route path="team" element={<EngineeringCorps />} />
          <Route path="risks" element={<RiskIntelligence />} />
          <Route path="docs" element={<DocumentationHub />} />
          <Route path="chat" element={<CTOIntelligence />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

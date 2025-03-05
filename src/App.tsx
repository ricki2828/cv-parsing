import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import Upload from './pages/Upload';
import JobDescriptions from './pages/JobDescriptions';
import Settings from './pages/Settings';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <ErrorBoundary>
                <Dashboard />
              </ErrorBoundary>
            } />
            <Route path="candidates" element={
              <ErrorBoundary>
                <Candidates />
              </ErrorBoundary>
            } />
            <Route path="upload" element={
              <ErrorBoundary>
                <Upload />
              </ErrorBoundary>
            } />
            <Route path="job-descriptions" element={
              <ErrorBoundary>
                <JobDescriptions />
              </ErrorBoundary>
            } />
            <Route path="settings" element={
              <ErrorBoundary>
                <Settings />
              </ErrorBoundary>
            } />
          </Route>
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
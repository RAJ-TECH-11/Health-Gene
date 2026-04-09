import React, { useState, useEffect } from 'react';
import VCFUploader from './components/VCFUploader';
import DrugInput from './components/DrugInput';
import SampleDataButtons from './components/SampleDataButtons';
import ResultsDashboard from './components/ResultsDashboard';
import VariantDetails from './components/VariantDetails';
import LLMExplanation from './components/LLMExplanation';
import ClinicalRecommendations from './components/ClinicalRecommendations';
import ExportFunctionality from './components/ExportFunctionality';
import EnhancedHeader from './components/EnhancedHeader';
import EnhancedFooter from './components/EnhancedFooter';
import DemoMode from './components/DemoMode';
import { FullScreenLoader, ErrorState, SuccessState } from './components/LoadingStates';
import { useVCFAnalysis, useHealthCheck, useSupportedDrugs } from './hooks/useApi';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [vcfFile, setVCFFile] = useState(null);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [vcfContent, setVCFContent] = useState(null);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);
  
  const { analyzeVCF, analysisResult, progress, loading, error, resetAnalysis } = useVCFAnalysis();
  const { isHealthy, lastCheck } = useHealthCheck();
  const { drugs, loading: drugsLoading } = useSupportedDrugs();

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle demo actions
  const handleDemoAction = (action) => {
    switch (action) {
      case 'upload':
        // Auto-load sample data for Patient A
        handleSampleDataLoad('PatientA', '', { name: 'Patient A', description: 'High risk profile' });
        break;
      case 'select':
        // Auto-select common drugs
        setSelectedDrugs([{ name: 'clopidogrel' }, { name: 'warfarin' }]);
        break;
      case 'analyze':
        // Auto-run analysis
        handleAnalyze();
        break;
      case 'results':
        // Show results
        setShowResults(true);
        break;
      default:
        break;
    }
  };

  // Handle file selection
  const handleFileSelect = (file) => {
    setVCFFile(file);
    setVCFContent(null);
    setCurrentPatient(null);
    setAnalysisError(null);
  };

  // Handle sample data loading
  const handleSampleDataLoad = (patientId, content, patientInfo) => {
    setVCFContent(content);
    setCurrentPatient(patientInfo);
    setVCFFile(null);
    setAnalysisError(null);
  };

  // Handle drug selection
  const handleDrugSelect = (drugs) => {
    setSelectedDrugs(drugs);
  };

  // Handle analysis
  const handleAnalyze = async () => {
    if (!vcfFile && !vcfContent) {
      setAnalysisError('Please upload a VCF file or select sample data');
      return;
    }
    
    if (selectedDrugs.length === 0) {
      setAnalysisError('Please select at least one drug to analyze');
      return;
    }

    setAnalysisError(null);
    setShowResults(false);

    try {
      const selectedDrugNames = selectedDrugs.map((drug) =>
        typeof drug === 'string' ? drug : drug.name
      );
      await analyzeVCF(vcfFile, vcfContent, selectedDrugNames, currentPatient?.name || 'Unknown');
      setShowResults(true);
    } catch (err) {
      setAnalysisError(err.message || 'Analysis failed');
    }
  };

  // Handle reset
  const handleReset = () => {
    setVCFFile(null);
    setVCFContent(null);
    setCurrentPatient(null);
    setSelectedDrugs([]);
    setShowResults(false);
    setAnalysisError(null);
    resetAnalysis();
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Auto-show demo on first visit
  useEffect(() => {
    const hasSeenDemo = localStorage.getItem('pharmaguard_demo_seen');
    if (!hasSeenDemo) {
      setTimeout(() => setShowDemo(true), 1000);
      localStorage.setItem('pharmaguard_demo_seen', 'true');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-primary dark">
      {/* Enhanced Header */}
      <EnhancedHeader
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isHealthy={isHealthy}
        lastCheck={lastCheck}
      />

      {/* Main Content */}
      <main className="flex-1 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          {/* System Status */}
          <div className="mb-8">
            <div className="glass p-4 rounded-xl border border-white/5">
              <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${isHealthy ? 'bg-success shadow-lg shadow-success/50' : 'bg-danger shadow-lg shadow-danger/50'} animate-pulse`}></div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                    <span className="text-sm font-medium text-gray-100">
                      {isHealthy ? '✓ System Online' : '✗ System Offline'}
                    </span>
                    {lastCheck && (
                      <span className="text-xs text-gray-500">
                        Last check: {new Date(lastCheck).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowDemo(true)}
                    className="btn-primary text-sm px-4 py-2 flex items-center space-x-2 group"
                  >
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse group-hover:scale-150 transition-transform" />
                    <span>Start Demo</span>
                  </button>
                  
                  <button
                    onClick={handleReset}
                    className="btn-secondary text-sm px-4 py-2 transition-all"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-8 animate-fade-in-up">
              <ErrorState 
                title="System Error"
                message={error}
                onRetry={() => window.location.reload()}
              />
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <FullScreenLoader 
              message={progress || "Analyzing pharmacogenomic data..."}
              progress={progress}
            />
          )}

          {/* Success State */}
          {analysisResult && showResults && !loading && (
            <div className="mb-8">
              <SuccessState 
                title="Analysis Complete"
                message="Pharmacogenomic risk assessment completed successfully"
              />
            </div>
          )}

          {/* Main Workflow */}
          {!showResults && !loading && (
            <div className="space-y-8 stagger">
              {/* Upload Section */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-accent text-white font-bold text-sm">1</div>
                  <h2 className="text-2xl font-bold font-display text-gray-100">
                    Upload Genetic Data
                  </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <VCFUploader 
                    onFileSelect={handleFileSelect}
                    darkMode={darkMode}
                  />
                  <SampleDataButtons 
                    onLoadSample={handleSampleDataLoad}
                    isLoading={loading}
                  />
                </div>
              </div>

              {/* Drug Selection */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-accent text-white font-bold text-sm">2</div>
                  <h2 className="text-2xl font-bold font-display text-gray-100">
                    Select Medications
                  </h2>
                </div>
                <DrugInput 
                  onDrugSelect={handleDrugSelect}
                  selectedDrugs={selectedDrugs}
                  availableDrugs={drugs}
                  isLoading={drugsLoading}
                  darkMode={darkMode}
                />
              </div>

              {/* Analysis Button */}
              <div className="text-center pt-4">
                <button
                  onClick={handleAnalyze}
                  disabled={!vcfFile && !vcfContent || selectedDrugs.length === 0}
                  className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all transform duration-300 ${
                    (!vcfFile && !vcfContent) || selectedDrugs.length === 0
                      ? 'glass bg-white/5 text-gray-500 cursor-not-allowed'
                      : 'btn-primary hover:scale-105 hover:shadow-glow'
                  }`}
                >
                  {(!vcfFile && !vcfContent) || selectedDrugs.length === 0 
                    ? 'Complete Steps 1 & 2 to Analyze'
                    : 'Analyze Pharmacogenomic Profile'
                  }
                </button>
              </div>

              {/* Error Display */}
              {analysisError && (
                <div className="glass p-4 rounded-xl border border-danger/30 bg-danger/10 animate-fade-in-up">
                  <p className="font-medium text-danger">✗ Error: {analysisError}</p>
                </div>
              )}
            </div>
          )}

          {/* Results Section */}
          {showResults && analysisResult && !loading && (
            <div className="space-y-8 stagger">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold font-display gradient-text mb-3">
                  Analysis Results
                </h2>
                <p className="text-lg text-gray-400">
                  {currentPatient?.name || 'Patient'} • {selectedDrugs.map((drug) => (typeof drug === 'string' ? drug : drug.name)).join(', ')}
                </p>
              </div>

              {/* Results Dashboard */}
              <ResultsDashboard 
                analysisData={analysisResult}
              />

              {/* Variant Details */}
              <div>
                <h3 className="text-2xl font-bold font-display text-gray-100 mb-4 flex items-center space-x-2">
                  <span className="text-accent-light">◆</span>
                  <span>Genetic Variant Details</span>
                </h3>
                <VariantDetails 
                  pharmacogenomicProfile={analysisResult.pharmacogenomic_profile}
                  riskAssessment={analysisResult.risk_assessment}
                />
              </div>

              {/* AI Explanation */}
              <div>
                <h3 className="text-2xl font-bold font-display text-gray-100 mb-4 flex items-center space-x-2">
                  <span className="text-accent-light">✨</span>
                  <span>AI-Powered Clinical Explanation</span>
                </h3>
                <LLMExplanation 
                  explanation={analysisResult.explanation}
                  riskLevel={analysisResult.risk_assessment?.risk_level}
                  drugName={analysisResult.drug_info?.name}
                  geneProfile={analysisResult.pharmacogenomic_profile}
                />
              </div>

              {/* Clinical Recommendations */}
              <div>
                <h3 className="text-2xl font-bold font-display text-gray-100 mb-4 flex items-center space-x-2">
                  <span className="text-accent-light">🏥</span>
                  <span>Clinical Recommendations</span>
                </h3>
                <ClinicalRecommendations 
                  riskAssessment={analysisResult.risk_assessment}
                  drugInfo={analysisResult.drug_info}
                  pharmacogenomicProfile={analysisResult.pharmacogenomic_profile}
                />
              </div>

              {/* Export Functionality */}
              <div>
                <h3 className="text-2xl font-bold font-display text-gray-100 mb-4 flex items-center space-x-2">
                  <span className="text-accent-light">📥</span>
                  <span>Export Results</span>
                </h3>
                <ExportFunctionality 
                  analysisData={analysisResult}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center items-center space-x-4 pt-6">
                <button
                  onClick={handleReset}
                  className="btn-secondary px-6 py-3 font-semibold transition-all"
                >
                  New Analysis
                </button>
                <button
                  onClick={() => setShowDemo(true)}
                  className="btn-primary px-6 py-3 font-semibold transition-all hover:scale-105"
                >
                  View Demo
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Enhanced Footer */}
      <EnhancedFooter darkMode={darkMode} />

      {/* Demo Mode Overlay */}
      {showDemo && (
        <div id="demo-overlay">
          <DemoMode 
            darkMode={darkMode}
            onStartDemo={handleDemoAction}
          />
        </div>
      )}
    </div>
  );
}

export default App;

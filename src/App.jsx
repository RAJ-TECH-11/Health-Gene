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
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Enhanced Header */}
      <EnhancedHeader
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isHealthy={isHealthy}
        lastCheck={lastCheck}
      />

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* System Status */}
          <div className="mb-8">
            <div className={`p-4 rounded-lg border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${isHealthy ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    System Status: {isHealthy ? 'Online' : 'Offline'}
                  </span>
                  {lastCheck && (
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Last check: {new Date(lastCheck).toLocaleTimeString()}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowDemo(true)}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                      darkMode
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    <span>Start Demo</span>
                  </button>
                  
                  <button
                    onClick={handleReset}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-8">
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
            <div className="space-y-8">
              {/* Upload Section */}
              <div>
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  1. Upload Genetic Data
                </h2>
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
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  2. Select Medications
                </h2>
                <DrugInput 
                  onDrugSelect={handleDrugSelect}
                  selectedDrugs={selectedDrugs}
                  availableDrugs={drugs}
                  isLoading={drugsLoading}
                  darkMode={darkMode}
                />
              </div>

              {/* Analysis Button */}
              <div className="text-center">
                <button
                  onClick={handleAnalyze}
                  disabled={!vcfFile && !vcfContent || selectedDrugs.length === 0}
                  className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 ${
                    (!vcfFile && !vcfContent) || selectedDrugs.length === 0
                      ? darkMode
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : darkMode
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
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
                <div className={`p-4 rounded-lg border ${
                  darkMode 
                    ? 'bg-red-900 border-red-700 text-red-200' 
                    : 'bg-red-100 border-red-300 text-red-800'
                }`}>
                  <p className="font-medium">Error: {analysisError}</p>
                </div>
              )}
            </div>
          )}

          {/* Results Section */}
          {showResults && analysisResult && !loading && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Analysis Results
                </h2>
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {currentPatient?.name || 'Patient'} - {selectedDrugs.map((drug) => (typeof drug === 'string' ? drug : drug.name)).join(', ')}
                </p>
              </div>

              {/* Results Dashboard */}
              <ResultsDashboard 
                analysisData={analysisResult}
              />

              {/* Variant Details */}
              <div>
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Genetic Variant Details
                </h3>
                <VariantDetails 
                  pharmacogenomicProfile={analysisResult.pharmacogenomic_profile}
                  riskAssessment={analysisResult.risk_assessment}
                />
              </div>

              {/* AI Explanation */}
              <div>
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  AI-Powered Clinical Explanation
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
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Clinical Recommendations
                </h3>
                <ClinicalRecommendations 
                  riskAssessment={analysisResult.risk_assessment}
                  drugInfo={analysisResult.drug_info}
                  pharmacogenomicProfile={analysisResult.pharmacogenomic_profile}
                />
              </div>

              {/* Export Functionality */}
              <div>
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Export Results
                </h3>
                <ExportFunctionality 
                  analysisData={analysisResult}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleReset}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  New Analysis
                </button>
                <button
                  onClick={() => setShowDemo(true)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    darkMode
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
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

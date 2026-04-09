import React from 'react';
import { Users, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

const SampleDataButtons = ({ onLoadSample, isLoading }) => {
  const samplePatients = [
    {
      id: 'PatientA',
      name: 'Patient A - High Risk',
      description: 'Multiple risk variants for CYP2C19 and CYP2C9',
      expectedResults: ['Toxic', 'Adjust Dosage', 'Ineffective'],
      icon: AlertTriangle,
      color: 'red',
      file: 'sample_patient_a.vcf'
    },
    {
      id: 'PatientB', 
      name: 'Patient B - Normal',
      description: 'Normal metabolism across all genes',
      expectedResults: ['Safe'],
      icon: CheckCircle,
      color: 'green',
      file: 'sample_patient_b.vcf'
    },
    {
      id: 'PatientC',
      name: 'Patient C - Mixed',
      description: 'Mixed profile with some gene variants',
      expectedResults: ['Adjust Dosage', 'Safe'],
      icon: Users,
      color: 'yellow',
      file: 'sample_patient_c.vcf'
    }
  ];

  const handleLoadSample = async (patient) => {
    if (isLoading) return;
    
    try {
      // Load sample VCF from backend by patient id
      const response = await fetch(`/api/sample-data/${patient.id}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${patient.id}`);
      }
      
      const sampleData = await response.json();
      const vcfContent = sampleData.vcf_content;
      onLoadSample?.(patient.id, vcfContent, patient);
    } catch (error) {
      console.error('Error loading sample data:', error);
      // Fallback: create a simple VCF content
      const fallbackContent = generateFallbackVCF(patient.id);
      onLoadSample?.(patient.id, fallbackContent, patient);
    }
  };

  const generateFallbackVCF = (patientId) => {
    // Generate basic VCF content as fallback
    return `##fileformat=VCFv4.2
##fileDate=20240101
##source=PharmaGuard Demo Data
##reference=hg19
##INFO=<ID=GENE,Number=1,Type=String,Description="Gene name">
##INFO=<ID=RSID,Number=1,Type=String,Description="dbSNP ID">
##SAMPLE=<ID=${patientId},Description=Sample patient data for PharmaGuard demo>
#CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO
1	96915541	rs4244285	G	A	.	.	GENE=CYP2C19;RSID=rs4244285
10	96542111	rs12248560	C	T	.	.	GENE=CYP2C19;RSID=rs12248560
4	76615513	rs12239046	C	T	.	.	GENE=CYP2C9;RSID=rs12239046
`;
  };

  const getColorClasses = (color) => {
    const colorMap = {
      red: {
        bg: 'glass border-danger/30 bg-danger/10 hover:border-danger/50 hover:bg-danger/15',
        border: 'border-danger/30',
        icon: 'text-danger',
        text: 'text-danger',
        badge: 'bg-danger/20 text-danger',
        accent: 'text-danger'
      },
      green: {
        bg: 'glass border-success/30 bg-success/10 hover:border-success/50 hover:bg-success/15',
        border: 'border-success/30',
        icon: 'text-success',
        text: 'text-success',
        badge: 'bg-success/20 text-success',
        accent: 'text-success'
      },
      yellow: {
        bg: 'glass border-warning/30 bg-warning/10 hover:border-warning/50 hover:bg-warning/15',
        border: 'border-warning/30',
        icon: 'text-warning',
        text: 'text-warning',
        badge: 'bg-warning/20 text-warning',
        accent: 'text-warning'
      }
    };
    return colorMap[color] || colorMap.green;
  };

  return (
    <div className="w-full space-y-4 animate-fade-in-up">
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <div className="p-2 rounded-lg bg-accent-light/10">
            <FileText className="w-4 h-4 text-accent-light" />
          </div>
          <h3 className="text-lg font-semibold text-gray-100">
            Try Sample Patient Data
          </h3>
        </div>
        <p className="text-sm text-gray-400 mb-4">
          Quick demo with pre-configured patient profiles to test different risk scenarios
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {samplePatients.map((patient) => {
            const Icon = patient.icon;
            const colors = getColorClasses(patient.color);
            
            return (
              <button
                key={patient.id}
                onClick={() => handleLoadSample(patient)}
                disabled={isLoading}
                className={`rounded-2xl p-5 text-left transition-all duration-200 group cursor-pointer transform hover:scale-105 ${colors.bg} ${!isLoading ? 'active:scale-95' : 'opacity-50 cursor-not-allowed'}`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2.5 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all ${colors.icon}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold text-gray-100 group-hover:text-gray-50 transition-colors`}>
                      {patient.name}
                    </h4>
                    <p className="text-xs text-gray-400 mt-2">
                      {patient.description}
                    </p>
                    
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                        Expected Results:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {patient.expectedResults.map((result, index) => (
                          <span
                            key={index}
                            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${colors.badge} border ${colors.border} border-opacity-50`}
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        className={`w-full px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                          isLoading
                            ? 'glass bg-white/5 text-gray-500'
                            : `bg-gradient-to-r from-accent to-accent-dark text-white hover:shadow-glow`
                        }`}
                        disabled={isLoading}
                      >
                        {isLoading ? '⏳ Loading...' : '📊 Load Sample'}
                      </button>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Info Section */}
      <div className="glass p-4 rounded-xl border border-accent-light/20 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-accent-light/10">
            <FileText className="w-4 h-4 text-accent-light flex-shrink-0" />
          </div>
          <div className="text-sm text-gray-300">
            <p className="font-semibold mb-2 text-gray-100">📋 About Sample Data</p>
            <ul className="text-xs space-y-1.5 text-gray-400">
              <li className="flex items-start space-x-2">
                <span className="text-danger mt-1">•</span>
                <span><strong>Patient A:</strong> CYP2C19*2 and *3 variants (Poor Metabolizer)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-success mt-1">•</span>
                <span><strong>Patient B:</strong> Normal metabolizer profile, no risk variants</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-warning mt-1">•</span>
                <span><strong>Patient C:</strong> Mixed profile with intermediate metabolizer variants</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-light mt-1">•</span>
                <span>Perfect for testing different risk levels and clinical recommendations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleDataButtons;

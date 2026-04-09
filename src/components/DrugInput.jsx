import React, { useState } from 'react';
import { Search, Pill, Info, X } from 'lucide-react';

const DrugInput = ({ onDrugSelect, selectedDrugs, isLoading, maxDrugs = 3, availableDrugs = [] }) => {
  const selectedDrugNames = selectedDrugs.map((drug) =>
    typeof drug === 'string' ? drug : drug.name
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDrugInfo, setSelectedDrugInfo] = useState(null);

  // Comprehensive list of pharmacogenomic drugs with categories
  const drugDatabase = [
    // Antiplatelet agents
    { name: 'clopidogrel', category: 'Antiplatelet', indication: 'Prevention of blood clots', genes: ['CYP2C19'] },
    { name: 'prasugrel', category: 'Antiplatelet', indication: 'Prevention of blood clots', genes: ['CYP2C19'] },
    { name: 'ticagrelor', category: 'Antiplatelet', indication: 'Prevention of blood clots', genes: ['CYP2C19'] },
    
    // Anticoagulants
    { name: 'warfarin', category: 'Anticoagulant', indication: 'Blood thinner', genes: ['CYP2C9', 'VKORC1'] },
    
    // Opioid analgesics
    { name: 'codeine', category: 'Opioid', indication: 'Pain relief', genes: ['CYP2D6'] },
    { name: 'tramadol', category: 'Opioid', indication: 'Pain relief', genes: ['CYP2D6'] },
    { name: 'hydrocodone', category: 'Opioid', indication: 'Pain relief', genes: ['CYP2D6'] },
    
    // Hormone therapy
    { name: 'tamoxifen', category: 'Hormone Therapy', indication: 'Breast cancer treatment', genes: ['CYP2D6'] },
    
    // Statins
    { name: 'simvastatin', category: 'Statin', indication: 'Cholesterol lowering', genes: ['SLCO1B1'] },
    { name: 'atorvastatin', category: 'Statin', indication: 'Cholesterol lowering', genes: ['SLCO1B1'] },
    { name: 'rosuvastatin', category: 'Statin', indication: 'Cholesterol lowering', genes: ['SLCO1B1'] },
    { name: 'pravastatin', category: 'Statin', indication: 'Cholesterol lowering', genes: ['SLCO1B1'] },
    
    // Immunosuppressants
    { name: 'azathioprine', category: 'Immunosuppressant', indication: 'Autoimmune diseases', genes: ['TPMT'] },
    { name: '6-mercaptopurine', category: 'Immunosuppressant', indication: 'Leukemia, IBD', genes: ['TPMT'] },
    
    // Chemotherapy
    { name: 'fluorouracil', category: 'Chemotherapy', indication: 'Cancer treatment', genes: ['DPYD'] },
    { name: 'capecitabine', category: 'Chemotherapy', indication: 'Cancer treatment', genes: ['DPYD'] },
    
    // PPIs
    { name: 'omeprazole', category: 'PPI', indication: 'Acid reflux', genes: ['CYP2C19'] },
    { name: 'esomeprazole', category: 'PPI', indication: 'Acid reflux', genes: ['CYP2C19'] },
    { name: 'lansoprazole', category: 'PPI', indication: 'Acid reflux', genes: ['CYP2C19'] },
    
    // Antidepressants
    { name: 'escitalopram', category: 'SSRI', indication: 'Depression', genes: ['CYP2C19'] },
    { name: 'citalopram', category: 'SSRI', indication: 'Depression', genes: ['CYP2C19'] },
    { name: 'sertraline', category: 'SSRI', indication: 'Depression', genes: ['CYP2C19'] },
    
    // Others
    { name: 'clozapine', category: 'Antipsychotic', indication: 'Schizophrenia', genes: ['CYP2D6'] },
    { name: 'metoprolol', category: 'Beta Blocker', indication: 'Blood pressure', genes: ['CYP2D6'] },
  ];

  const allowedDrugNames = new Set((availableDrugs || []).map((d) => String(d).toLowerCase()));
  const visibleDrugDatabase = allowedDrugNames.size
    ? drugDatabase.filter((drug) => allowedDrugNames.has(drug.name.toLowerCase()))
    : drugDatabase;

  const filteredDrugs = visibleDrugDatabase.filter(drug =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drug.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const selectDrug = (drug) => {
    if (selectedDrugNames.includes(drug.name)) {
      removeDrug(drug.name);
      return;
    }

    if (selectedDrugs.length >= maxDrugs) {
      alert(`Maximum ${maxDrugs} drugs can be selected`);
      return;
    }

    onDrugSelect?.([...selectedDrugs, drug]);
  };

  const removeDrug = (drugName) => {
    onDrugSelect?.(
      selectedDrugs.filter((drug) => (typeof drug === 'string' ? drug : drug.name) !== drugName)
    );
  };

  const showDrugInfo = (drug) => {
    setSelectedDrugInfo(drug);
  };

  const getRiskColor = (drug) => {
    // This would be populated with actual risk data from API
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="w-full space-y-6 animate-fade-in-up">
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
          <Pill className="w-4 h-4 text-accent-light" />
          <span>Select Drug(s) for Analysis</span>
        </label>
        
        {/* Drug Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search by drug name, category, or indication..."
            className="w-full pl-11 pr-4 py-3 glass rounded-xl border border-white/10 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-accent-light/50 focus:bg-white/10 transition-all duration-200"
            disabled={isLoading}
          />
          {selectedDrugs.length >= maxDrugs && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <span className="text-xs text-warning font-medium bg-warning/20 px-2.5 py-1 rounded-lg">
                Max {maxDrugs} drugs
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Drug Cards Grid */}
      <div>
        <p className="text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
          <span>Available Model-Supported Drugs</span>
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-light/20 text-accent-light text-xs font-bold">
            {filteredDrugs.length}
          </span>
        </p>
        {filteredDrugs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredDrugs.map((drug) => {
              const isSelected = selectedDrugNames.includes(drug.name);
              const maxReached = selectedDrugs.length >= maxDrugs;
              const isDisabled = isLoading || (!isSelected && maxReached);

              return (
                <button
                  key={drug.name}
                  type="button"
                  onClick={() => !isDisabled && selectDrug(drug)}
                  disabled={isDisabled}
                  className={`text-left rounded-xl p-4 transition-all duration-200 group ${
                    isSelected
                      ? 'glass bg-white/15 border border-accent-light/50 shadow-glow'
                      : isDisabled
                        ? 'glass bg-white/5 opacity-50 cursor-not-allowed'
                        : 'glass border border-white/10 hover:border-accent-light/30 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <Pill className="w-4 h-4 text-accent-light flex-shrink-0" />
                        <p className="font-medium text-gray-100 truncate capitalize">{drug.name}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1.5 truncate">{drug.category}</p>
                      <p className="text-xs text-gray-500 mt-1 truncate">🔬 {drug.genes.join(', ')}</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        showDrugInfo(drug);
                      }}
                      className="flex-shrink-0 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <Info className="w-4 h-4 text-gray-400 group-hover:text-accent-light" />
                    </button>
                  </div>
                  {isSelected && (
                    <span className="inline-block mt-3 text-xs bg-success/20 text-success px-2.5 py-1 rounded-lg font-medium">
                      ✓ Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="glass p-6 rounded-xl border border-white/5 text-center animate-fade-in-up">
            <p className="text-sm text-gray-400">No drugs found for <span className="text-accent-light font-medium">"{searchTerm}"</span></p>
          </div>
        )}
      </div>

      {/* Selected Drugs */}
      {selectedDrugs.length > 0 && (
        <div className="pt-4 border-t border-white/5">
          <p className="text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
            <span>Selected Drugs</span>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-success/20 text-success text-xs font-bold">
              {selectedDrugs.length}
            </span>
          </p>
          <div className="space-y-2">
            {selectedDrugs.map((drug) => (
              <div
                key={typeof drug === 'string' ? drug : drug.name}
                className="glass p-3.5 rounded-xl border border-success/30 bg-success/10 flex items-center justify-between group hover:border-success/50 hover:bg-success/15 transition-all"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <Pill className="w-4 h-4 text-success flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-100 capitalize">{typeof drug === 'string' ? drug : drug.name}</p>
                    <p className="text-xs text-gray-400 truncate">
                      {typeof drug === 'string' ? 'Selected medication' : `${drug.category} • ${drug.indication}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  <button
                    onClick={() => {
                      if (typeof drug !== 'string') {
                        showDrugInfo(drug);
                      }
                    }}
                    className="p-1.5 rounded-lg hover:bg-white/10 transition-all"
                    disabled={typeof drug === 'string'}
                  >
                    <Info className="w-4 h-4 text-gray-400 group-hover:text-accent-light" />
                  </button>
                  <button
                    onClick={() => removeDrug(typeof drug === 'string' ? drug : drug.name)}
                    className="p-1.5 rounded-lg hover:bg-danger/20 transition-all"
                  >
                    <X className="w-4 h-4 text-gray-400 group-hover:text-danger" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drug Info Modal */}
      {selectedDrugInfo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass rounded-2xl p-6 max-w-md w-full border border-accent-light/30 animate-fade-in-up">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold font-display text-gray-100 capitalize">
                {selectedDrugInfo.name}
              </h3>
              <button
                onClick={() => setSelectedDrugInfo(null)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="glass p-3 rounded-lg border border-white/5 bg-white/5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Category</p>
                <p className="text-sm text-gray-200 font-medium">{selectedDrugInfo.category}</p>
              </div>
              <div className="glass p-3 rounded-lg border border-white/5 bg-white/5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Indication</p>
                <p className="text-sm text-gray-200">{selectedDrugInfo.indication}</p>
              </div>
              <div className="glass p-3 rounded-lg border border-white/5 bg-white/5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2.5">Relevant Genes</p>
                <div className="flex flex-wrap gap-2">
                  {selectedDrugInfo.genes.map((gene) => (
                    <span
                      key={gene}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent-light/20 text-accent-light border border-accent-light/30"
                    >
                      {gene}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="glass p-4 rounded-xl border border-warning/30 bg-warning/10 space-y-2">
        <div className="flex items-start space-x-3">
          <Info className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-300">
            <p className="font-semibold mb-2.5 text-warning">💡 Drug Selection Tips</p>
            <ul className="text-xs space-y-1.5 text-gray-400">
              <li className="flex items-start space-x-2">
                <span className="text-warning mt-1">•</span>
                <span>Search by drug name, category, or indication</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-warning mt-1">•</span>
                <span>Select up to {maxDrugs} drugs for comparative analysis</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-warning mt-1">•</span>
                <span>Click the info icon to see drug details and relevant genes</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-warning mt-1">•</span>
                <span>All drugs have established pharmacogenomic guidelines</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugInput;

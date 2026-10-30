import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { diagnoseJobProblem } from '../../lib/ai';
import { Sparkles, Upload, AlertCircle, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

export const AIProblemDiagnosisModal = ({ isOpen, onClose, onSelectCategory }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('plumber');
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const diagnosis = await diagnoseJobProblem({
      description,
      category,
      imageBase64: imagePreview
    });

    setResult(diagnosis);
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Job Problem Diagnosis" maxWidth="max-w-2xl">
      <div className="space-y-6">
        
        {!result ? (
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Describe the problem or symptom
              </label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Water dripping continuously from kitchen pipe joint whenever sink is full..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Category (Optional)
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500"
                >
                  <option value="plumber">Plumber</option>
                  <option value="electrician">Electrician</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="housemaid">Housemaid</option>
                  <option value="handyman">Handyman</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Upload Photo (Optional)
                </label>
                <label className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:bg-slate-800 cursor-pointer text-xs text-slate-300 transition-colors">
                  <Upload className="w-4 h-4 text-sky-400" />
                  <span>{imagePreview ? 'Photo Attached ✓' : 'Upload photo'}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>

            {imagePreview && (
              <div className="relative w-32 h-24 rounded-xl overflow-hidden border border-sky-500/40">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-[#0F766E]/20 transition-all"
            >
              <Sparkles className={`w-4 h-4 text-teal-200 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Analyzing with Gemini AI...' : 'Ask AI to Analyze Problem'}</span>
            </button>
          </form>
        ) : (
          <div className="space-y-5 animate-in fade-in zoom-in-95">
            
            {/* Diagnosis Result Header */}
            <div className="p-4 rounded-2xl bg-[#0284C7]/10 border border-[#0284C7]/30">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#0284C7] mb-1">
                <Sparkles className="w-4 h-4" />
                <span>AI Job Diagnosis Summary</span>
              </div>
              <h4 className="text-base font-heading font-bold text-white mb-2">
                {result.possibleIssue}
              </h4>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-200 capitalize font-medium">
                  Service: {result.recommendedCategory}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold uppercase text-[10px]">
                  Urgency: {result.urgency.replace('_', ' ')}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  Estimated Labor: {result.estimatedLaborRange}
                </span>
              </div>
            </div>

            {/* Recommended Action & Warning */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Recommended Action
              </h5>
              <p className="text-xs text-slate-200 leading-relaxed">
                {result.recommendedAction}
              </p>
              {result.safetyWarning && (
                <div className="flex items-start space-x-2 pt-2 border-t border-slate-700/60 text-xs text-amber-300">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>{result.safetyWarning}</span>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            <p className="text-[11px] text-slate-400 italic">
              ⚠️ {result.disclaimer}
            </p>

            {/* CTAs */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setResult(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Re-diagnose
              </button>
              <button
                onClick={() => {
                  onSelectCategory(result.recommendedCategory);
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow-lg shadow-[#0F766E]/20 flex items-center justify-center space-x-1.5"
              >
                <span>Find Verified {result.recommendedCategory}s</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </Modal>
  );
};

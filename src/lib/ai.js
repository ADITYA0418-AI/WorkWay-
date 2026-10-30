// AI JOB DIAGNOSIS ENGINE FOR WORKWAY V2
// Note: Private API keys (Gemini) are handled securely on the backend server.
// The frontend never exposes secret API keys.

export async function diagnoseJobProblem({ description, category, imageBase64 }) {
  // 1. Try calling the secure backend AI endpoint
  try {
    const response = await fetch('/api/v1/ai/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, category, imageBase64 })
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.success && data?.diagnosis) {
        return data.diagnosis;
      }
    }
  } catch (err) {
    console.info('Backend AI proxy unavailable, switching to local intelligent diagnosis engine.');
  }

  // Smart Simulated AI Diagnosis Engine
  const descLower = (description || '').toLowerCase();
  
  if (descLower.includes('leak') || descLower.includes('pipe') || descLower.includes('water') || descLower.includes('tap') || category === 'plumber') {
    return {
      possibleIssue: descLower.includes('leak') ? 'Pipe Joint Leakage & Pressure Sealing Required' : 'Drain Blockage or Faucet Washer Wear',
      recommendedCategory: 'plumber',
      urgency: descLower.includes('overflow') || descLower.includes('burst') ? 'emergency_asap' : 'today',
      estimatedLaborRange: '₹350 – ₹650',
      recommendedAction: 'Turn off the local stop valve immediately to prevent water damage and book a verified plumber.',
      safetyWarning: 'Ensure electrical appliances near water leakage are disconnected from wall outlets.',
      isAiGenerated: false,
      disclaimer: 'Note: AI diagnosis is an automated estimate and not binding professional trade advice.'
    };
  }

  if (descLower.includes('spark') || descLower.includes('mcb') || descLower.includes('short') || descLower.includes('wire') || descLower.includes('light') || category === 'electrician') {
    return {
      possibleIssue: descLower.includes('spark') ? 'Neutral Wire Overload & Short Circuit' : 'MCB Trip Due to High-Power Appliance Surge',
      recommendedCategory: 'electrician',
      urgency: 'emergency_asap',
      estimatedLaborRange: '₹450 – ₹850',
      recommendedAction: 'Trip the main DB circuit breaker box and request a Master Pro electrician for safe inspection.',
      safetyWarning: 'Do not touch exposed copper wires or burning switches with bare hands.',
      isAiGenerated: false,
      disclaimer: 'Note: AI diagnosis is an automated estimate and not binding professional trade advice.'
    };
  }

  if (descLower.includes('door') || descLower.includes('lock') || descLower.includes('cabinet') || descLower.includes('hinge') || category === 'carpenter') {
    return {
      possibleIssue: 'Wood Swelling / Misaligned Hydraulic Hinge Mechanism',
      recommendedCategory: 'carpenter',
      urgency: 'today',
      estimatedLaborRange: '₹350 – ₹550',
      recommendedAction: 'Book a skilled carpenter to re-align hinges or replace worn mortise lock cylinders.',
      safetyWarning: 'Avoid forcing jammed doors to prevent frame cracking.',
      isAiGenerated: false,
      disclaimer: 'Note: AI diagnosis is an automated estimate and not binding professional trade advice.'
    };
  }

  return {
    possibleIssue: 'General Household Maintenance / Wall Mounting Issue',
    recommendedCategory: category || 'handyman',
    urgency: 'this_week',
    estimatedLaborRange: '₹300 – ₹500',
    recommendedAction: 'Schedule a verified handyman for inspection and on-site repair.',
    safetyWarning: 'Verify electrical and plumbing wall conduits before drilling.',
    isAiGenerated: false,
    disclaimer: 'Note: AI diagnosis is an automated estimate and not binding professional trade advice.'
  };
}

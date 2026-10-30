// GEOLOCATION & HYPERLOCAL DISTANCE UTILITIES FOR WORKWAY V2

// Haversine formula to compute distance in km between two lat/long points
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 1.5; // default reasonable distance fallback

  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return parseFloat(distance.toFixed(1));
}

// Calculate WorkWay Match Score (0 - 100%)
export function calculateWorkWayMatchScore(provider, userCoords, targetCategory) {
  const distance = calculateHaversineDistance(
    userCoords.lat,
    userCoords.lng,
    provider.latitude,
    provider.longitude
  );

  // 1. Distance (30%)
  let distanceScore = 100;
  if (distance > 10) distanceScore = 20;
  else if (distance > 5) distanceScore = 50;
  else if (distance > 2) distanceScore = 80;
  else if (distance > 1) distanceScore = 95;

  // 2. Availability (25%)
  let availScore = 0;
  if (provider.dutyStatus === 'available') availScore = 100;
  else if (provider.dutyStatus === 'busy') availScore = 40;
  else if (provider.dutyStatus === 'on_the_way') availScore = 60;

  // 3. Rating (20%)
  const ratingScore = Math.min(100, ((provider.rating || 4.5) / 5.0) * 100);

  // 4. Experience / Jobs Completed (10%)
  const jobs = provider.jobsCompleted || 0;
  let expScore = 50;
  if (jobs >= 300) expScore = 100;
  else if (jobs >= 100) expScore = 85;
  else if (jobs >= 50) expScore = 70;

  // 5. Category / Similar Jobs match (10%)
  const catScore = (!targetCategory || provider.trade === targetCategory) ? 100 : 70;

  // 6. Response Speed (5%)
  const respScore = provider.responseTimeMinutes <= 10 ? 100 : 80;

  const totalScore = Math.round(
    distanceScore * 0.30 +
    availScore * 0.25 +
    ratingScore * 0.20 +
    expScore * 0.10 +
    catScore * 0.10 +
    respScore * 0.05
  );

  return {
    score: Math.min(99, Math.max(65, totalScore)),
    distance,
    breakdown: [
      `${distance} km away`,
      provider.dutyStatus === 'available' ? 'Available now' : 'Busy',
      `${provider.rating}★ rating`,
      `${provider.jobsCompleted} jobs completed`,
      provider.verificationLevel === 'level_3_master_pro' ? 'Master Pro Verified' : 'Verified Technician'
    ]
  };
}

// Request Browser Geolocation
export function getCurrentPositionPromise() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  });
}

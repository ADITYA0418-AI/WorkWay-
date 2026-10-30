import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 5, reviewCount, size = 'sm' }) => {
  const iconSize = size === 'lg' ? 'w-5 h-5' : size === 'xs' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSize} ${
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-slate-800 text-slate-700'
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-slate-200 ml-1">
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className="text-xs text-slate-400">({reviewCount})</span>
      )}
    </div>
  );
};

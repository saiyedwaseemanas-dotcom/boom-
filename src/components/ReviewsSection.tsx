import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, ExternalLink, Shield } from 'lucide-react';
import { GOOGLE_REVIEWS, SPA_INFO } from '../data/spaData';
import { GoogleReview } from '../types';

export const ReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'hammam' | 'couples' | 'massage'>('all');

  const filteredReviews = GOOGLE_REVIEWS.filter((rev) => {
    if (filter === 'hammam') return rev.treatmentMentioned.toLowerCase().includes('hammam');
    if (filter === 'couples') return rev.treatmentMentioned.toLowerCase().includes('couple');
    if (filter === 'massage') return rev.treatmentMentioned.toLowerCase().includes('massage');
    return true;
  });

  return (
    <section id="reviews" className="py-24 bg-stone-50 text-stone-900 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Rating Aggregate Summary */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full inline-block mb-3">
              Google Verified Feedback
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-stone-900 tracking-tight">
              Words From <span className="italic text-amber-800">Our Guests</span>
            </h2>
            <p className="text-stone-600 text-base max-w-xl mt-3">
              Authentic reviews from Ahmedabad residents and visitors experiencing our Turkish Hammam, therapeutic massages, and couples suites.
            </p>
          </div>

          {/* Google Rating Aggregate Card */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md flex items-center gap-6 w-full sm:w-auto">
            <div className="text-center pr-6 border-r border-stone-200">
              <div className="text-4xl sm:text-5xl font-serif font-bold text-stone-900">
                {SPA_INFO.googleRating}
              </div>
              <div className="flex text-amber-400 justify-center my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-500 font-medium">150+ Google Reviews</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                {/* Google "G" Colored logo badge */}
                <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center font-bold text-xs text-blue-600 border border-blue-200">
                  G
                </div>
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Google Verified Spa
                </span>
              </div>
              <p className="text-xs text-stone-600">
                Ranked among Ahmedabad’s top luxury wellness retreats in Thaltej.
              </p>
              <a
                href={SPA_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 inline-flex"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'hammam', label: 'Turkish Hammam' },
            { id: 'couples', label: 'Couples Sanctuary' },
            { id: 'massage', label: 'Therapeutic Massages' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === tab.id
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between hover:border-amber-300 transition-colors"
            >
              <div>
                {/* Author Info & Star Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center font-bold text-amber-900 text-sm">
                      {rev.authorName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                        <span>{rev.authorName}</span>
                        {rev.verifiedGuest && (
                          <span title="Verified Guest">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                          </span>
                        )}
                      </h4>
                      <p className="text-[11px] text-stone-500">{rev.timeAgo}</p>
                    </div>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Treatment Mentioned Tag */}
                <div className="mb-3">
                  <span className="text-[11px] font-medium bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-md border border-stone-200">
                    Treatment: {rev.treatmentMentioned}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-stone-700 text-sm leading-relaxed mb-4 italic">
                  "{rev.text}"
                </p>

                {/* Owner Reply if available */}
                {rev.ownerReply && (
                  <div className="bg-amber-50/70 border-l-2 border-amber-500 p-3 rounded-r-lg mb-3">
                    <p className="text-[11px] font-bold text-amber-900 mb-0.5 flex items-center gap-1">
                      <span>Response from Blossom Spa Management</span>
                    </p>
                    <p className="text-xs text-amber-900/90 leading-normal">
                      {rev.ownerReply}
                    </p>
                  </div>
                )}
              </div>

              {/* Helpful count */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3 text-stone-400" />
                  <span>{rev.helpfulCount} people found this helpful</span>
                </span>
                <span className="text-stone-400 font-medium">via Google</span>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Google Review Call to Action */}
        <div className="mt-12 text-center">
          <a
            href={SPA_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-semibold text-xs border border-stone-300 shadow-sm transition-colors"
          >
            <span>Read all 150+ reviews on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
          </a>
        </div>
      </div>
    </section>
  );
};

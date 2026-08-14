'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { generateMapLink } from '@/lib/wedding-utils';

interface VenueInformationProps {
  venue: WeddingConfigType['venue'];
}

export const VenueInformation = ({ venue }: VenueInformationProps) => {
  const { t } = useTranslation('home');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4">
            {t('venue.location-title')}
          </h2>
          <div className="w-24 h-px bg-rose-400 mx-auto"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            {t('venue.location-subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Ceremony Venue */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 shadow-lg border border-purple-100"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-3xl">⛪</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 mb-2">
                {t('venue.ceremony-time')}
              </h3>
              <div className="w-16 h-px bg-purple-400 mx-auto"></div>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  {venue.ceremony.name}
                </h4>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4">
                  {venue.ceremony.address}
                </p>
                <div className="inline-block bg-white/60 rounded-lg px-4 py-2 shadow-sm">
                  <p className="text-purple-700 font-medium text-sm sm:text-base">
                    📅 {venue.ceremony.time}
                  </p>
                </div>
              </div>

              <div className="bg-white/50 rounded-2xl p-6 space-y-4">
                <h5 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
                  {t('venue.ceremony-details')}
                </h5>
                <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <p>• {t('venue.arrive-early')}</p>
                  <p>• {t('venue.unplugged')}</p>
                  <p>• {t('venue.parking')}</p>
                  <p>• {t('venue.wheelchair')}</p>
                </div>
              </div>

              <button
                onClick={() =>
                  window.open(generateMapLink(venue.ceremony.name), '_blank')
                }
                className="w-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-500 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base cursor-pointer"
              >
                {t('venue.view-map')}
              </button>
            </div>
          </motion.div>

          {/* Reception Venue */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 shadow-lg border border-amber-100"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-3xl">🥂</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 mb-2">
                {t('venue.reception-time')}
              </h3>
              <div className="w-16 h-px bg-amber-400 mx-auto"></div>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  {venue.reception.name}
                </h4>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4">
                  {venue.reception.address}
                </p>
                <div className="inline-block bg-white/60 rounded-lg px-4 py-2 shadow-sm">
                  <p className="text-amber-700 font-medium text-sm sm:text-base">
                    🍽️ {venue.reception.time}
                  </p>
                </div>
              </div>

              <div className="bg-white/50 rounded-2xl p-6 space-y-4">
                <h5 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
                  {t('venue.reception-details')}
                </h5>
                <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <p>• {t('venue.welcome-drink')}</p>
                  <p>• {t('venue.open-bar')}</p>
                  <p>• {t('venue.dancing')}</p>
                  <p>• {t('venue.valet')}</p>
                </div>
              </div>

              <button
                onClick={() =>
                  window.open(generateMapLink(venue.reception.name), '_blank')
                }
                className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-3 px-6 rounded-xl font-medium hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base cursor-pointer"
              >
                {t('venue.view-map')}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Please Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 max-w-3xl mx-auto border border-rose-100">
            <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              {t('details.please-note')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <div className="text-xl sm:text-2xl mb-2">👗</div>
                <p className="font-medium">{t('details.dress-code')}</p>
                <p>{t('details.formal-attire')}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl sm:text-2xl mb-2">🚗</div>
                <p className="font-medium">{t('details.parking')}</p>
                <p>{t('details.valet-available')}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl sm:text-2xl mb-2">📱</div>
                <p className="font-medium">{t('details.contact')}</p>
                <p>+62 812 3456 7890</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

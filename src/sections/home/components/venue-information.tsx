'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

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

        {/* Venue */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 border border-rose-100/50"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white text-3xl">📍</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 mb-2">
              {venue.name}
            </h3>
            <div className="w-16 h-px bg-rose-400 mx-auto"></div>
          </div>

          <div className="space-y-6">
            <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center">
              {venue.address}
            </p>

            <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden shadow-md border border-rose-100">
              <iframe
                src={venue.mapEmbedUrl}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title={venue.name}
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <a
              href={venue.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-gradient-to-r from-rose-400 to-pink-500 text-white py-3 px-6 rounded-xl font-medium hover:from-rose-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              {t('venue.view-map')}
            </a>
          </div>
        </motion.div>

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
                <div className="text-xl sm:text-2xl mb-2">🚻</div>
                <p className="font-medium">{t('details.seating')}</p>
                <p>{t('details.seating-separate')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

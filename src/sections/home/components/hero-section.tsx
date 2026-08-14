'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface HeroSectionProps {
  isLoaded: boolean;
  couple: WeddingConfigType;
  onScrollToSection: (sectionId: string) => void;
}

export const HeroSection = ({
  isLoaded,
  couple,
  onScrollToSection,
}: HeroSectionProps) => {
  const { t } = useTranslation('home');

  return (
    <div className="h-dvh bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 relative overflow-hidden">
      {/* Background Decorations — slow breathing motion.
          Only `opacity`/`scale` are animated (no `x`/`y` translation) since
          animating position on a `blur-3xl` element is what was making
          mobile GPUs choke — every frame has to re-rasterize the blur at
          a new offset. Opacity/scale alone stay compositor-cheap. */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        {/* Static positioning wrapper so the animated transform below
            doesn't clobber the centering translate */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
          <motion.div
            className="w-full h-full bg-pink-200/20 rounded-full blur-3xl"
            animate={{ opacity: [0.2, 0.35, 0.2] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
        </div>
      </div>

      {/* Drifting Petals — 6, still no `rotate`, to keep the per-frame
          compositing cost low enough for weaker mobile GPUs. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '-10vh', opacity: 0 }}
            animate={{
              y: '110vh',
              opacity: [0, 0.8, 0.8, 0],
              x: [0, 20, -20, 0],
            }}
            transition={{
              duration: 14 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 3,
            }}
            className="absolute text-rose-300 text-lg sm:text-xl"
            style={{ left: `${8 + i * 15}%` }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-6 pt-10 sm:pt-18 md:pt-20">
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-6 sm:mb-8"
            >
              <h2
                dir="rtl"
                lang="ar"
                className="font-amiri text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-rose-700 mb-4 leading-relaxed"
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </h2>
              <div className="text-sm sm:text-base md:text-lg font-medium uppercase tracking-[0.2em] text-rose-500/80 mb-4">
                {t('letter.mr-and-mrs')} {couple.groom.fatherName}
              </div>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-md mx-auto mb-6">
                {t('letter.you-are-invited')}
              </p>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto"></div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <motion.button
                onClick={() => onScrollToSection('rsvp')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {t('navigation.rsvp')}
              </motion.button>
              <motion.button
                onClick={() => onScrollToSection('details')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/80 backdrop-blur-sm text-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer"
              >
                {t('hero.view-details')}
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center pb-6 sm:pb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="z-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gray-600 text-center cursor-pointer"
              onClick={() => onScrollToSection('couple')}
            >
              <div className="text-xs mb-1 sm:mb-2">
                {t('hero.scroll-down')}
              </div>
              <div className="text-lg sm:text-xl">⬇️</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Remove the old absolute positioned scroll indicator */}
    </div>
  );
};

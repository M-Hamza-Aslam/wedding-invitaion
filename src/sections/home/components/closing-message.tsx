'use client';

import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

interface ClosingMessageProps {
  bride: string;
  groom: string;
  fatherName: string;
}

export const ClosingMessage = ({
  bride,
  groom,
  fatherName,
}: ClosingMessageProps) => {
  const { t } = useTranslation('home');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className="pt-20 pb-6 px-4 bg-gradient-to-br from-rose-100 to-pink-200"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-6">
            {t('closing-message.title')}
          </h2>
          <div className="w-24 h-px bg-rose-500 mx-auto mb-8"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/40 mb-12"
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed mb-6 font-light">
            &quot;
            {t('closing-message.quote', { groomName: groom, brideName: bride })}
            &quot;
          </p>
          <div className="text-base sm:text-lg text-gray-600">
            {t('closing-message.with-love')}
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-rose-600 mt-2">
            {t('letter.mr-and-mrs')} {fatherName}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          <div className="flex justify-center space-x-4 text-2xl sm:text-3xl md:text-4xl">
            <span className="animate-bounce">💕</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>
              💖
            </span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
              💕
            </span>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 pt-8 border-t border-white/40"
        >
          <p
            dir="rtl"
            lang="ar"
            className="font-amiri text-base sm:text-lg text-rose-600 mb-3 leading-relaxed"
          >
            اللَّهُمَّ بَارِكْ لَهُمَا وَبَارِكْ عَلَيْهِمَا
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            Made with 💕 for our special day
          </p>
        </motion.div>
      </div>
    </div>
  );
};

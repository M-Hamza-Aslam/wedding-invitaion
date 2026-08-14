'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName: string;
  fatherName: string;
}

// Tiny feTurbulence noise baked into a static SVG, used as a tiled
// background-image so the envelope paper doesn't read as a flat UI gradient.
// (Static data URI, not a runtime filter, so it's cheap on low-end phones.)
const PAPER_GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

// Two thin diagonal bands converging near the flap's fold point, standing in
// for the side-flap seams you'd see folded behind a real envelope's face.
const SEAM_LINES_STYLE = {
  backgroundImage:
    'linear-gradient(122deg, transparent 0 48.4%, rgba(190,50,90,0.12) 48.4% 49.4%, transparent 49.4% 100%),' +
    'linear-gradient(58deg, transparent 0 48.4%, rgba(190,50,90,0.12) 48.4% 49.4%, transparent 49.4% 100%)',
};

// Fixed (non-random) scatter targets for the wax-seal "crack" shards, so the
// shatter is deterministic — computed once at module load, not per render.
const SEAL_SHARDS = [10, 70, 130, 190, 250, 310].map((deg, i) => {
  const rad = (deg * Math.PI) / 180;
  const dist = 40 + (i % 2) * 12;

  return { x: Math.cos(rad) * dist, y: Math.sin(rad) * dist, rotate: deg };
});

function getMonogram(coupleName: string) {
  const initials = coupleName
    .split('&')
    .map((part) => part.trim().charAt(0).toUpperCase())
    .filter(Boolean);

  return initials.length >= 2 ? `${initials[0]} & ${initials[1]}` : (initials[0] ?? '♥');
}

export const LetterAnimation = ({
  onOpen,
  coupleName,
  fatherName,
}: LetterAnimationProps) => {
  const { t } = useTranslation('home');

  const monogram = getMonogram(coupleName);

  const [isOpening, setIsOpening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Re-randomized on every hover (a user event, not render, so this stays
  // out of the component's render body which must remain pure) so each
  // sparkle burst scatters differently.
  const [sparkleOffsets, setSparkleOffsets] = useState<
    { x: number; y: number }[]
  >(() => Array.from({ length: 8 }, () => ({ x: 0, y: 0 })));

  const randomizeSparkles = () => {
    setSparkleOffsets(
      Array.from({ length: 8 }, () => ({
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
      }))
    );
  };

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '100%', opacity: 0.3, rotate: 0 }}
            animate={{
              y: '-100%',
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 360, 720],
              x: [0, 50, -50, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 1.5,
            }}
            className="absolute text-rose-300"
            style={{
              left: `${10 + i * 15}%`,
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center">
          {/* Greeting Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-8 sm:mb-12"
          >
            <h1
              dir="rtl"
              lang="ar"
              className="font-amiri text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-rose-700 mb-4 leading-relaxed"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </h1>
            <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-rose-500/80 mb-3">
              {t('letter.mr-and-mrs')} {fatherName}
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-md mx-auto">
              {t('letter.you-are-invited')}
            </p>
          </motion.div>

          {/* Letter Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="relative mx-auto"
            style={{ perspective: '1200px' }}
          >
            <motion.div
              className="relative cursor-pointer"
              onClick={handleClick}
              onHoverStart={() => {
                setIsHovered(true);
                randomizeSparkles();
              }}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Envelope Body (back panel + paper texture + seams) */}
              <motion.div
                className="w-80 h-56 sm:w-96 sm:h-64 rounded-[3px] relative mx-auto z-10"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg,#fef3f5 0%,#fbe1e7 45%,#f6c9d4 100%)',
                  boxShadow:
                    '0 1px 1px rgba(160,40,80,0.15), 0 10px 20px -8px rgba(160,40,80,0.3), 0 28px 46px -18px rgba(160,40,80,0.28)',
                }}
                animate={{
                  rotateY: isOpening ? 8 : 0,
                  scale: isOpening ? 0.99 : 1,
                }}
                transition={{ duration: 0.8 }}
              >
                {/* Paper grain */}
                <div
                  className="absolute inset-0 rounded-[3px] mix-blend-multiply opacity-70 pointer-events-none"
                  style={{ backgroundImage: `url("${PAPER_GRAIN}")` }}
                />

                {/* Side-flap seam lines */}
                <div
                  className="absolute inset-0 rounded-[3px] pointer-events-none"
                  style={SEAM_LINES_STYLE}
                />

                {/* Bottom flap fold shadow */}
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-rose-900/10 to-transparent pointer-events-none" />

                {/* Envelope Flap */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-[60%] origin-top z-20"
                  style={{
                    backgroundImage:
                      'linear-gradient(160deg,#fce7ec 0%,#f6d3dc 60%,#eeb6c5 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 51% 100%, 49% 100%)',
                    boxShadow: 'inset 0 -6px 10px -6px rgba(160,40,80,0.22)',
                  }}
                  animate={{
                    rotateX: isOpening ? -172 : 0,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: isOpening ? 0.3 : 0,
                    ease: [0.45, 0, 0.2, 1],
                  }}
                >
                  <div
                    className="absolute inset-0 mix-blend-multiply opacity-70"
                    style={{ backgroundImage: `url("${PAPER_GRAIN}")` }}
                  />
                </motion.div>

                {/* Soft shadow cast by the flap as it lifts */}
                <motion.div
                  className="absolute inset-x-8 top-1 h-6 rounded-full bg-black/20 blur-md pointer-events-none z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isOpening ? [0, 0.5, 0] : 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />

                {/* Wax Seal */}
                <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                  <motion.div
                    className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center"
                    style={{ borderRadius: '43% 57% 61% 39% / 47% 41% 59% 53%' }}
                    animate={{
                      scale: isOpening ? 0 : isHovered ? 1.08 : 1,
                      rotate: isOpening ? -28 : isHovered ? 4 : 0,
                      opacity: isOpening ? 0 : 1,
                    }}
                    transition={{
                      duration: isOpening ? 0.45 : 0.3,
                      ease: isOpening ? 'backIn' : 'easeOut',
                    }}
                  >
                    {/* Wax base */}
                    <div
                      className="absolute inset-0"
                      style={{
                        borderRadius: 'inherit',
                        backgroundImage:
                          'radial-gradient(circle at 32% 28%, #b23a4e 0%, #8b1a2b 45%, #5c0f1c 100%)',
                        boxShadow:
                          'inset 0 2px 3px rgba(255,255,255,0.25), inset 0 -4px 6px rgba(0,0,0,0.4), 0 3px 6px rgba(60,10,15,0.5)',
                      }}
                    />
                    {/* Melted drips */}
                    <div
                      className="absolute -bottom-1 left-4 w-2.5 h-3 rotate-45"
                      style={{
                        borderRadius: '50% 50% 50% 0',
                        backgroundImage:
                          'radial-gradient(circle at 30% 25%, #96283a, #5c0f1c)',
                      }}
                    />
                    <div
                      className="absolute -bottom-1.5 right-5 w-2 h-2.5 rotate-12"
                      style={{
                        borderRadius: '50% 50% 50% 0',
                        backgroundImage:
                          'radial-gradient(circle at 30% 25%, #96283a, #5c0f1c)',
                      }}
                    />
                    {/* Embossed monogram */}
                    <span
                      className="relative font-serif italic tracking-widest text-[11px] sm:text-sm text-[#f6d9df] select-none"
                      style={{
                        textShadow:
                          '0 1px 0 rgba(255,255,255,0.2), 0 -1px 1px rgba(0,0,0,0.5)',
                      }}
                    >
                      {monogram}
                    </span>

                    {/* Crack shards */}
                    {SEAL_SHARDS.map((shard, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2.5 h-2.5 pointer-events-none"
                        style={{
                          borderRadius: '30% 70% 60% 40% / 50%',
                          backgroundImage:
                            'radial-gradient(circle at 30% 25%, #96283a, #5c0f1c)',
                        }}
                        initial={{ x: 0, y: 0, opacity: 0, rotate: shard.rotate }}
                        animate={
                          isOpening
                            ? {
                                x: shard.x,
                                y: shard.y,
                                opacity: [0, 1, 0],
                                rotate: shard.rotate + 50,
                              }
                            : { x: 0, y: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              {/* Letter Inside */}
              <AnimatePresence>
                {isOpening && (
                  <motion.div
                    initial={{ y: 6, opacity: 0, scale: 0.92, rotate: -2 }}
                    animate={{ y: -52, opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-54 sm:w-80 sm:h-58 rounded-[3px] border border-[#f3d9df] z-20"
                    style={{
                      backgroundImage:
                        'linear-gradient(160deg,#fffbfc 0%,#fdf0f3 100%)',
                      boxShadow:
                        '0 1px 1px rgba(160,40,80,0.1), 0 16px 30px -10px rgba(160,40,80,0.25)',
                    }}
                  >
                    <div className="p-6 sm:p-8 h-full flex flex-col justify-center text-center">
                      <div className="text-rose-500 text-2xl sm:text-3xl mb-4">
                        💕
                      </div>
                      <h3 className="text-lg sm:text-xl font-serif text-gray-800 mb-2">
                        {t('letter.mr-and-mrs')} {fatherName}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">
                        {t('letter.invitation-title', { coupleName })}
                      </p>
                      {/* <div className="text-xs sm:text-sm text-gray-500 font-serif italic">
                        &ldquo;{t('letter.invitation-quote')}&rdquo;
                      </div> */}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sparkle Effects */}
              <AnimatePresence>
                {isHovered && !isOpening && (
                  <>
                    {sparkleOffsets.map((offset, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: [0, offset.x],
                          y: [0, offset.y],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                        className="absolute top-1/2 left-1/2 text-amber-300 text-sm pointer-events-none"
                      >
                        ✨
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Click Instruction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpening ? 0 : 1 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="mt-8 sm:mt-12"
          >
            <motion.p
              animate={{
                y: [0, -8, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-sm sm:text-base text-gray-600 font-medium"
            >
              {isHovered
                ? t('letter.click-to-open-hover')
                : t('letter.click-to-open')}
            </motion.p>
            <div className="flex justify-center mt-4">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-2xl"
              >
                👆
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Loading overlay when opening */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-4 border-rose-200 border-t-rose-500 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600 text-lg font-medium">
                {t('letter.opening-the-invitation')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

const CONTACTS = [
  { name: 'Muhammad Aslam', relation: 'Father', phone: '+92-322-2562862' },
  { name: 'Muhammad Usama', relation: 'Brother', phone: '+92-341-3128448' },
  { name: 'Muhammad Haris', relation: 'Brother', phone: '+92-312-3898395' },
];

// Submits straight to FormSubmit.co — no backend of our own needed.
// Each RSVP arrives as an email to this address. The very first submission
// requires a one-time confirmation click from that inbox before FormSubmit
// starts forwarding messages.
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/hamza.prolink@gmail.com';

export const RSVP = () => {
  const { t } = useTranslation('home');

  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    phone: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitError(false);

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New RSVP from ${formData.name}`,
          Name: formData.name,
          Attending: formData.attendance === 'yes' ? 'Yes' : 'No',
          Phone: formData.phone || '—',
          Message: formData.message || '—',
        }),
      });

      if (!response.ok) throw new Error('RSVP submission failed');

      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          attendance: '',
          phone: '',
          message: '',
        });
      }, 3000);
    } catch {
      setSubmitError(true);
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-100">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-12 shadow-xl border border-rose-100"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-800 mb-4">
              {t('rsvp.thank-you')}
            </h3>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl">
              {t('rsvp.thank-you-received')}
            </p>
            <div className="mt-6 text-2xl">💕</div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-100"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4">
            {t('rsvp.title')}
          </h2>
          <div className="w-24 h-px bg-rose-400 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('rsvp.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* RSVP Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-rose-100">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 mb-6 text-center">
                {t('rsvp.confirm-attendance')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
                  >
                    {t('rsvp.full-name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300"
                    placeholder={t('rsvp.full-name')}
                  />
                </div>
                {/* Attendance */}
                <div>
                  <label
                    htmlFor="attendance"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
                  >
                    {t('rsvp.will-attend')} *
                  </label>
                  <select
                    id="attendance"
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300"
                  >
                    <option value="">{t('rsvp.please-select')}</option>
                    <option value="yes">{t('rsvp.yes-there')}</option>
                    <option value="no">{t('rsvp.no-cant')}</option>
                  </select>
                </div>
                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
                  >
                    {t('rsvp.phone-number')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300"
                    placeholder={t('rsvp.phone-placeholder')}
                  />
                </div>
                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
                  >
                    {t('rsvp.message-couple')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300 resize-none"
                    placeholder={t('rsvp.message-placeholder')}
                  />
                </div>

                {/* Submit Error */}
                {submitError && (
                  <p className="text-xs sm:text-sm text-red-500 text-center">
                    {t('rsvp.submit-error')}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-4 px-6 rounded-xl font-medium text-base sm:text-lg hover:from-rose-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                >
                  {isSending ? t('rsvp.sending') : t('rsvp.send-rsvp')}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* RSVP Deadline */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-rose-600 text-xl">⏰</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    {t('rsvp.deadline')}
                  </h4>
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">
                {t('rsvp.deadline-help')}
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-xl">📞</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    {t('rsvp.questions')}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {t('rsvp.questions-help')}
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-gray-600">
                {CONTACTS.map((contact) => (
                  <div
                    key={contact.phone}
                    className="flex items-center justify-between gap-2"
                  >
                    <span>
                      {contact.name}{' '}
                      <span className="text-gray-400">
                        ({contact.relation})
                      </span>
                    </span>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-rose-600 font-medium whitespace-nowrap"
                    >
                      {contact.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

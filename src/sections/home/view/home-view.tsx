'use client';

import { useState, useEffect } from 'react';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { LetterAnimation } from '@/components';
import {
  HeroSection,
  CoupleIntroduction,
  WeddingDetailsCard,
  CountdownTimer,
  VenueInformation,
  EventSchedule,
  RSVP,
  ClosingMessage,
  FloatingNavigation,
  NavigationFAB,
  MusicPlayer,
  ScrollProgressIndicator,
} from '../components';
import { NAVIGATION_SECTIONS, WEDDING_CONFIG } from '@/constants';

export default function HomeView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLetter, setShowLetter] = useState(true);

  // Auto-detect active section using scroll spy
  const activeSection = useScrollSpy(
    NAVIGATION_SECTIONS.map((section) => section.id)
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleLetterOpen = () => {
    setShowLetter(false);
    setTimeout(() => setIsLoaded(true), 300);
  };

  // Show letter animation first
  if (showLetter) {
    return (
      <LetterAnimation
        onOpen={handleLetterOpen}
        coupleName={`${WEDDING_CONFIG.bride.name} & ${WEDDING_CONFIG.groom.name}`}
        fatherName={WEDDING_CONFIG.groom.fatherName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <FloatingNavigation
        activeSection={activeSection}
        onScrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <section id="hero" className="relative">
        <HeroSection
          isLoaded={isLoaded}
          couple={WEDDING_CONFIG}
          onScrollToSection={scrollToSection}
        />
      </section>

      {/* Couple Introduction */}
      <section id="couple" className="relative">
        <CoupleIntroduction
          bride={WEDDING_CONFIG.bride}
          groom={WEDDING_CONFIG.groom}
          isVisible={isLoaded}
        />
      </section>

      {/* Wedding Details */}
      <section id="details" className="relative">
        <WeddingDetailsCard
          date={WEDDING_CONFIG.date}
          venue={WEDDING_CONFIG.venue}
        />
      </section>

      {/* Venue & Location */}
      <section id="venue" className="relative">
        <VenueInformation venue={WEDDING_CONFIG.venue} />
        <CountdownTimer targetDate={WEDDING_CONFIG.date} />
      </section>

      {/* Event Schedule */}
      <section className="relative">
        <EventSchedule />
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="relative">
        <RSVP />
      </section>

      {/* Closing Message */}
      <section id="closing" className="relative">
        <ClosingMessage
          bride={WEDDING_CONFIG.bride.fullName}
          groom={WEDDING_CONFIG.groom.fullName}
        />
      </section>

      {/* Music Player */}
      <MusicPlayer />

      {/* Mobile Navigation FAB */}
      <NavigationFAB
        activeSection={activeSection}
        onScrollToSection={scrollToSection}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator activeSection={activeSection} />
    </div>
  );
}

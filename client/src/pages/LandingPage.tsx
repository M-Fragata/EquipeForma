import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Metrics } from '../components/Metrics';
import { Modalities } from '../components/Modalities';
//import { Corporate } from '../components/Corporate';
import { ScheduleMap } from '../components/ScheduleMap';
import { Plans } from '../components/Plans';
import { Footer } from '../components/Footer';
import { WhatsAppCTA } from '../components/WhatsAppCTA';

export const LandingPage: React.FC = () => {
  return (
    <div className="landing-page-root">
      <Navbar />
      <main>
        <Hero />
        <Metrics />
        <Modalities />
        {/*<Corporate />*/}
        <ScheduleMap />
        <Plans />
      </main>
      <Footer />
      <WhatsAppCTA />
    </div>
  );
};
export default LandingPage;

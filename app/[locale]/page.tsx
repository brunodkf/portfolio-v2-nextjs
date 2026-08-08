import Hero from '../components/home/Hero';
import ProofStrip from '../components/home/ProofStrip';
import CaseStudies from '../components/home/CaseStudies';
import ExperienceTimeline from '../components/home/ExperienceTimeline';
import AboutSection from '../components/home/AboutSection';
import ContactSection from '../components/home/ContactSection';

export default function Home() {
  return (
    <main className="w-full text-preto dark:text-branco">
      <Hero />
      <ProofStrip />
      <CaseStudies />
      <ExperienceTimeline />
      <AboutSection />
      <ContactSection />
    </main>
  );
}

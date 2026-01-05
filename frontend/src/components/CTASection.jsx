import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { Button } from './ui/button';

const CTASection = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-700 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Heart className="w-4 h-4 text-red-300" />
            <span className="text-sm text-white/90 font-medium">Your Health Matters</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Your Health Deserves
            <br />
            <span className="text-cyan-200">Expert Care</span>
          </h2>

          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Don't wait to prioritize your health. Schedule an appointment today
            and take the first step towards a healthier, happier you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection('#appointments')}
              size="lg"
              className="bg-white text-teal-700 hover:bg-white/90 px-8 py-6 rounded-full text-lg font-semibold shadow-xl transition-all hover:shadow-2xl group"
            >
              Schedule an Appointment
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollToSection('#contact')}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg font-semibold backdrop-blur-sm"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

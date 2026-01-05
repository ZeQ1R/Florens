import React from 'react';
import { ArrowRight, Shield, Clock, Award } from 'lucide-react';
import { Button } from './ui/button';

const HeroSection = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-teal-100 font-medium">Trusted Healthcare Partner</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Comprehensive Care{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                You Can Trust
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0">
              Experienced specialists, modern diagnostics, and patient-first care.
              Your health journey starts with a team that truly cares.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => scrollToSection('#appointments')}
                size="lg"
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-6 rounded-full text-lg font-semibold shadow-xl shadow-teal-500/25 transition-all hover:shadow-2xl hover:shadow-teal-500/30 group"
              >
                Book Appointment
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => scrollToSection('#services')}
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg font-semibold backdrop-blur-sm"
              >
                Our Services
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-12">
              <div className="flex items-center space-x-2 text-slate-300">
                <Award className="w-5 h-5 text-teal-400" />
                <span className="text-sm">Certified Doctors</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Clock className="w-5 h-5 text-teal-400" />
                <span className="text-sm">Open 7 Days</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Shield className="w-5 h-5 text-teal-400" />
                <span className="text-sm">20+ Years Experience</span>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-white/5 rounded-2xl">
                    <div className="text-4xl font-bold text-white mb-2">15K+</div>
                    <div className="text-sm text-slate-300">Happy Patients</div>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-2xl">
                    <div className="text-4xl font-bold text-white mb-2">25+</div>
                    <div className="text-sm text-slate-300">Expert Doctors</div>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-2xl">
                    <div className="text-4xl font-bold text-white mb-2">20+</div>
                    <div className="text-sm text-slate-300">Years Experience</div>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-2xl">
                    <div className="text-4xl font-bold text-white mb-2">6</div>
                    <div className="text-sm text-slate-300">Specializations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

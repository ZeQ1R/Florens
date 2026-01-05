import React from 'react';
import { Stethoscope, Baby, Heart, HeartPulse, Sparkles, Microscope, ArrowRight } from 'lucide-react';
import { services } from '../data/mock';

const iconMap = {
  Stethoscope,
  Baby,
  Heart,
  HeartPulse,
  Sparkles,
  Microscope,
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-teal-600 font-semibold text-sm tracking-wider uppercase mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Comprehensive Medical Care
          </h2>
          <p className="text-lg text-slate-600">
            From routine check-ups to specialized treatments, we offer a full range of
            healthcare services to meet your family's needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-teal-200 hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {IconComponent && (
                    <IconComponent className="w-7 h-7 text-teal-600" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-teal-700 transition-colors">
                  {service.name}
                </h3>

                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <button className="inline-flex items-center text-teal-600 font-medium group-hover:text-teal-700 transition-colors">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

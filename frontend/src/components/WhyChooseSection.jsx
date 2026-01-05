import React from 'react';
import { Award, Cpu, Clock, Users, CheckCircle } from 'lucide-react';
import { benefits } from '../data/mock';

const iconMap = {
  Award,
  Cpu,
  Clock,
  Users,
};

const WhyChooseSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-teal-400 font-semibold text-sm tracking-wider uppercase mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Families Trust{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                Florens
              </span>
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              We combine medical expertise with genuine compassion to deliver
              healthcare that makes a real difference in your life.
            </p>

            <ul className="space-y-4">
              {[
                'State-of-the-art medical facilities',
                'Personalized treatment plans',
                'Insurance and payment flexibility',
                'Multilingual staff available',
              ].map((item, index) => (
                <li key={index} className="flex items-center text-slate-300">
                  <CheckCircle className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon];
              return (
                <div
                  key={benefit.id}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-teal-500/30 transition-all duration-300 group"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {IconComponent && (
                      <IconComponent className="w-6 h-6 text-teal-400" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;

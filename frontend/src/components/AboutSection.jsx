import React from 'react';
import { Building2, ShieldCheck, Users } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-3xl blur-xl" />
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
                alt="Florens Polyclinic Interior"
                className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6 max-w-xs hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-7 h-7 text-teal-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800">20+</div>
                    <div className="text-sm text-slate-600">Years of Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block text-teal-600 font-semibold text-sm tracking-wider uppercase mb-4">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              About Florens Polyclinic
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Florens Polyclinic is a modern healthcare center dedicated to providing
              comprehensive medical services in a comfortable and professional environment.
              Our mission is to improve lives through quality care and medical excellence.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Founded with a vision to make quality healthcare accessible, we have grown
              into a trusted name serving thousands of families. Our commitment to patient-centered
              care, continuous innovation, and medical expertise sets us apart.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <Building2 className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">6</div>
                <div className="text-sm text-slate-600">Departments</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <Users className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">15K+</div>
                <div className="text-sm text-slate-600">Patients</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <ShieldCheck className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">25+</div>
                <div className="text-sm text-slate-600">Doctors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

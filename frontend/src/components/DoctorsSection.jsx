import React from 'react';
import { Calendar, Award } from 'lucide-react';
import { Button } from './ui/button';
import { doctors } from '../data/mock';

const DoctorsSection = () => {
  return (
    <section id="doctors" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-teal-600 font-semibold text-sm tracking-wider uppercase mb-4">
            Our Specialists
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Meet Our Expert Doctors
          </h2>
          <p className="text-lg text-slate-600">
            Our team of board-certified physicians brings decades of combined experience
            and a genuine commitment to your well-being.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={doctor.id}
              className="group relative bg-slate-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  {doctor.name}
                </h3>
                <p className="text-teal-600 font-medium mb-3">
                  {doctor.specialty}
                </p>
                <div className="flex items-center text-slate-500 text-sm mb-4">
                  <Award className="w-4 h-4 mr-2 text-teal-500" />
                  <span>{doctor.experience} experience</span>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-teal-200 text-teal-600 hover:bg-teal-50 hover:border-teal-300 rounded-xl group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600 transition-all"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../data/mock';
import { Button } from './ui/button';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-teal-600 font-semibold text-sm tracking-wider uppercase mb-4">
            Patient Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            What Our Patients Say
          </h2>
          <p className="text-lg text-slate-600">
            Real experiences from families who trust us with their healthcare needs.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-teal-100 rounded-full opacity-50 blur-xl" />
          <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-cyan-100 rounded-full opacity-50 blur-xl" />

          <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <Quote className="w-12 h-12 text-teal-200 absolute top-8 left-8" />

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl md:text-2xl text-slate-700 text-center leading-relaxed mb-8">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">
                    {testimonials[currentIndex].name.charAt(0)}
                  </span>
                </div>
                <div className="font-semibold text-slate-800 text-lg">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-slate-500">Verified Patient</div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full border-slate-200 hover:bg-teal-50 hover:border-teal-300"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </Button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-teal-600 w-8'
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full border-slate-200 hover:bg-teal-50 hover:border-teal-300"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

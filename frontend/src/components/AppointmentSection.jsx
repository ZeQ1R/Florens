import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { services } from '../data/mock';

const AppointmentSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    console.log('Appointment submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        service: '',
        date: '',
        time: '',
      });
    }, 3000);
  };

  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
  ];

  return (
    <section id="appointments" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-teal-600 font-semibold text-sm tracking-wider uppercase mb-4">
              Book an Appointment
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Schedule Your Visit Today
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Take the first step towards better health. Book an appointment with
              one of our specialists and experience compassionate, personalized care.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Easy Online Booking</h3>
                  <p className="text-slate-600 text-sm">Book your appointment in just a few clicks, 24/7.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Flexible Scheduling</h3>
                  <p className="text-slate-600 text-sm">Morning, afternoon, and weekend slots available.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Instant Confirmation</h3>
                  <p className="text-slate-600 text-sm">Receive email confirmation with all appointment details.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-3xl blur-xl" />
            <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    Appointment Requested!
                  </h3>
                  <p className="text-slate-600">
                    We'll contact you shortly to confirm your appointment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="fullName" className="text-slate-700 font-medium">
                      Full Name
                    </Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="pl-10 h-12 rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-slate-700 font-medium">
                        Phone Number
                      </Label>
                      <div className="relative mt-2">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(555) 123-4567"
                          className="pl-10 h-12 rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-slate-700 font-medium">
                        Email
                      </Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="pl-10 h-12 rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-slate-700 font-medium">Select Service</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => handleSelectChange('service', value)}
                    >
                      <SelectTrigger className="mt-2 h-12 rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500">
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.name}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-slate-700 font-medium">
                        Preferred Date
                      </Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="mt-2 h-12 rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-slate-700 font-medium">Preferred Time</Label>
                      <Select
                        value={formData.time}
                        onValueChange={(value) => handleSelectChange('time', value)}
                      >
                        <SelectTrigger className="mt-2 h-12 rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-xl shadow-lg shadow-teal-600/25 transition-all hover:shadow-xl hover:shadow-teal-600/30"
                  >
                    Request Appointment
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;

import React from 'react';
import { Eye, Brain, Zap, MonitorSpeaker, Contact, ArrowRight } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const services = [
    {
        title: 'Retina Eye Care',
        icon: <Eye className="h-6 w-6" />,
        desc: "Mumbai's prime destination for cutting-edge Retina Surgery. Our expert ophthalmologists serve Grant Road, Mira Road, Kemps Corner, Bhiwandi and all of Maharashtra with advanced retina care and surgical excellence.",
    },
    {
        title: 'Neuro Ophthalmology',
        icon: <Brain className="h-6 w-6" />,
        desc: 'Excellence in Neuro Ophthalmology — combining neurology with ophthalmology to diagnose and treat visual symptoms caused by neurological disorders, with comprehensive care tailored to each patient.',
    },
    {
        title: 'Blade Free LASIK',
        icon: <Zap className="h-6 w-6" />,
        desc: 'State-of-the-art Advanced Customized Blade Free LASIK (iLASIK) for life-changing vision correction — precise, painless, and personalised using the latest laser technology.',
    },
    {
        title: 'Low Vision Aids',
        icon: <MonitorSpeaker className="h-6 w-6" />,
        desc: 'Empowering individuals with low vision across Mumbai, Mira Road, Grant Road, Bhiwandi and Maharashtra to regain independence and quality of life with specialised low-vision aids.',
    },
    {
        title: 'Contact Lenses',
        icon: <Contact className="h-6 w-6" />,
        desc: 'Expert custom fitting for all types of contact lenses at our Mumbai, Grant Road, Mira Road, Kemps Corner and Bhiwandi centres — ensuring perfect vision, comfort and a fit tailored to your lifestyle.',
    },
];

export default function ServicesGrid() {
    const { openPopup } = useModal();
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
                    <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                        From cutting-edge surgical procedures to specialised eye care, Aarav Eye Care delivers world-class treatment across all branches in Mumbai and Maharashtra.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {services.map((service, index) => (
                        <div key={index} onClick={openPopup} className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:bg-teal-600 hover:border-teal-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1rem)]">
                            <div className="bg-teal-50 group-hover:bg-teal-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300">
                                <span className="text-teal-500 group-hover:text-white transition-colors duration-300">{service.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-300">{service.title}</h3>
                            <p className="text-gray-500 group-hover:text-teal-100 text-sm leading-relaxed transition-colors duration-300">{service.desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <button
                        onClick={openPopup}
                        className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3.5 rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    >
                        Book Appointment
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}

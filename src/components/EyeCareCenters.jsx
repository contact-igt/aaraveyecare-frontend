import React from 'react';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const locations = [
    {
        name: 'Grant Road',
        addr: 'Yash Apartments, 1st Floor, Opp. Cumballa Hill Hospital, A.K. Marg, Kemps Corner, Grant Road (W), Mumbai 400036',
        nearest: 'Grant Road',
        phone: '+91 90822 17175',
    },
    {
        name: 'Mira Road',
        addr: 'Shop No. 5, Bhairav Residency, Kanakia Road, Near Cinemax Theatre, Mira Road (E), Mumbai 401107',
        nearest: 'Mira Road',
        phone: '+91 90822 17175',
    },
    {
        name: 'Bhiwandi',
        addr: '1st floor, No 278, Old Mumbai-Agra Rd, opp. Sympathy hospital, Dhamankar Naka, Kaneri, Bhiwandi – 421302',
        nearest: 'Kalyan',
        phone: '+91 90822 17175',
    },
    {
        name: 'Andheri',
        addr: 'Jyoti Tower, 103, opp. Versova Police station, off New Link Road, Wing B, New LIC Colony, D.N.Nagar, Andheri West, Mumbai 400053',
        nearest: null,
        phone: '+91 90822 17175',
    },
    {
        name: 'Lal Baug',
        addr: 'Shop No.1, Shivaram chawl, D.L. Marg, Kalachowki, Lal Baug Naka, Mumbai 400033',
        nearest: null,
        phone: '+91 90822 17175',
    },
];

export default function EyeCareCenters() {
    const { openPopup } = useModal();
    return (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Our <span className="text-teal-600">Eye Care Centers</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-teal-500 mx-auto mt-6 rounded-full"></div>
                    <p className="mt-8 text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
                        Visit us at any of our 5 conveniently located, state-of-the-art facilities for world-class eye care services.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {locations.map((loc, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl p-6 border border-teal-100 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)] flex flex-col"
                        >
                            <div className="absolute top-0 right-0 bg-teal-50 text-teal-600 w-16 h-16 rounded-bl-full flex items-start justify-end p-3 transition-colors group-hover:bg-teal-500 group-hover:text-white">
                                <MapPin className="h-6 w-6" />
                            </div>

                            <div className="flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 mt-2">{loc.name}</h3>
                                <p className="text-gray-500 text-sm mb-3 pr-8 leading-relaxed">{loc.addr}</p>
                                {loc.nearest && (
                                    <span className="inline-flex items-center gap-1 text-xs bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-1 rounded-full font-medium mb-2">
                                        🚉 Nearest Station: {loc.nearest}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-100">
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={openPopup}
                                        className="flex items-center justify-center gap-1.5 bg-teal-50 text-teal-700 hover:bg-teal-100 py-2.5 rounded-xl text-sm font-semibold transition-colors text-center"
                                    >
                                        Contact Us
                                    </button>
                                    <a
                                        href={`tel:${loc.phone.replace(/\s+/g, '')}`}
                                        className="flex items-center justify-center gap-1.5 bg-teal-500 text-white hover:bg-teal-600 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                                    >
                                        <Phone className="h-4 w-4" /> Call Now
                                    </a>
                                </div>
                                <a
                                    href={`https://www.google.com/maps/dir//Aarav+Eye+Care+${encodeURIComponent(loc.name + " " + loc.addr)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 border border-teal-200 text-teal-700 hover:bg-teal-50 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                                >
                                    <MapPin className="h-4 w-4 text-teal-500" /> Get Location
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Row */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                    <button
                        onClick={openPopup}
                        className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3.5 rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    >
                        Book an Appointment
                        <ArrowRight className="h-4 w-4" />
                    </button>
                    <a
                        href="tel:+919082217175"
                        className="inline-flex items-center gap-2 border-2 border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <Phone className="h-5 w-5 mr-1" />
                        Call Us Now
                    </a>
                </div>
            </div>
        </section>
    );
}

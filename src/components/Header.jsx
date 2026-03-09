import React, { useState } from 'react';
import { Phone, Menu, X, Calendar } from 'lucide-react';
import { useModal } from '../context/ModalContext';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { openPopup } = useModal();

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">

                    {/* Logo */}
                    <div className="flex items-center">
                        <img src="/assets/logo.png" alt="Aarav Eye Care" className="w-34 h-34 object-contain" />
                    </div>

                    {/* Right side — call + appointment */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Call Us */}
                        <a
                            href="tel:+919082217175"
                            className="flex items-center gap-2 border-2 border-teal-500 text-teal-700 hover:bg-teal-50 px-5 py-2.5 rounded-full font-medium transition-all duration-200"
                        >
                            <Phone className="h-4 w-4" />
                            Call Us &nbsp;<span className="font-bold text-teal-600">+91 90822 17175</span>
                        </a>

                        {/* Book Appointment */}
                        <button
                            onClick={openPopup}
                            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-7 py-2.5 rounded-full font-medium transition-all duration-200 shadow-md"
                        >
                            <Calendar className="h-4 w-4" />
                            Book Appointment
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-3">
                        <a href="tel:+919082217175" className="text-teal-600">
                            <Phone className="h-6 w-6" />
                        </a>
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
                            {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t p-4 space-y-3 shadow-lg absolute w-full">
                    <a
                        href="tel:+919082217175"
                        className="flex items-center gap-2 text-teal-700 font-semibold py-2"
                    >
                        <Phone className="h-5 w-5" /> +91 90822 17175
                    </a>
                    <button
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            openPopup();
                        }}
                        className="flex items-center justify-center gap-2 w-full bg-teal-500 text-white px-6 py-3 rounded-full font-medium"
                    >
                        <Calendar className="h-4 w-4" /> Book Appointment
                    </button>
                </div>
            )}
        </header>
    );
}

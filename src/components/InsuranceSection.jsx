import React from 'react';
import { useModal } from '../context/ModalContext';

export default function InsuranceSection() {
    const { openPopup } = useModal();

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Centered Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Cashless <span className="text-teal-600">Eye Treatment</span> & Insurance
                    </h2>
                    <div className="w-24 h-1.5 bg-teal-500 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Grid Container */}
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white p-4 md:p-8 rounded-[3rem] border border-gray-50 flex items-center justify-center">
                        <img
                            src="/assets/insurance.png"
                            alt="Cashless Eye Treatment Insurance Partners"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-16 text-center">
                    <button
                        onClick={() => openPopup('cashless')}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4.5 px-14 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 text-lg shadow-lg shadow-teal-500/10"
                    >
                        Check Cashless Eligibility
                    </button>
                </div>
            </div>
        </section>
    );
}

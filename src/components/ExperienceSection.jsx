import React from 'react';
import { useModal } from '../context/ModalContext';

export default function ExperienceSection() {
    const { openPopup } = useModal();
    return (
        <section className="relative pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center -mt-16 relative z-30 mb-16">
                    <div className="bg-teal-500 text-white rounded-[2.5rem] p-10 text-center shadow-lg w-72">
                        <h2 className="text-6xl font-bold mb-2">25</h2>
                        <p className="text-xl font-medium leading-tight">Years of<br />Experience in<br />This Field</p>
                    </div>
                </div>

                <div className="text-center max-w-4xl mx-auto space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Benefits with Aarav Eye Care</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        We prioritize your eye health with services including comprehensive eye exams, Cataract, LASIK, Diabetic eye care,
                        macular degeneration treatments, retinal detachment interventions, glaucoma services, custom contact lenses,
                        stylish spectacle dispensing, and low vision clinic options.
                    </p>
                    <div className="pt-4">
                        <button
                            onClick={openPopup}
                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-12 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            Book Your Consult
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

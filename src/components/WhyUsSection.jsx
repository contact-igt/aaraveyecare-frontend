import React from 'react';

export default function WhyUsSection() {
    return (
        <section className="py-20 bg-[#eafafa]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-teal-900">Why Aarav Eye Care?</h2>
                    <div className="w-24 h-1 bg-teal-500 mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">

                    {/* Card 1 — Hospitals */}
                    <div
                        className="rounded-[2rem] overflow-hidden shadow-2xl relative flex flex-col"
                        style={{
                            background: 'linear-gradient(160deg, #0d9488 0%, #0f766e 50%, #115e59 100%)',
                            minHeight: '550px',
                        }}
                    >
                        <div className="px-10 pt-12 pb-8 relative z-10">
                            <h3 className="text-7xl font-extrabold text-white tracking-tight mb-3">25+</h3>
                            <p className="text-lg text-teal-100 leading-snug pb-5 border-b border-teal-400/50">
                                Years of Excellence &amp; Trust in Eye Care
                            </p>
                            <div className="mt-5 inline-block">
                                <span className="border border-white/40 text-white bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-medium">
                                    5+ Specialised Centers
                                </span>
                            </div>
                        </div>

                        {/* Hospital image — anchored to bottom */}
                        <img
                            src="/assets/whyus.webp"
                            alt="Hospital Building"
                            className="absolute bottom-0 -left-10 md:-left-20 w-full h-80 object-contain object-bottom pointer-events-none"
                            style={{
                                maskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to top, black 100%, transparent 100%)',
                            }}
                        />
                    </div>

                    {/* Card 2 — Doctors */}
                    <div
                        className="rounded-[2rem] overflow-hidden shadow-2xl relative flex flex-col"
                        style={{
                            background: 'linear-gradient(160deg, #0d9488 0%, #0f766e 50%, #115e59 100%)',
                            minHeight: '550px',
                        }}
                    >
                        <div className="px-10 pt-12 pb-8 relative z-10">
                            <h3 className="text-7xl font-extrabold text-white tracking-tight mb-3">90+</h3>
                            <p className="text-lg text-teal-100 leading-snug pb-5 border-b border-teal-400/50">
                                Highly Experienced Doctors &amp; Surgeons
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2">
                                <div className="border border-white/40 text-white bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-medium">
                                    20,000+ Successful Surgeries
                                </div>
                                <div className="border border-white/40 text-white bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-medium">
                                    2.5L+ Happy Patients
                                </div>
                            </div>
                        </div>

                        {/* Doctors image — anchored to bottom */}
                        <img
                            src="/assets/whychooseus.webp"
                            alt="Team of Doctors"
                            className="absolute bottom-0 left-0 w-full h-48 md:h-50 lg:h-65 xl:h-80 object-cover scale-[1.1] lg:scale-[1] object-top pointer-events-none"
                            style={{
                                maskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to top, black 100%, transparent 100%)',
                            }}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}

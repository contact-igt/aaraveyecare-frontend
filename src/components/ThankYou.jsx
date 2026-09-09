import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Home, Phone, ArrowRight, Youtube, ShieldCheck, Users, CalendarCheck2 } from 'lucide-react';

export default function ThankYou() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f8fdfe] flex flex-col items-center justify-start px-4 py-10 md:py-16 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50 rounded-full -mr-64 -mt-64 blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-100 rounded-full -ml-32 -mb-32 blur-3xl opacity-30"></div>

            <div className="max-w-5xl w-full relative z-10">
                {/* Main Success Card */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-teal-900/5 border border-teal-50 overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-teal-600 to-teal-800 p-8 md:p-12 text-center text-white">
                        <div className="mb-6 flex justify-center">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center animate-bounce-subtle">
                                <CheckCircle2 className="w-12 h-12 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                            Request Successfully Submitted!
                        </h1>
                        <p className="text-teal-50 text-lg md:text-xl font-medium opacity-90 max-w-2xl mx-auto">
                            Thank you for choosing Aarav Eye Care. We are committed to providing you with the best optical health services.
                        </p>
                    </div>

                    <div className="p-8 md:p-12 lg:p-16">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left: Next Steps & Trust */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                        <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                                        What Happens Next?
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex gap-4 items-start bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                            <div className="mt-1 bg-white p-2 rounded-full text-teal-600 shadow-sm">
                                                <CalendarCheck2 className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">Immediate Verification</p>
                                                <p className="text-gray-600 text-sm">Our appointment coordinator is reviewing your request right now.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-start bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                            <div className="mt-1 bg-white p-2 rounded-full text-teal-600 shadow-sm">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">Expect a Callback</p>
                                                <p className="text-gray-600 text-sm">You will receive a call within 24 working hours to finalize your slot.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Trust Badges */}
                                <div className="pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                                    <div className="flex flex-col items-center p-4 bg-teal-50/50 rounded-2xl text-center">
                                        <div className="bg-white p-3 rounded-full text-teal-600 mb-3 shadow-sm">
                                            <Users className="w-6 h-6" />
                                        </div>
                                        <p className="font-bold text-teal-900 text-lg">2,50,000+</p>
                                        <p className="text-[10px] text-teal-700 font-bold uppercase tracking-wider">Happy Patients Yearly</p>
                                    </div>
                                    <div className="flex flex-col items-center p-4 bg-teal-50/50 rounded-2xl text-center">
                                        <div className="bg-white p-3 rounded-full text-teal-600 mb-3 shadow-sm">
                                            <ShieldCheck className="w-6 h-6" />
                                        </div>
                                        <p className="font-bold text-teal-900 text-lg">Power of Trust</p>
                                        <p className="text-[10px] text-teal-700 font-bold uppercase tracking-wider">Brand Trust Award 2023</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Video & Urgent CTA */}
                            <div className="space-y-8">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gray-900 ring-1 ring-white/20">
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/DKPi8pymP5A?si=Ky7k_WlwQGBluMW1`}
                                            title="Patient Stories"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-teal-700 font-bold text-sm uppercase tracking-widest">
                                    <Youtube className="w-5 h-5 text-red-600" />
                                    <span>Hear from our happy patients</span>
                                </div>

                                {/* Urgent Call Card */}
                                <div className="bg-teal-900 rounded-3xl p-8 text-white shadow-xl shadow-teal-900/20 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                                    <h4 className="text-xl font-bold mb-2">Need Immediate Assistance?</h4>
                                    <p className="text-teal-100 text-sm mb-6 opacity-80">Call our direct helpline for emergency cases or immediate help.</p>
                                    <a
                                        href="tel:+919429692595"
                                        className="inline-flex items-center justify-center gap-3 bg-white text-teal-900 font-extrabold py-4 px-8 rounded-2xl w-full hover:bg-teal-50 transition-colors shadow-lg active:scale-95"
                                    >
                                        <Phone className="w-5 h-5" />
                                        +91 94296 92595
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final Footer Actions */}
                <div className="flex flex-col items-center justify-center pb-4">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-gray-500 font-bold hover:text-teal-600 transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Go Back to Homepage
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 3s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
}

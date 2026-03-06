import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Users, ShieldCheck, HeadphonesIcon, Loader2, ChevronDown } from 'lucide-react';

export default function HeroSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const handleGoogleSheetForm = async (formData) => {
        try {
            const res = await fetch(
                "https://script.google.com/macros/s/AKfycbzJ7il5zL8lp7XhIcmvSpVYGpVfqiH_J7R3IbGpdQdkmVeAGWwm7LigaasHmVDVGILr/exec",
                {
                    method: "POST",
                    body: formData,
                }
            );
            return true;
        } catch (err) {
            console.error("Sheet Error:", err);
            return false;
        }
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            let ip = "";
            try {
                const ipResponse = await fetch("https://api.ipify.org?format=json");
                const ipData = await ipResponse.json();
                ip = ipData.ip;
            } catch (error) {
                console.warn("IP Fetch failed", error);
            }

            const formData = {
                name: data.name,
                phone: data.phone,
                service: data.service,
                ip_address: ip,
                utm_source: localStorage.getItem("utm_source") || "Direct",
                message: "",
            };

            const params = new URLSearchParams();
            Object.keys(formData).forEach((key) => {
                const value = formData[key];
                params.append(key, value !== undefined && value !== null ? String(value) : "");
            });

            const success = await handleGoogleSheetForm(params);

            if (success) {
                reset();
                window.location.href = "/thank-you";
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.error("Submission error:", err);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="hero" className="bg-[#eafafa] relative pt-12 pb-0 lg:pt-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-end">

                    {/* ── LEFT: Text content + Power of Trust ── */}
                    <div className="flex flex-col gap-6 pb-10">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            Prioritize Your Eyesight With{' '}
                            <span className="text-teal-600">World-Class Eyecare</span>
                        </h1>

                        {/* Happy patients badge */}
                        <div className="flex items-center gap-4 bg-white w-max pr-6 p-2 rounded-full border border-teal-100">
                            <div className="bg-teal-100 p-3 rounded-full">
                                <Users className="h-6 w-6 text-teal-600" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">2,50,000+</p>
                                <p className="text-sm text-gray-600">Happy patients every year</p>
                            </div>
                        </div>



                        {/* Power of Trust card — bottom of left column */}
                        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 max-w-sm">
                            <ShieldCheck className="h-12 w-12 text-teal-500 flex-shrink-0" />
                            <div>
                                <p className="font-bold text-gray-900">Power of Trust</p>
                                <p className="text-sm text-gray-600">India's Most Trusted Eye Hospitals</p>
                                <p className="text-xs text-teal-600 font-medium mt-0.5">TRA's Brand Trust Report 2023</p>
                            </div>
                        </div>
                    </div>

                    {/* ── CENTER: Doctor image — tall, sits between columns ── */}
                    <div className="flex items-end justify-center self-end">
                        <img
                            src="/assets/aaraveyecare.webp"
                            alt="Aarav Eye Care Doctor"
                            className="h-[420px] w-auto object-contain object-bottom drop-shadow-xl"
                        />
                    </div>

                    {/* ── RIGHT: Consultation form ── */}
                    <div className="flex justify-center lg:justify-end pb-10">
                        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm border border-gray-100 min-h-[460px] flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-teal-900 mb-6 text-center">
                                Your Consultation Is One Click Away
                            </h3>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        {...register("name", { required: "Name is required" })}
                                        className={`w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm ${errors.name ? 'ring-2 ring-red-500 border-transparent' : ''}`}
                                    />
                                    {errors.name && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.name.message}</p>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="10 digit phone number"
                                            {...register("phone", {
                                                required: "Phone is required",
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: "Invalid 10-digit number"
                                                }
                                            })}
                                            className={`w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm ${errors.phone ? 'ring-2 ring-red-500 border-transparent' : ''}`}
                                        />
                                        <span className="absolute right-3 top-3.5 text-lg">🇮🇳</span>
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.phone.message}</p>}
                                </div>

                                {/* Service Select */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">
                                        Select Service <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            {...register("service", { required: "Please select a service" })}
                                            className={`w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm text-gray-600 appearance-none bg-white ${errors.service ? 'ring-2 ring-red-500 border-transparent' : ''}`}
                                        >
                                            <option value="">Choose a service...</option>
                                            <option value="general">General Ophthalmology</option>
                                            <option value="pediatric">Pediatric Ophthalmology</option>
                                            <option value="retina">Retina Eye Care</option>
                                            <option value="glaucoma">Glaucoma Services</option>
                                            <option value="neuro">Neuro Ophthalmology</option>
                                            <option value="lasik">Lasik - Specs Removal</option>
                                            <option value="smile">SMILE - Specs Removal</option>
                                            <option value="icl">ICL - Specs Removal</option>
                                            <option value="cataract">Cataract Surgery</option>
                                            <option value="oculoplasty">Oculoplasty Treatment</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                    {errors.service && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.service.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-teal-300 cursor-pointer text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition duration-300 mt-2 shadow-md hover:shadow-lg active:scale-95"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <HeadphonesIcon className="h-5 w-5" />
                                            Request Callback
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

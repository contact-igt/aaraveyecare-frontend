import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Loader2, ChevronDown } from 'lucide-react';

export default function AppointmentForm() {
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
                message: data.message || "",
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
        <section id="appointment" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#f0f8f8] rounded-[2.5rem] overflow-hidden shadow-sm border border-teal-50">
                    <div className="grid lg:grid-cols-2">

                        {/* Form Side */}
                        <div className="p-10 lg:p-16 relative">
                            <span className="text-teal-600 font-semibold tracking-wider text-sm uppercase mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 bg-teal-500 rounded-full"></span> Book Now
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                Book Your Eye Consultation<br />with Our Specialists
                            </h2>
                            <p className="text-gray-600 mb-10 text-sm leading-relaxed max-w-md">
                                Whether it's a routine checkup, cataract surgery, LASIK, or any other eye concern — our experienced ophthalmologists at Aarav Eye Care are here to guide you with personalised, compassionate care at every step.
                            </p>

                            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                <div className="space-y-1">
                                    <label className="block text-xs font-semibold text-gray-500">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        {...register("name", { required: "Name is required" })}
                                        className={`w-full bg-white border-0 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                                    />
                                    {errors.name && <p className="text-red-500 text-[10px] font-medium">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-xs font-semibold text-gray-500">Phone</label>
                                    <input
                                        type="text"
                                        placeholder="10-digit Phone Number"
                                        {...register("phone", {
                                            required: "Phone number is required",
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Please enter a valid 10-digit number"
                                            }
                                        })}
                                        className={`w-full bg-white border-0 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm ${errors.phone ? 'ring-2 ring-red-500' : ''}`}
                                    />
                                    {errors.phone && <p className="text-red-500 text-[10px] font-medium">{errors.phone.message}</p>}
                                </div>
                                <div className="md:col-span-2 space-y-1">
                                    <label className="block text-xs font-semibold text-gray-500">Select Service</label>
                                    <div className="relative">
                                        <select
                                            {...register("service", { required: "Please select a service" })}
                                            className={`w-full bg-white border-0 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm text-gray-500 appearance-none ${errors.service ? 'ring-2 ring-red-500' : ''}`}
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
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                                    </div>
                                    {errors.service && <p className="text-red-500 text-[10px] font-medium">{errors.service.message}</p>}
                                </div>
                                <div className="md:col-span-2 mt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#007b6e] hover:bg-teal-800 disabled:bg-teal-300 text-white font-medium py-3 px-10 rounded-lg transition duration-300 shadow-md"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : 'Book Appointment'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Image Side */}
                        <div className="hidden lg:block relative bg-teal-100">
                            <img
                                src="/assets/contact.webp"
                                alt="Eye Care Specialists"
                                className="absolute inset-0 w-full h-full object-cover object-center"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

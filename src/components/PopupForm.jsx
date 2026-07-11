import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, ChevronDown, X } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { fetchVisitorIp, submitAaravLead } from '../utils/submitAaravLead';

export default function PopupForm() {
    const { isPopupOpen, closePopup, popupType } = useModal();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const ip = await fetchVisitorIp();
            const popupSource = popupType === 'cashless' ? 'Cashless Eligibility Form' : 'Quick Booking Popup';

            await submitAaravLead({
                name: data.name,
                phone: data.phone,
                mobile_number: data.phone,
                service: data.service,
                ip_address: ip,
                utm_source: localStorage.getItem('utm_source') || 'Direct',
                source: popupSource,
                message: '',
            });

            reset();
            closePopup();
            window.location.href = '/thank-you';
        } catch (err) {
            console.error('Submission error:', err);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isPopupOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={closePopup}
            ></div>

            <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
                <button
                    onClick={closePopup}
                    className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                >
                    <X className="h-6 w-6 text-gray-400" />
                </button>

                <div className="p-8 md:p-10">
                    <span className="text-teal-600 font-semibold tracking-wider text-sm uppercase mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-teal-500 rounded-full"></span> {popupType === 'cashless' ? 'Eligibility Check' : 'Quick Booking'}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                        {popupType === 'cashless' ? 'Check Cashless Eligibility' : 'Schedule Your Visit'}
                    </h2>
                    <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                        {popupType === 'cashless'
                            ? 'Fill in the details below and we will help you check your insurance coverage.'
                            : 'Fill in the details below and our team will get back to you shortly.'}
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-1">
                            <label className="block text-xs font-semibold text-gray-500">Full Name</label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                {...register('name', { required: 'Name is required' })}
                                className={`w-full bg-gray-50 border-0 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                            />
                            {errors.name && <p className="text-red-500 text-[10px] font-medium">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="block text-xs font-semibold text-gray-500">Phone Number</label>
                            <input
                                type="tel"
                                placeholder="10-digit Phone Number"
                                {...register('phone', {
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: 'Please enter a valid 10-digit number'
                                    }
                                })}
                                className={`w-full bg-gray-50 border-0 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${errors.phone ? 'ring-2 ring-red-500' : ''}`}
                            />
                            {errors.phone && <p className="text-red-500 text-[10px] font-medium">{errors.phone.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="block text-xs font-semibold text-gray-500">{popupType === 'cashless' ? 'Select Treatment' : 'Select Service'}</label>
                            <div className="relative">
                                <select
                                    {...register('service', { required: 'Please select a service' })}
                                    className={`w-full bg-gray-50 border-0 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-500 appearance-none transition-all ${errors.service ? 'ring-2 ring-red-500' : ''}`}
                                >
                                    <option value="">{popupType === 'cashless' ? 'Choose a treatment...' : 'Choose a service...'}</option>
                                    <option value="General Ophthalmology">General Ophthalmology</option>
                                    <option value="Pediatric Ophthalmology">Pediatric Ophthalmology</option>
                                    <option value="Retina Eye Care">Retina Eye Care</option>
                                    <option value="Glaucoma Services">Glaucoma Services</option>
                                    <option value="Neuro Ophthalmology">Neuro Ophthalmology</option>
                                    <option value="Lasik - Specs Removal">Lasik - Specs Removal</option>
                                    <option value="SMILE - Specs Removal">SMILE - Specs Removal</option>
                                    <option value="ICL - Specs Removal">ICL - Specs Removal</option>
                                    <option value="Cataract Surgery">Cataract Surgery</option>
                                    <option value="Oculoplasty Treatment">Oculoplasty Treatment</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                            {errors.service && <p className="text-red-500 text-[10px] font-medium">{errors.service.message}</p>}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300 text-white font-bold py-4 px-10 rounded-xl transition duration-300 shadow-xl shadow-teal-500/10 cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (popupType === 'cashless' ? 'Check Eligibility' : 'Book Your Appointment')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

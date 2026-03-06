import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    { id: 0, q: "What is Lasik Surgery?", a: "LASIK (Laser-Assisted In Situ Keratomileusis) is a common refractive eye surgery that corrects vision problems like nearsightedness, farsightedness, and astigmatism. During the procedure, a laser reshapes the cornea, improving vision without the need for glasses or contact lenses." },
    { id: 1, q: "What's the recovery time after LASIK?", a: "Most LASIK patients experience improved vision within a day or two. Full recovery typically takes a few weeks, during which you should avoid strenuous activities, swimming, and eye-rubbing. Follow post-operative instructions to minimize discomfort and achieve the best results." },
    { id: 2, q: "Is Pink Eye Contagious?", a: "Yes, Viral Conjunctivitis is very common and is extremely contagious. Avoid touching eyes with your hands, wash hands frequently, do not share towels, and avoid work, school or day care activities for at least five days or as long as discharge is present." },
    { id: 3, q: "Will reading in dim light hurt my eyes?", a: "No, but most people are more comfortable reading with proper lighting which is bright enough to provide good illumination but not so bright as to cause glare." },
    { id: 4, q: "Why have I gradually found it harder to read without glasses?", a: "The ability to focus on near objects decreases steadily with age and is referred to as presbyopia. Presbyopia is a natural aging of the lens. It is usually near the age of 40, when glasses or bifocals are prescribed to correct this condition." },
    { id: 5, q: "What is Presbyopia?", a: "The word Presbyopia means 'old eye' in Greek. This is a condition when your eyes gradually lose the ability to see nearby things. This is a normal part of ageing. You may start developing presbyopia shortly after crossing the age 40." },
    { id: 6, q: "How to treat dry eyes?", a: "The doctor may give you artificial tears and ointments to keep your eyes lubricated. The doctor may even opt for a procedure called temporary punctal occlusion to treat your condition." },
    { id: 7, q: "I have noticed small spots floating in front of my eyes. Is this a cause for concern?", a: "Eye floaters are tiny specks and spots that keep floating in your field of vision. These are annoying at times but usually are harmless. These occur when tiny pieces of the gel-like vitreous of your eyes break loose. However, if you notice flashing spots, then you should immediately consult an eye doctor." },
];

export default function FaqSection() {
    const [activeFaq, setActiveFaq] = useState(1);

    return (
        <section className="py-24 bg-[#eafafa]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-4 lg:sticky lg:top-32">
                        <h2 className="text-4xl md:text-5xl font-bold text-teal-900 leading-tight">
                            Frequently<br />Asked Questions
                        </h2>
                        <div className="w-32 h-1.5 bg-teal-500 mt-6 rounded-full opacity-60"></div>
                    </div>

                    <div className="lg:col-span-8 space-y-4">
                        {faqs.map((faq) => (
                            <div
                                key={faq.id}
                                className={`bg-white rounded-2xl transition-all duration-300 overflow-hidden ${activeFaq === faq.id ? 'shadow-md border border-teal-100' : 'shadow-sm'}`}
                            >
                                <button
                                    onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                >
                                    <span className="font-bold text-lg text-gray-900 pr-4">{faq.q}</span>
                                    <span className="text-gray-400 flex-shrink-0">
                                        {activeFaq === faq.id ? <Minus className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
                                    </span>
                                </button>
                                {activeFaq === faq.id && (
                                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

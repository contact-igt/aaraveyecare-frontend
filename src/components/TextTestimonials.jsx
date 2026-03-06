import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

// All reviews – first one is the featured teal card
const allReviews = [
    {
        featured: true,
        text: "Dr. Krishna was Supa nice while handling my 73 year old mum. She was very patient and understanding. Also Dr. Roma was exceptionally well in explaining all the details of my mum's glaucoma and the further action to be taken. Highly recommend Aarav Eye Care.",
        name: "Ryan Pereira",
        treatment: "Glaucoma Surgery",
        avatarBg: "bg-teal-500",
        initial: "R",
        stars: 5,
    },
    {
        text: "I recently visited Aarav Eye Care for my mother's cataract surgery, and I must say the entire experience was excellent. The process was smooth and well-managed. Special thanks to Dr. Ashwin, Dr. Roma, and Dr. Aishwarya for their expertise and kind, friendly approach. I would also like to appreciate Trupti Madam for her guidance throughout the Mediclaim process. Highly recommended for anyone looking for quality eye care.",
        name: "Sayli Dhulap",
        treatment: "Cataract Surgery",
        avatarBg: "bg-[#e53935]",
        initial: "S",
        stars: 5,
    },
    {
        text: "I visited Aarav Eye Care today and I must say Dr. Ashwin Bafna has guided me so well and treated my problem. The way of his explanation is very good. I had an amazing experience at Aarav Eye Care and will recommend all my friends and relatives. They already have 5 branches in Mumbai. Great experience with Aarav. Thanks Dr. Ashwin Bafna.",
        name: "Pushpa Rawat",
        treatment: "Eye Consultation",
        avatarBg: "bg-[#8e24aa]",
        initial: "P",
        stars: 5,
    },
    {
        text: "I had blurring of vision since many days in both eyes so I came to Aarav Eye Care for checkup and Dr. Ashwin checked my eyes and told me that I had developed cataract in both eyes. He explained me the process of surgery and about the best lens for my eyes. I underwent surgery in left eye on 29th Feb 2024. I have regained my vision immediately on the same day. Im very happy and satisfied with Dr. Ashwin and the entire staff of Aarav Eye Care. A big thanks to everyone.",
        name: "Ram Shinde",
        treatment: "Cataract Surgery",
        avatarBg: "bg-[#43a047]",
        initial: "R",
        stars: 5,
    },
    {
        text: "I visited Aarav Eye Care located in Mira Road and went through Squint Surgery. It's unbelievable that my daughter's eye is now looking as normal as other people's. Highly recommend Aarav Eye Care and the front desk staff management is also so good. Thank you Aarav for my daughter's eye surgery.",
        name: "Niranjankumar Mandal",
        treatment: "Squint Surgery",
        avatarBg: "bg-[#3949ab]",
        initial: "N",
        stars: 5,
    },
];

const total = allReviews.length;
const extended = [...allReviews, ...allReviews, ...allReviews];
const GAP_PX = 24; // 1.5rem gap

export default function TextTestimonials() {
    const [itemsPerView, setItemsPerView] = useState(3);
    const [trackIndex, setTrackIndex] = useState(total); // start in middle copy
    const [animated, setAnimated] = useState(true);
    const [cardWidth, setCardWidth] = useState(0);

    const containerRef = useRef(null);
    const isJumping = useRef(false);

    const dotIndex = ((trackIndex - total) % total + total) % total;

    // Measure container → compute card width in px
    const measureCard = useCallback(() => {
        if (!containerRef.current) return;
        const containerW = containerRef.current.offsetWidth;
        const ipv = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
        setItemsPerView(ipv);
        setCardWidth((containerW - GAP_PX * (ipv - 1)) / ipv);
    }, []);

    useEffect(() => {
        measureCard();
        window.addEventListener('resize', measureCard);
        return () => window.removeEventListener('resize', measureCard);
    }, [measureCard]);

    // Seamless loop jump
    const handleTransitionEnd = useCallback(() => {
        if (isJumping.current) return;
        const normalised = ((trackIndex - total) % total + total) % total + total;
        if (normalised !== trackIndex) {
            isJumping.current = true;
            setAnimated(false);
            setTrackIndex(normalised);
            requestAnimationFrame(() =>
                requestAnimationFrame(() => {
                    setAnimated(true);
                    isJumping.current = false;
                })
            );
        }
    }, [trackIndex]);

    const next = () => setTrackIndex((i) => i + 1);
    const prev = () => setTrackIndex((i) => i - 1);

    const offsetPx = trackIndex * (cardWidth + GAP_PX);

    return (
        <section className="py-20 bg-[#eafafa]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-teal-900">Trusted by 2,50,000+ Patients</h2>
                    <div className="w-32 h-1 bg-teal-500 mx-auto mt-6 rounded-full opacity-70"></div>
                </div>

                {/* Carousel track */}
                <div className="overflow-hidden" ref={containerRef}>
                    <div
                        className="flex"
                        style={{
                            gap: `${GAP_PX}px`,
                            transform: cardWidth > 0 ? `translateX(-${offsetPx}px)` : 'none',
                            transition: animated ? 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                            willChange: 'transform',
                        }}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {extended.map((review, idx) => (
                            <div
                                key={idx}
                                className="group flex-shrink-0 bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:bg-teal-600 hover:border-teal-600 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
                                style={{
                                    width: cardWidth > 0 ? `${cardWidth}px` : `${100 / itemsPerView}%`,
                                    minHeight: '360px'
                                }}
                            >
                                <p className="text-[15px] leading-relaxed mb-4 text-gray-600 group-hover:text-teal-50 transition-colors duration-300">
                                    {review.text}
                                </p>
                                <div className="flex items-center gap-4 mt-6">
                                    <div className={`w-12 h-12 rounded-full ${review.avatarBg} text-white flex items-center justify-center text-xl font-bold flex-shrink-0`}>
                                        {review.initial}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 group-hover:text-white transition-colors duration-300">{review.name}</h4>
                                        {review.treatment && (
                                            <p className="text-teal-600 group-hover:text-teal-200 text-xs mt-0.5 font-medium transition-colors duration-300">
                                                {review.treatment}
                                            </p>
                                        )}
                                        <div className="flex text-[#ffc107] gap-0.5 mt-1">
                                            {[...Array(review.stars)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center justify-between mt-10">
                    {/* Dot Indicators */}
                    <div className="flex gap-2">
                        {allReviews.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setTrackIndex(total + i)}
                                className={`rounded-full transition-all duration-300 ${i === dotIndex ? 'w-6 h-2.5 bg-teal-500' : 'w-2.5 h-2.5 bg-teal-200'}`}
                            />
                        ))}
                    </div>

                    {/* Prev / Next Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={prev}
                            className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center hover:bg-teal-500 hover:text-white transition"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            onClick={next}
                            className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center hover:bg-teal-600 transition"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

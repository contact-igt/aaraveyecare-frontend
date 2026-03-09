import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const testimonials = [
    { name: 'Mrs. Surekha Ajgaonkar', role: 'Patient,Left Eye Vitrectomy with Secondary IOL Implantation', img: '/assets/testimonial1.webp', video: '/videos/video1.mp4' },
    { name: 'Ranisingh Sawant', role: 'Patient, Left Eye Cataract Surgery', img: '/assets/testimonial2.webp', video: '/videos/video2.mp4' },
    { name: 'Shubhangi Parab', role: 'Patient, Left Eye Vitrectomy Surgery Done', img: '/assets/testimonial3.webp', video: '/videos/video3.mp4' },
    { name: 'Nizamuddin Shaikh', role: 'Patient, Cataract Surgery', img: '/assets/testimonial4.webp', video: '/videos/video4.mp4' },
    { name: 'Vinayak Baburav Gole', role: 'Patient, Cataract Surgery', img: '/assets/testimonial5.webp', video: '/videos/video5.mp4' },
];

const total = testimonials.length;
const extended = [...testimonials, ...testimonials, ...testimonials];
const GAP_PX = 20; // 1.25rem at 16px base

export default function VideoTestimonials() {
    const [itemsPerView, setItemsPerView] = useState(3);
    const [trackIndex, setTrackIndex] = useState(total); // start in middle copy
    const [animated, setAnimated] = useState(true);
    const [dragOffset, setDragOffset] = useState(0);
    const [playingIdx, setPlayingIdx] = useState(null);
    const [cardWidth, setCardWidth] = useState(0);

    const containerRef = useRef(null);
    const videoRefs = useRef([]);
    const isJumping = useRef(false);

    const dotIndex = ((trackIndex - total) % total + total) % total;

    // Measure container → compute card width in px
    const measureCard = useCallback(() => {
        if (!containerRef.current) return;
        const containerW = containerRef.current.offsetWidth;
        const ipv = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
        setItemsPerView(ipv);
        setCardWidth((containerW - GAP_PX * (ipv - 1)) / ipv);
    }, []);

    useEffect(() => {
        measureCard();
        window.addEventListener('resize', measureCard);
        return () => window.removeEventListener('resize', measureCard);
    }, [measureCard]);

    // Seamless loop: after animation ends, silently jump back to middle copy
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

    const handlePlay = (realIdx) => {
        videoRefs.current.forEach((vid, i) => {
            if (vid && i !== realIdx) { vid.pause(); vid.currentTime = 0; }
        });
        if (playingIdx === realIdx) {
            if (videoRefs.current[realIdx]) { videoRefs.current[realIdx].pause(); videoRefs.current[realIdx].currentTime = 0; }
            setPlayingIdx(null);
        } else {
            setPlayingIdx(realIdx);
            setTimeout(() => { if (videoRefs.current[realIdx]) videoRefs.current[realIdx].play(); }, 50);
        }
    };

    const handleStop = (e, realIdx) => {
        e.stopPropagation();
        if (videoRefs.current[realIdx]) { videoRefs.current[realIdx].pause(); videoRefs.current[realIdx].currentTime = 0; }
        setPlayingIdx(null);
    };

    const isDragging = useRef(false);
    const startX = useRef(0);
    const currentX = useRef(0);

    const handleDragStart = (e) => {
        if (playingIdx !== null) return; // Don't drag while video is playing
        isDragging.current = true;
        startX.current = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        currentX.current = startX.current;
        setAnimated(false);
    };

    const handleDragMove = (e) => {
        if (!isDragging.current) return;
        currentX.current = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        setDragOffset(startX.current - currentX.current);
    };

    const handleDragEnd = () => {
        if (!isDragging.current) return;
        isDragging.current = false;

        const diff = startX.current - currentX.current;
        const threshold = cardWidth * 0.2; // 20% of card width as threshold

        setAnimated(true);
        setDragOffset(0);

        if (diff > threshold) {
            next();
        } else if (diff < -threshold) {
            prev();
        }
    };

    const offsetPx = trackIndex * (cardWidth + GAP_PX);

    return (
        <section className="py-20 bg-gray-100 select-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-xl">
                            1000+ patients{' '}
                            <span className="text-teal-600">feel the difference</span>
                        </h2>
                        <p className="text-gray-500 mt-3 text-sm">
                            See what our patients have to say about their experience at Aarav Eye Care
                        </p>
                    </div>
                    <div className="flex gap-3 flex-shrink-0">
                        <button
                            onClick={prev}
                            className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center hover:bg-teal-500 hover:text-white transition"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            onClick={next}
                            className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center hover:bg-teal-400 transition"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <div
                    className="overflow-hidden touch-pan-y"
                    ref={containerRef}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                >
                    <div
                        className="flex"
                        style={{
                            gap: `${GAP_PX}px`,
                            transform: cardWidth > 0 ? `translateX(-${offsetPx + dragOffset}px)` : 'none',
                            transition: animated ? 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                            willChange: 'transform',
                        }}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {extended.map((t, idx) => {
                            const realIdx = idx % total;
                            const copy = Math.floor(idx / total);
                            const activeCopy = Math.floor(trackIndex / total);
                            const isPlaying = playingIdx === realIdx && copy === activeCopy;

                            return (
                                <div
                                    key={idx}
                                    onClick={(e) => {
                                        // Only handle play if we didn't just drag
                                        const diff = Math.abs(startX.current - currentX.current);
                                        if (diff < 5) handlePlay(realIdx);
                                    }}
                                    className="flex-shrink-0 relative rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing group bg-black"
                                    style={{ width: cardWidth > 0 ? `${cardWidth}px` : `${100 / itemsPerView}%`, height: '520px' }}
                                >
                                    {/* Video — only the middle copy gets refs for playback */}
                                    <video
                                        ref={(el) => { if (copy === 1) videoRefs.current[realIdx] = el; }}
                                        src={t.video}
                                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                                        onEnded={() => setPlayingIdx(null)}
                                        playsInline
                                    />

                                    {/* Thumbnail */}
                                    <div className={`absolute inset-0 transition-opacity duration-300 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                        <img src={t.img} alt={t.name} className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                                    </div>

                                    {/* Play button */}
                                    {!isPlaying && (
                                        <div className="absolute inset-0 flex items-center justify-center z-10">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/60 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-teal-500/80 group-hover:border-teal-400 transition-all duration-300">
                                                <Play className="h-7 w-7 text-white ml-1" fill="currentColor" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Close button */}
                                    {isPlaying && (
                                        <button
                                            onClick={(e) => handleStop(e, realIdx)}
                                            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}

                                    {/* Name & role */}
                                    {!isPlaying && (
                                        <div className="absolute bottom-5 left-5 right-5 z-10">
                                            <h4 className="font-semibold text-white text-sm leading-tight">{t.name}</h4>
                                            <p className="text-teal-300 text-xs mt-0.5">{t.role}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end mt-8">
                    <div className="flex gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setTrackIndex(total + i)}
                                className={`rounded-full transition-all duration-300 ${i === dotIndex ? 'w-6 h-2.5 bg-teal-500' : 'w-2.5 h-2.5 bg-gray-300'}`}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

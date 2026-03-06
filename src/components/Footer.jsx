import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-[#eafafa] border-t border-teal-100 py-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    {/* Copyright */}
                    <p className="text-gray-500 text-sm text-center sm:text-left">
                        ©{new Date().getFullYear()} – Aarav Eye Care | All rights reserved
                    </p>

                    {/* Legal Links */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                        <a href="#" className="text-gray-500 hover:text-teal-600 transition-colors duration-200">
                            Terms &amp; Conditions
                        </a>
                        <a href="#" className="text-gray-500 hover:text-teal-600 transition-colors duration-200">
                            Terms of Use
                        </a>
                        <a href="#" className="text-gray-500 hover:text-teal-600 transition-colors duration-200">
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

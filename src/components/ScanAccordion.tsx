// components/ScanAccordion.tsx
'use client'
import { Scan } from "@/types/QR.interface";
import { useState } from 'react';

export const ScanAccordion = ({ scans }: { scans: Scan[] }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="rounded-xl overflow-hidden bg-white shadow-xl">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 bg-white hover:bg-gray-100 transition-colors flex justify-between items-center"
            >
                <h2 className="text-2xl font-semibold text-blue-600">Scan History ({scans.length})</h2>
                <svg
                    className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
                <div className="p-6 space-y-3 h-auto max-h-64 overflow-y-auto bg-white shadow-lg ">
                    {scans.map((scan) => (
                        <div key={scan.id} className="group p-4 hover:bg-gray-50 rounded-lg transition-colors border-b last:border-b-0">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-600 select-none">
                                        {new Date(scan.scannedAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
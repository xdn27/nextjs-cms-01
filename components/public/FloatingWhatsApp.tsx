'use client';

import React from 'react';

interface FloatingWhatsAppProps {
  whatsappNumber?: string;
  companyName?: string;
}

export function FloatingWhatsApp({
  whatsappNumber = '6281388997722',
  companyName = 'CyberTech Computer',
}: FloatingWhatsAppProps) {
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '') || '6281388997722';
  const defaultMessage = encodeURIComponent(
    `Halo ${companyName}, saya ingin konsultasi rakit PC / tanya produk / servis.`
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${defaultMessage}`;

  return (
    <aside aria-label="Konsultasi WhatsApp" className="fixed bottom-6 right-6 z-50 flex items-center">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp dengan kami"
        className="group relative flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-xl shadow-[#25D366]/35 transition-all duration-300 hover:scale-105 hover:bg-[#20ba5a] hover:shadow-2xl hover:shadow-[#25D366]/50 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
      >
        {/* Pulse indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500"></span>
        </span>

        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 fill-current shrink-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.101-.476-.15-.677.151-.2.302-.777.979-.953 1.18-.175.201-.351.226-.652.076-.301-.151-1.27-.468-2.42-1.493-.894-.798-1.498-1.783-1.674-2.085-.175-.302-.019-.465.132-.615.136-.135.301-.351.452-.527.151-.176.201-.302.301-.503.101-.201.05-.377-.025-.528-.075-.15-1.077-2.593-1.478-3.553-.391-.933-.787-.807-1.079-.821l-.92-.016c-.316 0-.829.119-1.262.59-.434.472-1.656 1.618-1.656 3.945s1.696 4.575 1.933 4.89c.237.316 3.336 5.093 8.082 7.142 1.129.488 2.01.779 2.697 1 .135.617.924 1.545 1.488 1.416.63-.143 1.954-.798 2.229-1.57.276-.771.276-1.431.192-1.571-.083-.14-.284-.226-.585-.377z" />
          <path d="M12.004 2C6.48 2 2 6.478 2 12c0 1.986.58 3.839 1.583 5.399L2 22l4.757-1.549A9.957 9.957 0 0012.004 22C17.524 22 22 17.522 22 12s-4.476-10-9.996-10zm0 18.2c-1.636 0-3.15-.478-4.428-1.303l-.317-.206-2.825.922.942-2.753-.223-.332A8.17 8.17 0 013.8 12c0-4.524 3.68-8.2 8.204-8.2 4.522 0 8.196 3.676 8.196 8.2 0 4.524-3.674 8.2-8.196 8.2z" />
        </svg>

        {/* Text */}
        <span className="hidden sm:inline font-bold text-sm tracking-wide">
          Konsultasi WhatsApp
        </span>
      </a>
    </aside>
  );
}

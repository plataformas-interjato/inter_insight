'use client';

import Image from 'next/image';

const Header = () => {
  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="InterInsights Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <h1 className="text-2xl font-bold tracking-tight">
            <span style={{ color: '#f24405' }}>Inter</span>
            <span className="text-slate-800">insights</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;


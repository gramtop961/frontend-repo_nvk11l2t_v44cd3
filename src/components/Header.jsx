import { BookOpen, Globe } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-600 text-white">
            <BookOpen size={22} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Arsip Karya Ilmiah</h1>
            <p className="text-sm text-gray-500">Publik, bebas diakses tanpa login</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
          <Globe size={18} />
          <span>Open Access</span>
        </div>
      </div>
    </header>
  );
}

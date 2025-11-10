import { useEffect, useState } from 'react';
import { Download, Search, User } from 'lucide-react';

export default function PaperList() {
  const [papers, setPapers] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${backend}/papers?limit=100`);
        const data = await res.json();
        setPapers(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [backend]);

  const filtered = papers.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.title?.toLowerCase().includes(q) ||
      p.abstract?.toLowerCase().includes(q) ||
      (p.authors || []).join(' ').toLowerCase().includes(q)
    );
  });

  return (
    <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-lg font-semibold">Daftar Karya Ilmiah</h2>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul, penulis, atau kata kunci..."
            className="pl-9 pr-3 py-2 rounded-md border w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="mt-4 divide-y">
        {loading ? (
          <p className="text-sm text-gray-500">Memuat...</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada entri cocok.</p>
        ) : (
          filtered.map((p) => (
            <article key={p._id} className="py-4">
              <h3 className="text-base font-semibold">{p.title}</h3>
              {p.authors?.length > 0 && (
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                  <User size={14} /> {p.authors.join(', ')}
                </p>
              )}
              {p.abstract && (
                <p className="text-sm text-gray-700 mt-2 line-clamp-3">{p.abstract}</p>
              )}
              <div className="mt-3">
                <a
                  href={p.download_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  <Download size={16} /> Unduh
                </a>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

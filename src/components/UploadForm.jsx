import { useState } from 'react';
import { Upload, FileText, Link as LinkIcon, Loader2 } from 'lucide-react';

export default function UploadForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [abstract, setAbstract] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title || !downloadUrl) {
      setError('Judul dan tautan unduhan wajib diisi.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${backend}/papers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          authors: authors.split(',').map((s) => s.trim()).filter(Boolean),
          abstract,
          download_url: downloadUrl,
        }),
      });
      if (!res.ok) throw new Error('Gagal menyimpan');
      const data = await res.json();
      onCreated?.(data);
      setTitle('');
      setAuthors('');
      setAbstract('');
      setDownloadUrl('');
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Upload size={20} className="text-indigo-600" /> Unggah / Tambah Entri
      </h2>
      <p className="text-sm text-gray-500 mt-1">Masukkan detail karya ilmiah. Tautan unduhan bisa berupa Google Drive, arXiv, atau PDF langsung.</p>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
        <div>
          <label className="block text-sm font-medium">Judul</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Contoh: Analisis Jaringan Kompleks pada Sistem Sosial"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Penulis (pisahkan dengan koma)</label>
          <input
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nama Penulis 1, Nama Penulis 2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium flex items-center gap-2"><FileText size={16}/> Abstrak</label>
          <textarea
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Ringkasan singkat (3-8 kalimat)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium flex items-center gap-2"><LinkIcon size={16}/> Tautan Unduhan</label>
          <input
            value={downloadUrl}
            onChange={(e) => setDownloadUrl(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://... (PDF / Drive / arXiv)"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? (<><Loader2 className="animate-spin" size={16}/> Menyimpan...</>) : (<><Upload size={16}/> Simpan</>)}
          </button>
          <span className="text-xs text-gray-500">Semua entri bersifat publik.</span>
        </div>
      </form>
    </section>
  );
}

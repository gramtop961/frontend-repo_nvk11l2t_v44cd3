import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import UploadForm from './components/UploadForm';
import PaperList from './components/PaperList';
import Footer from './components/Footer';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 grid gap-8">
        <Hero />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <UploadForm onCreated={() => setRefreshKey((k) => k + 1)} />
          </div>
          <div className="lg:col-span-2" id="papers">
            {/* Key will trigger reload on new item */}
            <div key={refreshKey}>
              <PaperList />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

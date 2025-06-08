import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/MapComponent'), { ssr: false });

export default function Csr() {
  const [ip, setIp] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

    useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/searches');
        const result = await response.json();

        if (response.ok) {
          setHistory(result.data);
        } else {
          setError('Eroare la încărcarea istoricului.');
        }
      } catch (err) {
        setError('Eroare la conectarea cu serverul MongoDB.');
      }
    };

    fetchHistory();
  }, []);

  const handleCheck = async () => {
    if (!ip) return alert("⚠️ Te rog introdu un IP valid!");

    try {
      // Verifică IP-ul folosind serviciul API existent
      const response = await fetch(`/api/abuse?ip=${ip}`);
      const result = await response.json();

      if (!response.ok) {
        setError('IP invalid sau eroare de la server.');
        setData(null);
        return;
      }

      setData(result.data);
      setError('');

      // Obține informațiile de locație ale IP-ului
      const geoResponse = await fetch(`https://ipwho.is/${ip}`);
      const geoResult = await geoResponse.json();
      if (geoResult.status === 'fail') {
        setError('Nu s-au putut obține coordonatele IP-ului.');
        return;
      }

      const fullData = {
        ...result.data,
        latitude: geoResult.latitude,
        longitude: geoResult.longitude,
        city: geoResult.city,
        country: geoResult.country,
        isp: geoResult.connection?.isp || 'necunoscut',
      };

      setData(fullData);
      setHistory(prev => [...prev, { ipAddress: ip, ...fullData }]);

      const searchData = {
        ipAddress: ip,
        country: geoResult.country,
        city: geoResult.city,
        abuseConfidenceScore: result.data.abuseConfidenceScore,
        totalReports: result.data.totalReports,
        isp: result.data.isp,
        latitude: geoResult.lat,
        longitude: geoResult.lon,
        timestamp: new Date().toISOString(),
      };

      const saveResponse = await fetch('/api/searches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });

      if (saveResponse.ok) {
        console.log('Căutarea a fost salvată cu succes!');
      } else {
        console.error('Eroare la salvarea căutării!');
      }

    } catch (err) {
      setError('Eroare la conectarea cu serverul HandleCheck.');
    }
  };


  const abuseData = history.map(entry => ({
    ip: entry.ipAddress,
    score: entry.abuseConfidenceScore,
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">🌐 Cyber Threat Monitor</h1>

      <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
        <input
          type="text"
          placeholder="Introduceți un IP (ex: 8.8.8.8)"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="p-3 rounded-md text-black w-full md:w-auto flex-1"
        />
        <button
          onClick={handleCheck}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md"
        >
          🔍 Verifică IP
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {data && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-blue-300 mb-2">📄 Rezultat IP</h2>
          <p><strong>IP:</strong> {data.ipAddress}</p>
          <p><strong>Țară:</strong> {data.country}</p>
          <p><strong>Oraș:</strong> {data.city}</p>
          <p><strong>ISP:</strong> {data.isp}</p>
          <p><strong>Abuse Score:</strong> {data.abuseConfidenceScore}%</p>
          <p><strong>Total Reports:</strong> {data.totalReports}</p>
        </div>
      )}

      {data?.latitude && data?.longitude && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-300 mb-2">🗺️ Locație IP pe hartă</h2>
          <Map lat={data.latitude} lon={data.longitude} />
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">📊 Istoric IP-uri analizate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={abuseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ip" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#00d1b2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

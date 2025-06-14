
'use client';
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import scenesMock from '../data/story-mock.json';

export default function Home() {
  const { data: session } = useSession();
  const [scenes, setScenes] = useState([]);
  const [storyText, setStoryText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: storyText })
      });
      if (res.ok) {
        const data = await res.json();
        setScenes(data);
      } else {
        setScenes(scenesMock);
      }
    } catch {
      setScenes(scenesMock);
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Storyteller AI Demo</h1>
      <div className="mb-4">
        {session ? (
          <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => signOut()}>Salir</button>
        ) : (
          <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={() => signIn()}>Ingresar</button>
        )}
      </div>
      <textarea
        className="w-full max-w-xl h-24 p-2 border mb-4"
        value={storyText}
        onChange={e => setStoryText(e.target.value)}
        placeholder="Escribe tu historia aquí"
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Cargando...' : 'Enviar historia'}
      </button>

      <div className="mt-6 w-full max-w-2xl text-left space-y-4">
        {scenes.map((scene, index) => (
          <div key={index} className="bg-white p-4 shadow rounded transition-opacity duration-500">
            <img src="https://via.placeholder.com/600x300?text=Scene" alt="scene" className="mb-2 w-full h-48 object-cover" />
            <h2 className="font-semibold">🎬 Escena {scene.scene}</h2>
            <p><strong>Escenario:</strong> {scene.setting}</p>
            <p><strong>Personajes:</strong> {scene.characters.join(', ')}</p>
            <p><strong>Acciones:</strong> {scene.actions}</p>
            {scene.dialogues && scene.dialogues.length > 0 && (
              <div>
                <strong>Diálogos:</strong>
                <ul className="list-disc ml-6">
                  {scene.dialogues.map((d, i) => (
                    <li key={i}><strong>{d.speaker}:</strong> {d.line}</li>
                  ))}
                </ul>
                <button
                  className="mt-2 px-2 py-1 bg-purple-500 text-white rounded"
                  onClick={async () => {
                    const lines = scene.dialogues.map(d => `${d.speaker}: ${d.line}`).join('. ');
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/tts`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ text: lines })
                    });
                    const blob = await res.blob();
                    const url = URL.createObjectURL(blob);
                    const audio = new Audio(url);
                    audio.play();
                  }}
                >🎵 Escuchar</button>
              </div>
            )}
            <button
              className="mt-2 px-2 py-1 bg-teal-500 text-white rounded"
              onClick={() => {
                const audio = new Audio(`${process.env.NEXT_PUBLIC_API_BASE}/ambient?setting=${encodeURIComponent(scene.setting)}`);
                audio.play();
              }}
            >🎶 Play Ambiente</button>
          </div>
        ))}
      </div>
      {scenes.length > 0 && (
        <button
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
          onClick={async () => {
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/save`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ title: 'Historia', scenes, user: session?.user?.email || 'guest' })
            });
            alert('Historia guardada');
          }}
        >Guardar historia</button>
      )}
    </main>
  );
}

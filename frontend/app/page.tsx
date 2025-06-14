
'use client';
import { useState } from 'react';
import scenesMock from '../data/story-mock.json';

export default function Home() {
  const [scenes, setScenes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setScenes(scenesMock);
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Storyteller AI Demo</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Cargando...' : 'Enviar historia'}
      </button>

      <div className="mt-6 w-full max-w-2xl text-left space-y-4">
        {scenes.map((scene, index) => (
          <div key={index} className="bg-white p-4 shadow rounded">
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
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

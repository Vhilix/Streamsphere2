import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { VideoPlayer } from '../components/VideoPlayer';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { playbackApi } from '../features/playback/api';
import { titleApi } from '../features/title/api';
import { useState, useCallback } from 'react';

export function Play() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lastHeartbeat, setLastHeartbeat] = useState(0);

  // Using mock data for MVP
  const { data: playback, isLoading: playbackLoading } = useQuery({
    queryKey: ['playback', id],
    queryFn: () => playbackApi.getMockPlayback(id!),
    enabled: !!id,
  });

  const { data: title } = useQuery({
    queryKey: ['title', id],
    queryFn: () => titleApi.getMockTitle(id!),
    enabled: !!id,
  });

  const handleTimeUpdate = useCallback((currentTime: number) => {
    // Send heartbeat every 30 seconds
    if (currentTime - lastHeartbeat >= 30) {
      setLastHeartbeat(currentTime);
      // In production: playbackApi.sendHeartbeat(id!, currentTime);
      console.log('Heartbeat:', currentTime);
    }
  }, [lastHeartbeat, id]);

  if (playbackLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!playback) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to start playback</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          className="text-white bg-black/50 hover:bg-black/70"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-7xl">
          <VideoPlayer 
            hlsUrl={playback.hlsUrl}
            onTimeUpdate={handleTimeUpdate}
          />
          
          {title && (
            <div className="p-6">
              <h1 className="text-white mb-2">{title.name}</h1>
              <p className="text-gray-400">{title.synopsis}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

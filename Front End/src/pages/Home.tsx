import { useQuery } from '@tanstack/react-query';
import { Header } from '../components/layout/Header';
import { TitleRow } from '../components/TitleRow';
import { catalogApi } from '../features/catalog/api';
import { Button } from '../components/ui/button';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  
  // Using mock data for MVP - replace with real API call
  const { data, isLoading, error } = useQuery({
    queryKey: ['catalog'],
    queryFn: () => catalogApi.getMockCatalog(),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center h-96">
          <p className="text-red-500">Failed to load catalog</p>
        </div>
      </div>
    );
  }

  const featuredTitle = data?.items[0];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      {featuredTitle && (
        <div className="relative h-[70vh] mb-8">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${featuredTitle.posterUrl})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
          
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-16">
            <h1 className="mb-4 max-w-2xl">{featuredTitle.name}</h1>
            <div className="flex items-center gap-3 mb-6 text-gray-300">
              <span>{featuredTitle.year}</span>
              <span>•</span>
              <span>{featuredTitle.genres.join(', ')}</span>
            </div>
            <div className="flex gap-3">
              <Button 
                size="lg" 
                onClick={() => navigate(`/title/${featuredTitle.id}`)}
              >
                <Play className="w-5 h-5 mr-2" />
                Play Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate(`/title/${featuredTitle.id}`)}
              >
                More Info
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Content Rows */}
      <div className="container mx-auto">
        {data && (
          <>
            <TitleRow 
              title="Trending Now" 
              titles={data.items.slice(0, 10)} 
            />
            <TitleRow 
              title="Popular on StreamPlatform" 
              titles={data.items.slice(5, 15)} 
            />
            <TitleRow 
              title="New Releases" 
              titles={data.items.slice(10, 20)} 
            />
          </>
        )}
      </div>
    </div>
  );
}

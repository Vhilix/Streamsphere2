import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { TitleRow } from '../components/TitleRow';
import { Button } from '../components/ui/button';
import { Play, ArrowLeft } from 'lucide-react';
import { titleApi } from '../features/title/api';
import { catalogApi } from '../features/catalog/api';

export function Title() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Using mock data for MVP
  const { data: title, isLoading, error } = useQuery({
    queryKey: ['title', id],
    queryFn: () => titleApi.getMockTitle(id!),
    enabled: !!id,
  });

  const { data: catalog } = useQuery({
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

  if (error || !title) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center h-96">
          <p className="text-red-500">Failed to load title</p>
        </div>
      </div>
    );
  }

  const similarTitles = catalog?.items.filter(item => 
    title.similar.includes(item.id)
  ) || [];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[80vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${title.images.backdrop})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-16">
          <Button
            variant="ghost"
            className="absolute top-8 left-4 text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>

          <h1 className="mb-4 max-w-3xl">{title.name}</h1>
          
          {title.year && title.genres && (
            <div className="flex items-center gap-3 mb-4 text-gray-300">
              <span>{title.year}</span>
              <span>•</span>
              <span>{title.genres.join(', ')}</span>
            </div>
          )}

          <p className="mb-6 max-w-2xl text-gray-300">
            {title.synopsis}
          </p>

          <div className="flex gap-3">
            <Button 
              size="lg"
              onClick={() => navigate(`/play/${title.id}`)}
            >
              <Play className="w-5 h-5 mr-2" />
              Play
            </Button>
          </div>

          {title.streams.length > 0 && (
            <div className="mt-6 text-sm text-gray-400">
              Available in: {title.streams.map(s => s.profile).join(', ')}
            </div>
          )}
        </div>
      </div>

      {/* Similar Titles */}
      {similarTitles.length > 0 && (
        <div className="container mx-auto mt-8">
          <TitleRow title="More Like This" titles={similarTitles} />
        </div>
      )}
    </div>
  );
}

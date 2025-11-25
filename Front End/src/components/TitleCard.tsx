import { Link } from 'react-router-dom';
import type { TitleSummary } from '../types/api';

interface TitleCardProps {
  title: TitleSummary;
}

export function TitleCard({ title }: TitleCardProps) {
  return (
    <Link
      to={`/title/${title.id}`}
      className="group block relative overflow-hidden rounded-lg transition-transform hover:scale-105"
    >
      <div className="aspect-[2/3] relative">
        <img
          src={title.posterUrl}
          alt={title.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform">
        <h3 className="text-white mb-1 line-clamp-1">{title.name}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <span>{title.year}</span>
          {title.genres.length > 0 && (
            <>
              <span>•</span>
              <span className="line-clamp-1">{title.genres.join(', ')}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

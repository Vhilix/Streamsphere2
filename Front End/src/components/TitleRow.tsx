import { TitleCard } from './TitleCard';
import type { TitleSummary } from '../types/api';

interface TitleRowProps {
  title: string;
  titles: TitleSummary[];
}

export function TitleRow({ title, titles }: TitleRowProps) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 px-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide">
        {titles.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-48">
            <TitleCard title={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

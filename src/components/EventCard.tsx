import { ExternalLinkIcon, CalendarIcon, UserIcon, HeartHandshakeIcon, HeartIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HistoricalEvent } from '@/types/history';

interface EventCardProps {
  event: HistoricalEvent;
  index: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function EventCard({ event, index, isFavorite = false, onToggleFavorite }: EventCardProps) {
  const getTypeIcon = () => {
    switch (event.type) {
      case 'births':
        return <UserIcon className="w-4 h-4" />;
      case 'deaths':
        return <HeartHandshakeIcon className="w-4 h-4" />;
      default:
        return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const getTypeBadgeVariant = () => {
    switch (event.type) {
      case 'births':
        return 'secondary';
      case 'deaths':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getTypeLabel = () => {
    switch (event.type) {
      case 'births':
        return 'Born';
      case 'deaths':
        return 'Died';
      default:
        return 'Event';
    }
  };

  return (
    <Card 
      className={`event-card fade-in overflow-hidden`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        {event.imageUrl && (
          <div className="md:w-48 h-48 md:h-auto flex-shrink-0">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={getTypeBadgeVariant()} className="text-xs">
                    {getTypeIcon()}
                    <span className="ml-1">{getTypeLabel()}</span>
                  </Badge>
                  <span className="text-2xl font-heading font-bold text-historical">
                    {event.year}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-semibold leading-tight">
                  {event.title}
                </h3>
              </div>

              {/* Favorite Button & Timeline */}
              <div className="hidden md:flex items-center gap-2">
                <div className="timeline-line h-8 mr-4"></div>
                <div className="timeline-dot"></div>
                {onToggleFavorite && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggleFavorite}
                    className="ml-2 h-8 w-8 p-0"
                  >
                    <HeartIcon 
                      className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                    />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {event.description}
            </p>

            <div className="flex gap-2 flex-wrap">
              {onToggleFavorite && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onToggleFavorite}
                  className="md:hidden"
                >
                  <HeartIcon 
                    className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                  />
                  {isFavorite ? 'Favorited' : 'Favorite'}
                </Button>
              )}
              
              {event.wikipediaUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex-1 md:flex-none"
                >
                  <a
                    href={event.wikipediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    <ExternalLinkIcon className="w-4 h-4 mr-2" />
                    Learn More
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
import { useState } from 'react';
import { HeartIcon, TrashIcon, ArrowLeftIcon, CalendarIcon, UserIcon, HeartHandshakeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useFavorites } from '@/hooks/useFavorites';
import { HistoricalEvent } from '@/types/history';
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const [eventToDelete, setEventToDelete] = useState<HistoricalEvent | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'births':
        return <UserIcon className="w-4 h-4" />;
      case 'deaths':
        return <HeartHandshakeIcon className="w-4 h-4" />;
      default:
        return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'births':
        return 'secondary' as const;
      case 'deaths':
        return 'outline' as const;
      default:
        return 'default' as const;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'births':
        return 'Born';
      case 'deaths':
        return 'Died';
      default:
        return 'Event';
    }
  };

  const handleDeleteEvent = (event: HistoricalEvent) => {
    removeFromFavorites(event);
    setEventToDelete(null);
  };

  const handleClearAll = () => {
    clearFavorites();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/')}
              className="glass"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to History
            </Button>
            
            {favorites.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <TrashIcon className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear All Favorites?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove all {favorites.length} events from your favorites. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearAll} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Clear All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
              Your <span className="text-historical">Favorites</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              {favorites.length === 0 
                ? "No favorite events yet. Start exploring and save the ones that interest you!"
                : `${favorites.length} favorite historical event${favorites.length === 1 ? '' : 's'}`
              }
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <HeartIcon className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-3">No Favorites Yet</h3>
              <p className="text-muted-foreground mb-6">
                When you find historical events that interest you, click the heart icon to save them here.
              </p>
              <Button onClick={() => navigate('/')} size="lg">
                Explore History
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:gap-8">
            {favorites.map((event, index) => (
              <Card 
                key={`${event.type}-${event.year}-${index}`}
                className="event-card fade-in overflow-hidden"
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
                            <Badge variant={getTypeBadgeVariant(event.type)} className="text-xs">
                              {getTypeIcon(event.type)}
                              <span className="ml-1">{getTypeLabel(event.type)}</span>
                            </Badge>
                            <span className="text-2xl font-heading font-bold text-historical">
                              {event.year}
                            </span>
                          </div>
                          <h3 className="text-lg font-heading font-semibold leading-tight">
                            {event.title}
                          </h3>
                        </div>

                        {/* Delete Button */}
                        <div className="flex items-center gap-2">
                          <div className="timeline-line h-8 mr-4 hidden md:block"></div>
                          <div className="timeline-dot hidden md:block"></div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remove from Favorites?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will remove "{event.title}" from your favorites.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteEvent(event)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {event.description}
                      </p>

                      {event.wikipediaUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="w-full md:w-auto"
                        >
                          <a
                            href={event.wikipediaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center"
                          >
                            Learn More
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Favorites;

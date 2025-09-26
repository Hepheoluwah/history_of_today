import { useState, useEffect } from 'react';
import { CalendarIcon, SearchIcon, ShareIcon, ChevronLeftIcon, ChevronRightIcon, AlertCircleIcon, RefreshCwIcon, HeartIcon, KeyboardIcon } from 'lucide-react';
import { format, subDays, addDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { EventCard } from '@/components/EventCard';
import { LoadingCard } from '@/components/LoadingCard';
import { ShareDialog } from '@/components/ShareDialog';
import { Footer } from '@/components/Footer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BackToTop } from '@/components/BackToTop';
import { useFavorites } from '@/hooks/useFavorites';
import { getOnThisDay } from '@/services/api';
import { HistoricalEvent, EventType } from '@/types/history';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  console.log('Index component rendering...');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<HistoricalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<EventType | 'all'>('all');
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  
  const { isFavorite, addToFavorites, removeFromFavorites, favoritesCount } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    filterEvents();
  }, [events, searchQuery, activeFilter]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return; // Don't interfere with typing in inputs
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          navigateDate('prev');
          break;
        case 'ArrowRight':
          event.preventDefault();
          navigateDate('next');
          break;
        case 'h':
        case 'H':
          event.preventDefault();
          navigate('/');
          break;
        case 'f':
        case 'F':
          event.preventDefault();
          navigate('/favorites');
          break;
        case 'a':
        case 'A':
          event.preventDefault();
          navigate('/about');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchEvents = async (date: Date) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOnThisDay(date);
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load historical events. Please try again later.');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(event => event.type === activeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.year.toString().includes(query)
      );
    }

    setFilteredEvents(filtered);
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    setSelectedDate(prev => direction === 'prev' ? subDays(prev, 1) : addDays(prev, 1));
  };

  const eventCounts = {
    all: events.length,
    events: events.filter(e => e.type === 'events').length,
    births: events.filter(e => e.type === 'births').length,
    deaths: events.filter(e => e.type === 'deaths').length,
  };

  const FilterButton = ({ type, label }: { type: EventType | 'all', label: string }) => (
    <Button
      variant={activeFilter === type ? "default" : "secondary"}
      size="sm"
      onClick={() => setActiveFilter(type)}
      className="text-xs"
    >
      {label} ({eventCounts[type]})
    </Button>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8 relative">
            <div className="absolute top-0 right-0">
              <ThemeToggle />
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
              Today in <span className="text-historical">History</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Discover the fascinating events, births, and deaths that shaped our world on this day in history
            </p>
          </div>

          {/* Date Navigation */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => navigateDate('prev')}
                className="glass"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary" className="glass min-w-[200px] justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(selectedDate, "EEEE, MMMM d")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              <Button
                variant="secondary"
                size="icon"
                onClick={() => navigateDate('next')}
                className="glass"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => navigate('/favorites')}
                      className="glass relative"
                    >
                      <HeartIcon className="w-4 h-4" />
                      {favoritesCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {favoritesCount > 99 ? '99+' : favoritesCount}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Favorites ({favoritesCount}) • Press F</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => setShareDialogOpen(true)}
                      className="glass"
                    >
                      <ShareIcon className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share this day</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="glass"
                    >
                      <KeyboardIcon className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-sm space-y-1">
                      <p><kbd className="px-1 py-0.5 bg-muted rounded text-xs">←</kbd> <kbd className="px-1 py-0.5 bg-muted rounded text-xs">→</kbd> Navigate dates</p>
                      <p><kbd className="px-1 py-0.5 bg-muted rounded text-xs">F</kbd> Favorites</p>
                      <p><kbd className="px-1 py-0.5 bg-muted rounded text-xs">A</kbd> About</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by year, person, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass border-white/20"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <FilterButton type="all" label="All" />
          <FilterButton type="events" label="Events" />
          <FilterButton type="births" label="Births" />
          <FilterButton type="deaths" label="Deaths" />
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid gap-6 md:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <AlertCircleIcon className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Unable to Load Events</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => fetchEvents(selectedDate)} variant="outline">
                <RefreshCwIcon className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:gap-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <EventCard
                  key={`${event.type}-${event.year}-${index}`}
                  event={event}
                  index={index}
                  isFavorite={isFavorite(event)}
                  onToggleFavorite={() => {
                    if (isFavorite(event)) {
                      removeFromFavorites(event);
                    } else {
                      addToFavorites(event);
                    }
                  }}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <CalendarIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {searchQuery ? 'No Events Found' : 'No Events Available'}
                  </h3>
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? `No events found matching "${searchQuery}". Try a different search term.`
                      : `No historical events are recorded for ${format(selectedDate, "MMMM d, yyyy")}. Try selecting a different date.`
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Share Dialog */}
      <ShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        date={selectedDate}
        eventCount={events.length}
      />

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default Index;
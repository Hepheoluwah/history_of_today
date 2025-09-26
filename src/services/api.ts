import { HistoricalEvent, EventType } from '@/types/history';

const BASE_URL = 'https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday';

export async function getOnThisDay(date: Date): Promise<HistoricalEvent[]> {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  try {
    const response = await fetch(`${BASE_URL}/all/${month}/${day}`);
    if (!response.ok) throw new Error('Failed to fetch data');
    
    const data = await response.json();
    const events: HistoricalEvent[] = [];

    // Process events
    if (data.events) {
      data.events.forEach((event: any) => {
        events.push({
          type: 'events' as EventType,
          year: event.year,
          title: event.text,
          description: event.pages?.[0]?.extract || 'No description available',
          imageUrl: event.pages?.[0]?.thumbnail?.source,
          wikipediaUrl: event.pages?.[0]?.content_urls?.desktop?.page
        });
      });
    }

    // Process births
    if (data.births) {
      data.births.forEach((birth: any) => {
        events.push({
          type: 'births' as EventType,
          year: birth.year,
          title: birth.text,
          description: birth.pages?.[0]?.extract || 'No description available',
          imageUrl: birth.pages?.[0]?.thumbnail?.source,
          wikipediaUrl: birth.pages?.[0]?.content_urls?.desktop?.page
        });
      });
    }

    // Process deaths
    if (data.deaths) {
      data.deaths.forEach((death: any) => {
        events.push({
          type: 'deaths' as EventType,
          year: death.year,
          title: death.text,
          description: death.pages?.[0]?.extract || 'No description available',
          imageUrl: death.pages?.[0]?.thumbnail?.source,
          wikipediaUrl: death.pages?.[0]?.content_urls?.desktop?.page
        });
      });
    }

    // Sort by year (most recent first)
    return events.sort((a, b) => b.year - a.year);
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
}
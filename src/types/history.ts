export type EventType = 'events' | 'births' | 'deaths';

export interface HistoricalEvent {
  type: EventType;
  year: number;
  title: string;
  description: string;
  imageUrl?: string;
  wikipediaUrl?: string;
}
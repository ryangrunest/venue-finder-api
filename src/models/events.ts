export interface IEvent {
  date: Date;
  venueId: string;
  startTime: string;
  endTime: string;
  isOver18: boolean;
  isOver21: boolean;
  notes: string;
}
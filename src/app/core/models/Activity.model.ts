export interface ActivityNewDTO {
  activityId: string;
  title: string;
  description: string;
  len: TranslateLen;
  imageLink?: string;
  registerDate;
  regVolunteerName;
  translateList?: ActivityNewDTO[];
}
export enum TranslateLen{
  ENGLISH = 'ENGLISH',
  SPANISH = 'SPANISH',
}

export interface ActivityNewDTO {
  activityId: string;
  title: string;
  description: string;
  lenTranslateLen: TranslateLen;
  imageLink?: string;
  registerDate;
  regVolunteerName;
  activityTranslates?: ActivityNewDTO[];
}
export enum TranslateLen{
  ENGLISH = 'ENGLISH',
  SPANISH = 'SPANISH',
}

import {BoxSeed} from "./Seed.model";

export enum TrackingStatus{
  SOUVENIR_PENDING = 'SOUVENIR_PENDING',
  SOUVENIR_SENT = 'SOUVENIR_SENT',
  SOUVENIR_DELIVERED = 'SOUVENIR_DELIVERED',
}
export interface BoxVolunteer{
  volunter_id: string;
  largename: string;
  email: string;
  phone: string;
  dni: string;
}

export interface SeedSouvenirTracking {
  seedSouvenirTrackingId;
  selectedDate;
  souvenirSendDate;
  trackingStatus;
  trackingStatusLabel;
  spentAmount;
  chosenCity;
  observation;
  benefitedContributorId;
  benefitedContributorLabel: BoxSeed;
  volunteerInChargeId;
  volunteerInChargeLabel: BoxVolunteer;
  souvenirTrackingComments: CommentRecordDTO[]
}
export interface CommentRecordDTO{
  commentId;
  comment;
  comment_date;
}

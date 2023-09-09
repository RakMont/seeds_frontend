export interface ContributionRecord{
  "contributionRecordId": string,
  "contributionAmount": number,
  "contributionObtained": boolean,
  "contributorDTO": ContributorDTO,
  "expectedPaymentDate": Date,
  "extraIncomeAmount": string,
  "paymentMethod": string,
  "paymentDate": Date,
  "receiptCode": string,
  "receiptNumber": string,
  "sentPaymentProof": boolean,
  "extraExpense": any,
  "trackingAssignmentId": string,
  "contributionConfigId": string
}

export interface ContributorDTO{
  "seedId": string,
  "name": string,
  "lastname": string,
  "email": string,
  "phone": string,
  "dni": string,
  "birthdate": Date,
  "address": string,
  "country": string,
  "city": string,
  "send_date": Date,
  "contributorState": number,
  "registerVolunteer": string,
  "contributionType": string,
}

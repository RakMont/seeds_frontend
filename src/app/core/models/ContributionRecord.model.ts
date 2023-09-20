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
  paymentMethodLabel: string,
  extraExpenseReason: string,
  extraExpenseAmount,
  hasExtraExpense
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

export enum ReportType{
  TOTAL_AMOUNT_PDF = 'TOTAL_AMOUNT_PDF',
  TOTAL_AMOUNT_CSV = 'TOTAL_AMOUNT_CSV',
  SEED_RECORD_PDF = 'SEED_RECORD_PDF',
  SEED_RECORD_CSV = 'SEED_RECORD_CSV',
}

export interface ContributionReportFilter {
  beginDate: string,
  endDate: string,
  paymentMethod,
  seedId: string,
  contributionType,
  reportType:ReportType,
}

export interface ComboElement{
  value: string;
  selected: boolean;
  name: string;
}

export interface ComboResponse{
  data: ComboElement[];
}

export interface PayloadLogin{
  username: string;
  password: string;
}

export enum ResponseStatus{
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
}

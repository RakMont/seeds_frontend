export interface  Volunter{
  volunterId?: number;
  userId?: number;
  name?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  dni?: string;
  birthdate?: Date;
  entry_date?: Date;
  exit_date?: Date;
  status?: string;
  roles?: Role[];
}

export interface  Role{
  roleId: number ;
  role_name: string;
}

export interface VolunterFilter{
  status: string;
  roleId: string;
}

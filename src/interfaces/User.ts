export interface User {
    id: number;
    name: string;
    rut: string;
    email: string;
    password?: string;
    role: Role;
    phone?: string;
    birthday?: string;
    country?: string;
    deletedDate?: Date;
    createDate: Date;
  }
  
  export enum Role {
    USER = 'user',
    ADMIN = 'admin',
  }
  
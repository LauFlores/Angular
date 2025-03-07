export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  direccion:string;
  tel:string;
  token: string;
  isActive: boolean;
  role: "ADMIN" | "USER";
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  UserID: number;
  Mailadresse: string;
  Password: string;
  RoleID: number;
  FirstName: string;
  LastName: string;
  role: {
    RoleID: number;
    UserRole: string;
  };
  status: number;
  vehicles: [];
}



export class User {
  Id: string;
  UserTypeId: number;
  Civility: string;
  Password: string;
  Email: string;
  PhoneNumber: number;
  firstName: string;
  lastName: string;
  Adresse: string;
  city: string;
  country: string;
  AboutMe: string;
  DateOfBirth: Date;
  Gender: string;

  Image: File;
  photoUrl: string;
  UserName: string;
  IsActive: boolean;


  constructor() {
  }

}

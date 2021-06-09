export class User {
  id?: string;
  civility?: string;
  email?: string;
  password?: string;
  dateOfBirth?: Date;
  gender?: string;
  isActive?: boolean;
  phoneNumber?: number;
  isValid?: boolean;
  personnality?: string;
  userProviderId?: string;
  normalizedUserName?: string;
  normalizedEmail?: string;
  emailConfirmed?: boolean;
  passwordHash?: string;
  securityStamp?: string;
  concurrencyStamp?: string;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  lockoutEnd?: string;
  lockoutEnabled?: boolean;
  accessFailedCount?: 0;
  userType?: string;
  adresse?: string;
  city?: string;
  country?: string;
  aboutMe?: string;
  photoUrl?: string;
  firstName?: string;
  lastName?: string;
  aspNetUserClaims?: [];
  aspNetUserLogins?: [];
  aspNetUserRoles?: [];
  aspNetUserTokens?: [];
  jobOffer?: [];
  jobApply?: [];
  files?: [];
  userName?: string


  constructor() {
  }

}

import {File} from './File';
import {JobApply} from './JobApply';

export class User {
  id?: string | undefined;
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
  files?: File [];
  userName?: string
  hasResume?: boolean
  hasCompany?: boolean;
  resume?: File
  selectedJobApply?: JobApply


  constructor() {
  }

}

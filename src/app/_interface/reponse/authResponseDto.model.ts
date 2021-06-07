import {User} from '../../models/user';

export interface AuthResponseDto {
  isAuthSuccessful: boolean;
  errorMessage: string;
  token: string;
  is2StepVerificationRequired: boolean;
  provider: string;
  'user': User
}

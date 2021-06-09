import {environment} from '../../environments/environment';

const apiUrl = environment.apiUrl;


export const apiConfig = {
  apis: {
    company: `${apiUrl}/company`,
    jobOffer: `${apiUrl}/jobOffer`,
    jobApply: `${apiUrl}/jobApply`,
    file: `${apiUrl}/post`,
    user: `${apiUrl}/user`,

  },
};


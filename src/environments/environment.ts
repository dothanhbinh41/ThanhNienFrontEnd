import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'ThanhNien',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://thanhnienapi.edutalk.edu.vn',
    redirectUri: baseUrl,
    clientId: 'ThanhNien_App',
    responseType: 'code',
    scope: 'offline_access openid profile role email phone ThanhNien',
  },
  apis: {
    default: {
      url: 'https://thanhnienapi.edutalk.edu.vn',
      rootNamespace: 'ThanhNien',
    },
  },
} as Environment;

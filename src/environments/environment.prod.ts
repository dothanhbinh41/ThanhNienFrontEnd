import { Environment } from '@abp/ng.core';

const baseUrl = 'https://hcm-humg.edutalk.edu.vn';

export const environment = {
  production: true,
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
    scope: 'offline_access ThanhNien',
  },
  apis: {
    default: {
      url: 'https://thanhnienapi.edutalk.edu.vn',
      rootNamespace: 'ThanhNien',
    },
  },
} as Environment;

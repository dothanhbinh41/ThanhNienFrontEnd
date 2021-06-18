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
    issuer: 'http://thanhnienapi.azurewebsites.net',
    redirectUri: baseUrl,
    clientId: 'ThanhNien_App',
    responseType: 'code',
    scope: 'offline_access ThanhNien',
  },
  apis: {
    default: {
      url: 'http://thanhnienapi.azurewebsites.net',
      rootNamespace: 'ThanhNien',
    },
  },
} as Environment;

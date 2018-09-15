interface IAuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}
export const AUTH_CONFIG: IAuthConfig = {
  clientID: '1wXfWgIEgt3TU3RmOkKgECGdN9lFll4f',
  domain: 'g-mean-rsvp.auth0.com',
  callbackURL: 'https://localhost:44343/callback'
}

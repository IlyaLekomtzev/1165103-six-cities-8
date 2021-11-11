import { name, internet, datatype } from 'faker';
import { UserData } from '../types/auth-data';

export const makeFakeUserData = (): UserData => ({
  id: datatype.number(),
  name: name.firstName(),
  email: internet.email(),
  isPro: datatype.boolean(),
  avatarUrl: internet.avatar(),
  token: datatype.uuid(),
} as UserData);

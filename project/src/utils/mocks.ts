import { name, internet, datatype, address, lorem, image } from 'faker';
import { UserData } from '../types/auth-data';
import { Offer } from '../types/offers';
import { Review } from '../types/reviews';

export const makeFakeUserData = (): UserData => ({
  id: datatype.number(),
  name: name.firstName(),
  email: internet.email(),
  isPro: datatype.boolean(),
  avatarUrl: internet.avatar(),
  token: datatype.uuid(),
} as UserData);

export const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number(),
  city: {
    location: {
      latitude: datatype.number(),
      longitude: datatype.number(),
      zoom: datatype.number(),
    },
    name: address.city(),
  },
  description: lorem.text(),
  goods: Array(3).fill(lorem.word()),
  host: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
  id: datatype.number(),
  images: Array(3).fill(image.city()),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number(),
  },
  maxAdults: datatype.number(),
  previewImage: image.city(),
  price: datatype.number(),
  rating: datatype.number(),
  title: name.title(),
  type: lorem.word(),
} as Offer);


export const makeFakeReview = (): Review => ({
  comment: lorem.text(),
  date: datatype.datetime().toLocaleString(),
  id: datatype.number(),
  rating: datatype.number(),
  user: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
} as Review);

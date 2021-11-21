import { monthNames } from '../const';

export const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

export const getFormatDate = (stringDate: string): string => {
  const date = new Date(stringDate);
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[month]} ${year}`;
};

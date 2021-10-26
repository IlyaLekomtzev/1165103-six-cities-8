import * as actions from '../store/action';

export enum ActionType {
  SetCity = 'offers/setCity',
  SetOffers = 'offers/setOffers',
}

type InferValueTypes<T> = T extends {[key: string]: infer U} ? U : never;

export type Actions = ReturnType<InferValueTypes<typeof actions>>;

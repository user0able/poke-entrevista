export interface ResponseList<T> {
  count: number;
  next: string;
  previous: null | string;
  results: T;
}

export interface Result {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  visible: boolean;
  name: string;
  order: number;
  weight: number;
  height: number;
  urlDetail: string;
}

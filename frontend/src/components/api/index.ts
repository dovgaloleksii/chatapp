import { AbstractAPI } from './abstract';
import { DjangoAPI } from './django';
import { APIConfig } from '../../types';

export type ApiNames = 'django' | undefined;

export const getApi = (name: ApiNames, config: APIConfig): AbstractAPI => {
  switch (name) {
    case 'django':
      return new DjangoAPI(config);
    default:
      return new DjangoAPI(config);
  }
};

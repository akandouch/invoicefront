import {Entity} from '../entity.interface';

export interface RestService {
  path: string;

  get(params?: any, callBackNext?: any, callbackError?: any, callbackComplete?: any);

  post<T extends Entity>(data: T, callBackNext?: any, callbackError?: any, callbackComplete?: any);

  delete<T extends Entity>(entity: Entity, callBackNext?: any, callbackError?: any, callbackComplete?: any);

  getResourcePath(entity: Entity);

  getImage(entity: Entity, callBackNext?: any, callbackError?: any, callbackComplete?: any);
}

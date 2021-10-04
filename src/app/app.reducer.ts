import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';
import { Params, RouterStateSnapshot } from '@angular/router';
import { environment } from '../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { Injectable } from "@angular/core";

/* According to the docs this custom serializer is good: https://github.com/ngrx/platform/blob/v4.1.1/docs/router-store/api.md#custom-router-state-serializer */
export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}

export interface AppState {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

@Injectable()
export class CustomRouterStateSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;

    // Only return an object including the URL and query params
    // instead of the entire snapshot
    return { url, queryParams };
  }
}

export const reducers: ActionReducerMap<AppState> = {
  routerReducer: fromRouter.routerReducer,
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function (state: AppState, action: any): AppState {

      return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [logger,storeFreeze]
    : [logger];
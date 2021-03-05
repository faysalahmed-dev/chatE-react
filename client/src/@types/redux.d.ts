import * as Redux from 'redux';

declare module 'redux' {
   export interface Store {
      private _reducers_map: { [key: string]: Reducer };
      injectReducer(key: string, reducer: Reducer): void;
   }
}

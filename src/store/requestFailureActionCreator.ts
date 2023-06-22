import { PayloadAction } from '@reduxjs/toolkit';
import { IParsedError } from '../utils/parseError';

export const requestFailureActionReducer = <StateType>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  state: StateType,
  action: PayloadAction<IParsedError>,
  /* eslint-enable @typescript-eslint/no-unused-vars */
): void => {
    // actionPayload is used in networkState reducer

};

/*
 * Copyright 2022 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ApiRef } from '@backstage/core-plugin-api';

// export type MockedApi<TApi, TImpl> = {
//   [K in keyof TImpl]: TApi[K] extends jest.Mock<TApi[K]> ?  (...args: infer TArgs) => infer TReturn;
// };

/**
 * Simplifies the creation of a mock of a utility API.
 *
 * @public
 */
export function mockApi<TApi, TImpl extends Partial<TImpl>>(
  _apiRef: ApiRef<TApi>,
  api: TImpl,
): {
  mock: TImpl;
  impl: TApi;
} {
  return {
    mock: api,
    impl: api as unknown as TApi,
  };
}

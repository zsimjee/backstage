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
import { createApiRef } from '@backstage/core-plugin-api';
import { TestApiRegistry } from './TestApiProvider';
// import { mockApi } from './mockApi';

interface FooApi {
  foo(): string;
  bar(): number;
  baz(): null;
}

const fooApiRef = createApiRef<FooApi>({
  id: 'foo',
});

type Ehh<TApi> = TApi extends infer TMock ? Partial<TMock> : never;

type Ohh<TApi> = {
  [TKey in keyof TApi]?: TApi[TKey] extends infer TMock ? TMock : never;
};

function mockApi<TApi, TMock extends Ohh<TApi>>(
  _apiRef: ApiRef<TApi>,
  api: TMock,
): {
  mock: TMock;
  impl: TApi;
} {
  return {
    mock: api,
    impl: api as unknown as TApi,
  };
}

describe('mockApi', () => {
  it('supports an empty implementation', () => {
    const { mock, impl } = mockApi(fooApiRef, {});

    // @ts-expect-error
    expect(mock.foo).toBeUndefined();
    // @ts-expect-error
    expect(mock.bar).toBeUndefined();
    // @ts-expect-error
    expect(mock.baz).toBeUndefined();

    expect(impl.foo).toBeUndefined();
    expect(impl.bar).toBeUndefined();
    expect(impl.baz).toBeUndefined();
  });

  it('supports a partial implementation', () => {
    const { mock, impl } = mockApi(fooApiRef, {
      foo: jest.fn(),
      bar: () => 2,
    });

    expect(mock.foo).toBeDefined();
    expect(mock.bar).toBeDefined();
    // @ts-expect-error
    expect(mock.baz).toBeUndefined();

    expect(impl.foo).toBeDefined();
    expect(impl.bar).toBeDefined();
    expect(impl.baz).toBeUndefined();

    mock.foo.mockReturnValue('hello');
    // @ts-expect-error
    expect(mock.bar.mockReturnValue).toBeUndefined();

    expect(mock.foo()).toBe('hello');
    expect(mock.bar()).toBe(2);
    expect(impl.foo()).toBe('hello');
    expect(impl.bar()).toBe(2);
  });

  it('rejects unknown mock properties', () => {
    mockApi(fooApiRef, {
      // @ts-expect-error
      unknown: jest.fn(),
    });

    expect.anything();
  });

  it('makes implementations and full mocks that can be passed to functions, but not partial mocks', () => {
    const { mock: fullMock, impl: fullImpl } = mockApi(fooApiRef, {
      foo: jest.fn(),
      bar: jest.fn(),
      baz: jest.fn(),
    });
    const { mock: partialMock, impl: partialImpl } = mockApi(fooApiRef, {
      foo: jest.fn(),
      bar: jest.fn(),
    });

    function f(_a: FooApi) {}

    f(fullMock);
    f(fullImpl);
    // @ts-expect-error
    f(partialMock);
    f(partialImpl);

    expect.anything();
  });

  it('creates partial mocks that can be passed to the TestApiRegistry', () => {
    const { mock, impl } = mockApi(fooApiRef, {
      foo: jest.fn(),
      bar: jest.fn(),
    });

    const registry = TestApiRegistry.from([fooApiRef, mock]);

    expect(registry.get(fooApiRef)).toBe(impl);
  });
});

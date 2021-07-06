/*
 * Copyright 2021 The Backstage Authors
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

import { InputError } from '@backstage/errors';

export function optionalInteger(
  query: Record<string, unknown>,
  ctx: string,
): number | undefined {
  const value = optionalString(query, ctx);
  if (value === undefined) {
    return undefined;
  }

  const parsed = parseInt(value, 10);
  if (!Number.isInteger(parsed) || String(parsed) !== value) {
    throw new InputError(`Invalid ${ctx}, "${value}" is not an integer`);
  }

  return parsed;
}

export function optionalNumber(
  query: Record<string, unknown>,
  ctx: string,
): number | undefined {
  const value = optionalString(query, ctx);
  if (value === undefined) {
    return undefined;
  }

  const parsed = parseInt(value, 10);
  if (!Number.isFinite(parsed)) {
    throw new InputError(`Invalid ${ctx}, "${value}" is not a number`);
  }

  return parsed;
}

export function optionalString(
  query: Record<string, unknown>,
  ctx: string,
): string | undefined {
  const array = optionalStrings(query, ctx);
  if (!array?.length) {
    return undefined;
  } else if (array.length > 1) {
    throw new InputError(
      `Invalid query parameter ${ctx}, expected no more than one value but got ${array.length}`,
    );
  }

  return array[0];
}

export function optionalStrings(
  query: Record<string, unknown>,
  ctx: string,
): string[] | undefined {
  const value = query[ctx];
  if (value === undefined) {
    return undefined;
  }

  const array = [value].flat();
  if (!array.length) {
    return undefined;
  } else if (array.some(p => typeof p !== 'string')) {
    throw new InputError(`Invalid query parameter ${ctx}, not a string`);
  }

  return array as string[];
}

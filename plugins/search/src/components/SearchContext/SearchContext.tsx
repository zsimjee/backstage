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

import { JsonObject } from '@backstage/types';
import { useApi, AnalyticsContext } from '@backstage/core-plugin-api';
import { SearchQuery, SearchResultSet } from '@backstage/search-common';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import useAsync, { AsyncState } from 'react-use/lib/useAsync';
import usePrevious from 'react-use/lib/usePrevious';
import { searchApiRef } from '../../apis';
import isEqual from 'lodash/isEqual';

type SearchContextValue = {
  result: AsyncState<SearchResultSet>;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  setTypes: React.Dispatch<React.SetStateAction<string[]>>;
  setFilters: React.Dispatch<React.SetStateAction<JsonObject>>;
  toggleModal: () => void;
  setPageCursor: React.Dispatch<React.SetStateAction<string | undefined>>;
  fetchNextPage?: React.DispatchWithoutAction;
  fetchPreviousPage?: React.DispatchWithoutAction;
} & SearchContextInitialState;

type SearchContextInitialState = {
  term: string;
  types: string[];
  filters: JsonObject;
  open?: boolean;
  pageCursor?: string;
};

export const SearchContext = createContext<SearchContextValue | undefined>(
  undefined,
);

export const SearchContextProvider = ({
  initialState = {
    term: '',
    pageCursor: undefined,
    filters: {},
    types: [],
  },
  children,
}: PropsWithChildren<{ initialState?: SearchContextInitialState }>) => {
  const query = useCachedSearchQuery();
  const [pageCursor, setPageCursor] = useState(initialState.pageCursor);
  const [filters, setFilters] = useState(initialState.filters);
  const [term, setTerm] = useState(initialState.term);
  const [types, setTypes] = useState(initialState.types);
  const [open, setOpen] = useState(false);
  const toggleModal = useCallback(
    (): void => setOpen(prevState => !prevState),
    [],
  );

  const prevTerm = usePrevious(term);

  const result = useAsync(
    () =>
      query({
        term,
        filters,
        pageCursor: pageCursor,
        types,
      }),
    [term, filters, types, pageCursor],
  );

  const hasNextPage =
    !result.loading && !result.error && result.value?.nextPageCursor;
  const hasPreviousPage =
    !result.loading && !result.error && result.value?.previousPageCursor;
  const fetchNextPage = useCallback(() => {
    setPageCursor(result.value?.nextPageCursor);
  }, [result.value?.nextPageCursor]);
  const fetchPreviousPage = useCallback(() => {
    setPageCursor(result.value?.previousPageCursor);
  }, [result.value?.previousPageCursor]);

  useEffect(() => {
    // Any time a term is reset, we want to start from page 0.
    if (term && prevTerm && term !== prevTerm) {
      setPageCursor(undefined);
    }
  }, [term, prevTerm, initialState.pageCursor]);

  const value: SearchContextValue = {
    result,
    filters,
    setFilters,
    open,
    toggleModal,
    term,
    setTerm,
    types,
    setTypes,
    pageCursor,
    setPageCursor,
    fetchNextPage: hasNextPage ? fetchNextPage : undefined,
    fetchPreviousPage: hasPreviousPage ? fetchPreviousPage : undefined,
  };

  return (
    <AnalyticsContext attributes={{ searchTypes: types.sort().join(',') }}>
      <SearchContext.Provider value={value} children={children} />
    </AnalyticsContext>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchContextProvider');
  }
  return context;
};

export function useCachedSearchQuery() {
  const searchApi = useApi(searchApiRef);

  const cache = useRef<SearchResultSet | undefined>();
  const lastRequest = useRef<SearchQuery | undefined>();

  return async ({
    isPrevious,
    ...query
  }: SearchQuery & { isPrevious?: boolean }) => {
    const result = await searchApi.query(query);
    if (
      !isEqual(lastRequest.current?.filters, query.filters) ||
      lastRequest.current?.term !== query.term ||
      lastRequest.current.types?.join(',') !== query.types?.join(',') ||
      isPrevious
    ) {
      cache.current = undefined;
    }
    cache.current = {
      ...result,
      results: [...(cache.current?.results || []), ...result.results],
    };
    lastRequest.current = query;

    return cache.current;
  };
}

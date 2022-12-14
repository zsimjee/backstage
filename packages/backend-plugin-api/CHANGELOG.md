# @backstage/backend-plugin-api

## 0.2.0-next.4

### Minor Changes

- a025190552: **BREAKING**: All service interfaces are now suffixed with `*Service`.

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.17.0-next.3
  - @backstage/backend-tasks@0.4.0-next.3

## 0.2.0-next.3

### Patch Changes

- Updated dependencies
  - @backstage/backend-tasks@0.4.0-next.3
  - @backstage/plugin-permission-common@0.7.2-next.2
  - @backstage/backend-common@0.17.0-next.3
  - @backstage/config@1.0.5-next.1

## 0.2.0-next.2

### Minor Changes

- 884d749b14: **BREAKING**: All core service references are now exported via a single `coreServices` object. For example, the `loggerServiceRef` is now accessed via `coreServices.logger` instead.

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.17.0-next.2
  - @backstage/backend-tasks@0.4.0-next.2
  - @backstage/config@1.0.5-next.1
  - @backstage/plugin-permission-common@0.7.2-next.1

## 0.1.5-next.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.17.0-next.1
  - @backstage/backend-tasks@0.4.0-next.1
  - @backstage/config@1.0.5-next.1
  - @backstage/plugin-permission-common@0.7.2-next.1

## 0.1.5-next.0

### Patch Changes

- d6dbf1792b: Added initial support for registering shutdown hooks via `lifecycleServiceRef`.
- Updated dependencies
  - @backstage/backend-common@0.16.1-next.0
  - @backstage/plugin-permission-common@0.7.2-next.0
  - @backstage/backend-tasks@0.3.8-next.0
  - @backstage/config@1.0.5-next.0

## 0.1.4

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.16.0
  - @backstage/backend-tasks@0.3.7
  - @backstage/plugin-permission-common@0.7.1
  - @backstage/config@1.0.4

## 0.1.4-next.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.16.0-next.1
  - @backstage/backend-tasks@0.3.7-next.1
  - @backstage/config@1.0.4-next.0
  - @backstage/plugin-permission-common@0.7.1-next.0

## 0.1.4-next.0

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.16.0-next.0
  - @backstage/backend-tasks@0.3.7-next.0
  - @backstage/plugin-permission-common@0.7.1-next.0
  - @backstage/config@1.0.4-next.0

## 0.1.3

### Patch Changes

- 28377dc89f: Allow interfaces to be used for inferred option types.
- a35a27df70: Added documentation for `createBackendModule`, with guidelines for choosing a module ID.
- Updated dependencies
  - @backstage/backend-common@0.15.2
  - @backstage/backend-tasks@0.3.6
  - @backstage/plugin-permission-common@0.7.0
  - @backstage/config@1.0.3

## 0.1.3-next.2

### Patch Changes

- Updated dependencies
  - @backstage/backend-tasks@0.3.6-next.2
  - @backstage/backend-common@0.15.2-next.2
  - @backstage/plugin-permission-common@0.7.0-next.2
  - @backstage/config@1.0.3-next.2

## 0.1.3-next.1

### Patch Changes

- a35a27df70: Added documentation for `createBackendModule`, with guidelines for choosing a module ID.
- Updated dependencies
  - @backstage/backend-common@0.15.2-next.1
  - @backstage/backend-tasks@0.3.6-next.1
  - @backstage/config@1.0.3-next.1
  - @backstage/plugin-permission-common@0.6.5-next.1

## 0.1.3-next.0

### Patch Changes

- 28377dc89f: Allow interfaces to be used for inferred option types.
- Updated dependencies
  - @backstage/backend-common@0.15.2-next.0
  - @backstage/backend-tasks@0.3.6-next.0
  - @backstage/config@1.0.3-next.0
  - @backstage/plugin-permission-common@0.6.5-next.0

## 0.1.2

### Patch Changes

- 2c57c0c499: Made `ApiRef.defaultFactory` internal.
- 91eed37a39: Updated `createBackendPlugin` and `createBackendModule` to properly forward lack of options.
- 409ed984e8: Service are now scoped to either `'plugin'` or `'root'` scope. Service factories have been updated to provide dependency instances directly rather than factory functions.
- eef91a2558: Simplified the `ServiceFactory` type and removed `AnyServiceFactory`.
- 854ba37357: The `createServiceFactory` method has been updated to return a higher-order factory that can accept options.
- 68513f169a: When defining a new `ServiceRef` you can now also include a `defaultFactory`, which will be used to construct instances of the service in case there is no explicit factory defined.
- Updated dependencies
  - @backstage/backend-common@0.15.1
  - @backstage/backend-tasks@0.3.5
  - @backstage/config@1.0.2
  - @backstage/plugin-permission-common@0.6.4

## 0.1.2-next.2

### Patch Changes

- 409ed984e8: Service are now scoped to either `'plugin'` or `'root'` scope. Service factories have been updated to provide dependency instances directly rather than factory functions.
- 854ba37357: The `createServiceFactory` method has been updated to return a higher-order factory that can accept options.
- Updated dependencies
  - @backstage/config@1.0.2-next.0
  - @backstage/plugin-permission-common@0.6.4-next.2
  - @backstage/backend-common@0.15.1-next.3
  - @backstage/backend-tasks@0.3.5-next.1

## 0.1.2-next.1

### Patch Changes

- 2c57c0c499: Made `ApiRef.defaultFactory` internal.
- 91eed37a39: Updated `createBackendPlugin` and `createBackendModule` to properly forward lack of options.
- Updated dependencies
  - @backstage/backend-common@0.15.1-next.2
  - @backstage/plugin-permission-common@0.6.4-next.1

## 0.1.2-next.0

### Patch Changes

- eef91a2558: Simplified the `ServiceFactory` type and removed `AnyServiceFactory`.
- 68513f169a: When defining a new `ServiceRef` you can now also include a `defaultFactory`, which will be used to construct instances of the service in case there is no explicit factory defined.
- Updated dependencies
  - @backstage/backend-common@0.15.1-next.0
  - @backstage/backend-tasks@0.3.5-next.0
  - @backstage/plugin-permission-common@0.6.4-next.0

## 0.1.1

### Patch Changes

- 0599732ec0: Refactored experimental backend system with new type names.
- 34c2f5aca1: The factory returned by `createBackendPlugin` and `createBackendModule` no longer require a parameter to be passed if the options are optional.
- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/backend-tasks@0.3.4

## 0.1.1-next.0

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0-next.0
  - @backstage/backend-tasks@0.3.4-next.0

## 0.1.0

### Minor Changes

- 91c1d12123: Introduced new package for creating backend plugins using the new alpha backend plugin framework.
  This package is still considered **EXPERIMENTAL** and things will change without warning. Do not use this for production.

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.14.1
  - @backstage/plugin-permission-common@0.6.3
  - @backstage/backend-tasks@0.3.3

## 0.1.0-next.0

### Minor Changes

- 91c1d12123: Introduced new package for creating backend plugins using the new alpha backend plugin framework.
  This package is still considered **EXPERIMENTAL** and things will change without warning. Do not use this for production.

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.14.1-next.3
  - @backstage/plugin-permission-common@0.6.3-next.1
  - @backstage/backend-tasks@0.3.3-next.3

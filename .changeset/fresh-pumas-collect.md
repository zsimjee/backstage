---
'@backstage/backend-common': patch
'@backstage/config-loader': patch
'@backstage/plugin-auth-backend': patch
'@backstage/plugin-badges-backend': patch
'@backstage/plugin-bitrise': patch
'@backstage/plugin-catalog-backend': patch
'@backstage/plugin-catalog-backend-module-msgraph': patch
'@backstage/plugin-code-coverage-backend': patch
'@backstage/plugin-fossa': patch
'@backstage/plugin-jenkins-backend': patch
'@backstage/plugin-pagerduty': patch
'@backstage/plugin-scaffolder-backend': patch
'@backstage/plugin-scaffolder-backend-module-cookiecutter': patch
'@backstage/plugin-sonarqube': patch
'@backstage/plugin-splunk-on-call': patch
'@backstage/plugin-tech-insights-backend': patch
'@backstage/plugin-techdocs-backend': patch
'@backstage/plugin-todo-backend': patch
---

Migrate to `node-fetch` v3, and align on usage of `cross-fetch` vs `node-fetch` in frontend vs backend packages. Remove some unnecessary imports of either one of them as well.

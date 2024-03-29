/*
* Dear Developer,
* the variables here should all be configurable via environment variables.
* Please define new variables here: environments.base.ts
* */
import { environmentsBase } from "./environments.base";

export const environment = {
  production: true,
  ...environmentsBase
};

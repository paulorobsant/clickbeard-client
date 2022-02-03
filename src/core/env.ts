import { get } from "lodash";

export const getEnv = (path: string, defaultValue: any = null) => get(process.env, path, defaultValue);
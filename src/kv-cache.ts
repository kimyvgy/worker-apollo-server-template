import { KeyValueCacheSetOptions } from "@apollo/utils.keyvaluecache";
import { KeyValueCache } from "apollo-server-core";

export default class KVCache implements KeyValueCache {
  async get(key: string) {
    const value = await GRAPHQL_CACHE.get(key);
    return value === null ? undefined : value;
  }

  set(key: string, value: string, options?: KeyValueCacheSetOptions) {
    const opts: KVNamespacePutOptions = {};

    if (options) {
      opts.expirationTtl = options.ttl || undefined;
    }

    return GRAPHQL_CACHE.put(key, value, opts);
  }

  delete(key: string) {
    return GRAPHQL_CACHE.delete(key);
  }
}

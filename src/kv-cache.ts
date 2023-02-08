import type { KeyValueCacheSetOptions, KeyValueCache } from "@apollo/utils.keyvaluecache";
import type { KVNamespacePutOptions } from "@cloudflare/workers-types";

export class KVCache implements KeyValueCache {
  async get(key: string) {
    const value = await GRAPHQL_CACHE.get(key);
    return value === null ? undefined : value;
  }

  set(key: string, value: string, options?: KeyValueCacheSetOptions) {
    const opts: KVNamespacePutOptions = {};

    if (options) {
      opts.expirationTtl = Number(options.ttl) < 60 ? Number(options.ttl) : undefined;
    }

    return GRAPHQL_CACHE.put(key, value, opts);
  }

  delete(key: string) {
    return GRAPHQL_CACHE.delete(key);
  }
}

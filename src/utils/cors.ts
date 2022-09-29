import { CorsOptions } from "~/handlers/apollo"

const setCorsHeaders = (response: Response, options?: CorsOptions) => {
  response.headers.set(
    'Access-Control-Allow-Credentials',
    options?.allowCredentials || 'true',
  );

  response.headers.set(
    'Access-Control-Allow-Headers',
    options?.allowHeaders || 'application/json, Content-type',
  );

  response.headers.set(
    'Access-Control-Allow-Methods',
    options?.allowMethods || 'GET, POST',
  );

  response.headers.set(
    'Access-Control-Allow-Origin',
    options?.allowOrigin || '*',
  );

  response.headers.set('X-Content-Type-Options', 'nosniff');
}

export default setCorsHeaders;

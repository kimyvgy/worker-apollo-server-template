const handleRequest = async (request: Request) => {
  const url = new URL(request.url);
  const currentValue = await counter.get(url.pathname) || 0;
  const newValue = +currentValue + 1;

  await counter.put(url.pathname, newValue.toString());

  return new Response(`Your counter: ${newValue}`);
};

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

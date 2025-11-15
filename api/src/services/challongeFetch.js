const challongeFetch = async (route, method, body, extra_headers) => {
  console.log(route, method, body, extra_headers)
  const auth_header = "Basic " + Buffer.from(`knuckles240:${process.env.CHALLONGE_API_KEY}`).toString("base64");

  const default_headers = {
    "Content-Type": "application/json",
    Authorization: auth_header,
    credentials: "include",
  };

  const url = `https://api.challonge.com/v1/${route}`;
  const response = await fetch(url, {
    method,
    headers: {
      ...default_headers,
      ...(extra_headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const result = await response.json();
  return result;
};

module.exports = { challongeFetch };

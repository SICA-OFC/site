const challongeFetch = async (route, method, extra_headers, body) => {
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
  res.status(response.status).send(result);
};

module.exports = { challongeFetch };

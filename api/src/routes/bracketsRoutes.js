const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/authToken");
const catchAsync = require("../middlewares/catchAsync");

router.use(authToken);
router.post(
  "/",
  catchAsync(async (req, res) => {
    const auth_header =
      "Basic " + Buffer.from(`knuckles240:${process.env.CHALLONGE_API_KEY}`).toString("base64");

    const default_headers = {
      "Content-Type": "application/json",
      Authorization: auth_header,
    };

    const { route, method, extra_headers, body } = req.body;

    const url = `https://api.challonge.com/v1/${route}`;

    const response = await fetch(url, {
      method,
      headers: {
        ...default_headers,
        ...(extra_headers || {})
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const result = await response.json();
    res.status(response.status).send(result);
  })
);

module.exports = router;

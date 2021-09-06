const { default: axios } = require("axios");

const express = require("express"),
  router = express.Router();

router.get("/items", (req, res) => {
  const { from, to } = req.query;

  axios
    .get("https://run.mocky.io/v3/05e9651d-528e-4d7c-a60b-bae8f09684c6")
    .then((response) => {
      let result = response.data.products.slice(from, to);

      res.send(result);
    });
});
router.post("/getProduct", (req, res) => {
  axios
    .get("https://run.mocky.io/v3/05e9651d-528e-4d7c-a60b-bae8f09684c6")
    .then((response) => {
      let result = response.data.products.filter((el) => {
        return req.body.body.includes(el.productId);
      });

      res.send(result);
    });
});

module.exports = router;

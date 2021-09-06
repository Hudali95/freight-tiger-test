const { default: axios } = require("axios");

const express = require("express"),
  router = express.Router();

router.get("/items", (req, res) => {
  const { from, to } = req.query;
  console.log(req.query);
  axios
    .get("https://run.mocky.io/v3/05e9651d-528e-4d7c-a60b-bae8f09684c6")
    .then((response) => {
      let result = response.data.products.slice(from, to);

      res.send(result);
    });
});
router.get("/getProduct", (req, res) => {
  axios
    .get("https://run.mocky.io/v3/05e9651d-528e-4d7c-a60b-bae8f09684c6")
    .then((response) => {
      let result = response.data.products.filter(
        (el) => el.productId === req.query.productId
      );
      console.log(result);

      res.send(result[0]);
    });
});

module.exports = router;

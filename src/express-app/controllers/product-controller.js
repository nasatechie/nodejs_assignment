import { productModel } from "../../database/db-props";
import Joi from "joi";
function getAllProducts(request, response) {
  response.header("Content-Type", "application/json");
  productModel.findAll().then(products => response.send(products));
}

function addProduct(request, response) {
  response.header("Content-Type", "application/json");
  const { name, brand, price, reviews } = request.body;

  const schema = Joi.object().keys({
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    brand: Joi.string()
      .min(3)
      .max(30)
      .required(),
    price: Joi.number()
      .integer()
      .max(10000)
      .required(),
    reviews: Joi.array()
  });

  const productData = {
    name,
    brand,
    price,
    reviews
  };

  Joi.validate(productData, schema, function(err, value) {
    if (!err) {
      productModel
        .create(productData)
        .then(data => {
          console.log("data is:", data);
          response.status(201).json({ message: "Product Added Successfully" })
        })
        .catch(error => {
          response
            .status(400)
            .json({ error: `${error.errors[0].path} is missing` });
        });
    } else {
      response.status(400).json({ error: err.details[0].message });
    }
  });
}

export default { getAllProducts, addProduct };

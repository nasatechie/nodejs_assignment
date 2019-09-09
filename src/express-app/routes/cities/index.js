import express from "express";
import * as cityController from "../../controllers/cities-controller";

const citiesRouter = express.Router();

citiesRouter
  .get("/", (request, response) => {
    cityController.getAllCities(request, response);
  })
  .post("/", (request, response) => {
    cityController.addCity(request, response);
  })
  .put("/:id", (request, response) => {
    cityController.updateCity(request, response);
  })
  .delete("/:id", (request, response) => {
    cityController.deleteCity(request, response);
  });

export default citiesRouter;

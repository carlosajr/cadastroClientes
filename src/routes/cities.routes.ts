import { Router } from "express";
import { getCustomRepository } from 'typeorm';

import CitiesRepository from "../repositories/CitiesRepository";
import CreateCityService from "../services/createCityService";
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const citiesRouter = Router();

citiesRouter.use(ensureAuthenticated)

citiesRouter.get('/', async (request, response) => {
  const citiesRepository = getCustomRepository(CitiesRepository);
  const cities = await citiesRepository.find();

  return response.json(cities);
})

citiesRouter.post('/', async (request, response) => {
  const createCityService = new CreateCityService();

  const { name, state_id } = request.body;

  const city = await createCityService.execute({ name, state_id });

  return response.json(city);
})

export default citiesRouter;

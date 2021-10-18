import { uuid } from 'uuidv4';

import FakeClientsRepository from '@modules/clients/repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import ListClientsService from './ListClientsService';

let listClientsService: ListClientsService;
let createClientService: CreateClientService;
let id: string;

describe('ListClients', () => {
  beforeAll(async () => {
    const fakeCitiesRepository = new FakeClientsRepository();
    listClientsService = new ListClientsService(fakeCitiesRepository);
    createClientService = new CreateClientService(fakeCitiesRepository);

    id = uuid();

    await createClientService.execute({
      name: 'Test Name',
      gender: 'male',
      birthDate: new Date(),
      city_id: id,
    });

    await createClientService.execute({
      name: 'Test Name Two',
      gender: 'male',
      birthDate: new Date(),
      city_id: id,
    });

    await createClientService.execute({
      name: 'Test Name Three',
      gender: 'female',
      birthDate: new Date(),
      city_id: id,
    });

    await createClientService.execute({
      name: 'Different Name',
      gender: 'female',
      birthDate: new Date(),
      city_id: uuid(),
    });
  })

  it('should list all clients', async () => {
    const clients = await listClientsService.execute({})

    expect(clients).toBeInstanceOf(Array);
    expect(clients).toHaveLength(4);
  })

  it('should list all clients by the city', async () => {
    const clients = await listClientsService.execute({ city_id: id })

    expect(clients).toBeInstanceOf(Array);
    expect(clients).toHaveLength(3);
  })

  it('should list all clients by the name like pattern', async () => {
    const clients = await listClientsService.execute({ name: 'Test' })

    expect(clients).toBeInstanceOf(Array);
    expect(clients).toHaveLength(3);
  })

  it('should list all clients by the gender', async () => {
    const clients = await listClientsService.execute({ gender: 'female' })

    expect(clients).toBeInstanceOf(Array);
    expect(clients).toHaveLength(2);
  })

  it('should list all clients by the name, gender and city', async () => {
    const clients = await listClientsService.execute({ name: 'Test', gender: 'male', city_id: id })

    expect(clients).toBeInstanceOf(Array);
    expect(clients).toHaveLength(2);
  })
})
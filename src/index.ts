import csv from 'csv-parser';
import express from 'express';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { AppDataSource, connectDB } from './db';
import { FoodProvider } from './db/entity';

const app = express();
const port = 3000;

const main = async () => {
  app.use(express.json());

  const foodProviderRepository = AppDataSource.getRepository(FoodProvider);

  app.get('/', async (req, res) => {
    const {
      query: { limit, skip },
    } = req;

    const limitParam = limit ? parseInt(limit as string) : 100;
    const skipParam = skip ? parseInt(skip as string) : 0;

    const [providers, total] = await foodProviderRepository.findAndCount({
      take: limitParam,
      skip: skipParam,
    });

    res.json({
      data: providers,
      total,
      skip: skipParam,
      limit: limitParam,
    });
  });

  app.post('/data/seed', (req, res) => {
    const foodProviderRepository = AppDataSource.getRepository(FoodProvider);

    try {
      const results: FoodProvider[] = [];

      fs.createReadStream('Mobile_Food_Facility_Permit.csv')
        .pipe(csv())
        .on('data', (data) =>
          results.push(
            foodProviderRepository.create({
              id: uuid(),
              locationId: data.locationid,
              name: data.Applicant,
              type: data.FacilityType,
              address: data.Address,
              permitNumber: data.permit,
              permitStatus: data.Status,
              foodItems: data.FoodItems,
              latitude: data.Latitude,
              longitude: data.Longitude,
              hours: data.dayshours,
              permitExpiration: data.ExpirationDate,
            })
          )
        )
        .on('end', async () => {
          console.log('successfully parsed csv');
          await foodProviderRepository.save(results);
        });
    } catch (error) {
      throw error;
    }

    res.json({ message: 'successfully seeded data' });
  });

  await connectDB();

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

main();

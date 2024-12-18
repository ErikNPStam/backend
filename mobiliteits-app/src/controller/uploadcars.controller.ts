import * as express from 'express';
import { UploadCarService } from '../business/service/uploadCar.service';
import { CarsModel } from '../business/model/car.model';

export class UploadCarsController {
    constructor(private uploadCarService: UploadCarService) {}

    public async uploadCar(req: express.Request, res: express.Response): Promise<void> {
        const { licensePlate, brand, model, transmission, buildYear, fuelType, mileage } = req.body;
        const carImage = req.file;

        if (!carImage) {
            console.error('No car image provided');
            res.status(404).json({ error: 'Image is required' });
            return;
        }

        try {
            const newCar = new CarsModel(
                licensePlate,
                model,
                brand,
                transmission,
                Number(mileage),
                Number(buildYear),
                fuelType,
                `http://localhost:3002/uploads/${carImage.filename}`
            );

            const result = await this.uploadCarService.uploadCar(newCar);
            res.status(200).json({ success: true, car: result });
        } catch (validationError) {
            if (validationError instanceof Error) {
                if (['licensePlate', 'model', 'brand', 'transmission', 'mileage', 'build year', 'fuel type'].includes(validationError.message)) {
                    res.status(400).json({ field: validationError.message });
                } else {
                    console.error('Server error:', validationError);
                    res.status(500).json({ error: 'Server error' });
                }
            }
        }
    }
}

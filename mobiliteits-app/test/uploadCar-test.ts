import { expect } from 'chai'; 
import { describe, it, beforeEach } from 'mocha';
import tssinon from 'sinon';
import { UploadCarService } from '../src/business/service/uploadCar.service'; 
import { CarsModel } from '../src/business/model/car.model'; 
import { UploadCars } from '../src/data/interfaces/uploadCarDatabase';

describe('UploadCarService', () => { 
  let uploadCarService: UploadCarService;
  let mockUploadCarsDatabase: tssinon.SinonStubbedInstance<UploadCars>; 

  beforeEach(() => { 
    mockUploadCarsDatabase = {
      uploadCar: tssinon.stub()
    } as tssinon.SinonStubbedInstance<UploadCars>;

    uploadCarService = new UploadCarService(mockUploadCarsDatabase);
  });

  it('should validate car data and upload car to the database', async () => { 
    const validCarData = new CarsModel(
      'ABC123',
      'Corolla',
      'Toyota', 
      'Automatic',
      15000,
      2020,
      'Petrol',
      'http://localhost:3002/uploads/car.jpg' 
    );

    mockUploadCarsDatabase.uploadCar.resolves(validCarData);

    const result = await uploadCarService.uploadCar(validCarData);

    expect(result).to.deep.equal(validCarData);
    expect(mockUploadCarsDatabase.uploadCar.calledOnceWith(validCarData)).to.be.true;
  });

  it('should throw validation error if car data is invalid', async () => { 
    const invalidCarData = new CarsModel(
      'abc123', 
      'Corolla', 
      '',
      'Automatic', 
      15000,
      2020, 
      'Petrol', 
      'http://localhost:3002/uploads/car.jpg'
    );

    try {
      await uploadCarService.uploadCar(invalidCarData);
      expect.fail('Expected error was not thrown');
    } catch (error: any) {
      expect(error.message).to.equal('brand');
    }
  });
});



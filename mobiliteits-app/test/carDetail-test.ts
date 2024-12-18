import { expect } from 'chai';
import supertest from "supertest";
import { AppBuilder } from "../src/creation/builders/app.builder";
import { Routes } from "../src/creation/enums/routes";
import { CarDetailService } from "../src/business/service/carDetail.service";
import { CarDetailController } from "../src/controller/carDetail.controller";
import { CarDetailControllerSingleton } from "../src/creation/controllers/carDetailController.singleton";
import { CardetailMysqlDatabase } from "../src/data/databases/CardetailMysqlDatabase";
import { SessionManager } from "../src/middleware/SessionManager";
import { EmissionCalculator } from "../src/Util/emissionCalculator";
import { CarModel } from "../src/business/model/carDetail.model";
import sinon from 'sinon';
import { CarDetailBusinessModel } from '../src/data/convert/CardetailBusinessConverter';

// unit test for image URL validation in CarModel
describe('CarModel', () => {
  it('should create a new instance of CarModel with valid carImage URL', () => {
    const carImageURL = 'https://media.discordapp.net/attachments/1222131677711826958/1239904742789091388/download.jpg?ex=66449ec6&is=66434d46&hm=5f6f26f1f26fe2ebada2a88d70355f9bbae3905ff9b51240a114052bbcc006a0&=&format=webp&width=414&height=273';

    const car = new CarModel(
      'AB-123-CD',
      'Model S',
      'Tesla',
      'Automatic',
      50000,
      2020,
      'Electric',
      carImageURL
    );

    expect(car).to.be.an.instanceOf(CarModel);
    expect(car.carImage).to.equal(carImageURL);
  });


  // Integration test for the Car Detail API
  const mockCarModel = new CarModel(
    "ABC123",
    "Civic",
    "Honda",
    "Automatic",
    50000,
    2020,
    "Petrol",
    "https://media2.autokopen.nl/auto/honda-civic-type-r-2824-1-a69be11b-1920.jpg"
  );

  const mockCarId = 'ABC123';

  describe("Car Detail API Integration Test", () => {
    let app: any;
    let agent: any;

    before(async () => {
      const appBuilder = AppBuilder.getInstance();
      appBuilder.setPort(3001);
      appBuilder.addRouter(Routes.USER);

      app = appBuilder.buildApp();
      app.attachCors();
      app.attachHeaders();
      app.attachEncoder();
      app.attachRouters();

      const carDetailConverter = new CarDetailBusinessModel();
      const carDetailDatabase = new CardetailMysqlDatabase();
      const carDetailService = new CarDetailService(carDetailDatabase);
      const controller = new CarDetailController(carDetailService);

      CarDetailControllerSingleton.getInstance().controller = controller;

      app.listen();

      // Mock session data
      SessionManager.sessions['test'] = {
        userEmail: "user2@example.com",
        userRole: 'user',
        expirationDate: new Date('2025-12-17')
      };

      agent = supertest.agent(app.getApp());
      agent.jar.setCookie(`session=test`);
    });

    after(async () => {
      app.close();
    });

    it('should return car images correctly from the API', async () => {
      // Mock the database call inside the controller
      sinon.stub(CardetailMysqlDatabase.prototype, 'getCardetails').resolves(mockCarModel);

      // Make a request to the API endpoint
      const res = await agent.get(`/user/cardetail/${mockCarId}`);

      // Assert that the response status code is 202 OK
      expect(res.status).to.equal(202);

      // Assert that the response body is the expected car model
      expect(res.body).to.deep.equal(mockCarModel);

      // Restore the stubbed method
      (CardetailMysqlDatabase.prototype.getCardetails as sinon.SinonStub).restore();
    });
  })
});

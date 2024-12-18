import { Op, WhereOptions } from "sequelize";
import { GetCarsDatabase } from "../interfaces/CarDatabase";
import { CarBusinessConverter } from "../convert/carBusinessConverter";
import CarSequelize from "../models/car.model";
import { CarsModel } from "../../business/model/car.model";




/**
 * Implements the GetCarsDatabase interface using Sequelize for ORM-based database interaction.
 * This class provides functionality to retrieve all cars from the database using Sequelize's ORM methods.
 * @class
 * @implements {GetCarsDatabase}
 * @author Mohammad Yusufi
 * 
 * @param {CarBusinessConverter} carConverter - Converter to transform raw data objects into CarsModel instances.
 *
 */
export class CarsSequelize implements GetCarsDatabase{

    private returValues: CarsModel[] = [];
    private returnValue: CarsModel | null = null;

    constructor(private carConverter: CarBusinessConverter ){

    }

    public async searchCars(brand: string, model?: string, fuelType?: string): Promise<CarsModel[]> {
        try {
            // Object for where clausule
            const searchCriteria: any = {};
    
            if (brand) {
                searchCriteria.brand = {
                    [Op.like]: `%${brand}%`
                }
            } 
            
            if (model) {
                searchCriteria.model = {
                    [Op.like]: `%${model}%`
                };
            }
            if (fuelType) {
                searchCriteria.fuel_type = {
                    [Op.like]: `%${fuelType}%`
                };
            }
    
            // finds all cars(findAll())
            const cars = await CarSequelize.findAll({
                where: searchCriteria
            });
    
            return this.carConverter.createCars(cars);
    
        } catch (error) {
            console.error("Error during searchCars:", error);
            throw new Error("Error searching Cars: " + error);
        }
    }

    public async getAllCars(): Promise<CarsModel[]>{
        const results = await CarSequelize.findAll();
        this.returValues = this.carConverter.createCars(results);
        console.log(this.returValues)
        return this.returValues
    }
    
}
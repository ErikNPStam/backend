import { STRING } from 'sequelize';
import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'car',
    timestamps: false
})
export default class CarSequelize extends Model {
    @Column({
        type: DataType.STRING,
        primaryKey: true
    })
    declare license_plate: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare model: string;

    @Column(DataType.STRING)
    declare brand: string;

    @Column(DataType.STRING)
    declare transmission: string;

    @Column(DataType.INTEGER)
    declare mileage: number;

    @Column(DataType.INTEGER)
    declare build_year: number;

    @Column(DataType.STRING)
    declare fuel_type: string;

    @Column(DataType.STRING)
    declare carImage: string;
}

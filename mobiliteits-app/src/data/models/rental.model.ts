import { Table, Model, Column, DataType, PrimaryKey, BelongsTo } from 'sequelize-typescript';

@Table({
    tableName: 'rental',
    timestamps: false
})
export default class RentalSequelizeModel extends Model {
    @PrimaryKey
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare license_plate: string;

    @PrimaryKey
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare rental_date: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare date_of_return: Date;

    @PrimaryKey
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare email: string;

}

import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    ForeignKey,
    AllowNull,
    BelongsTo
  } from "sequelize-typescript";
  import JourneySequelize from "./journey.model";
  import CarSequelize from "./car.model";
  
  @Table({ tableName: "vehicle_journey", timestamps: false })
  export default class VehicleJourneySequelize extends Model {
    @PrimaryKey
    @ForeignKey(() => JourneySequelize)
    @Column({ type: DataType.DATE })
    journey_created_at!: Date;
  
    @PrimaryKey
    @ForeignKey(() => JourneySequelize)
    @Column({ type: DataType.STRING })
    journey_email!: string;
  
    @ForeignKey(() => CarSequelize)
    @Column({ type: DataType.STRING })
    car_license_plate!: string | null;
  
    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    passengers!: number;
  
    @AllowNull(false)
    @Column({ type: DataType.STRING })
    fuel_type!: string;
  
    @BelongsTo(() => JourneySequelize, { foreignKey: 'journey_created_at' })
    journeyCreatedAt!: JourneySequelize;
  
    @BelongsTo(() => JourneySequelize, { foreignKey: 'journey_email' })
    journeyEmail!: JourneySequelize;
  
    @BelongsTo(() => CarSequelize, { foreignKey: 'car_license_plate' })
    car!: CarSequelize;
  }
  
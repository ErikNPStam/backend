import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";

@Table({ tableName: "journey_type", timestamps: false })
export default class JourneyTypeSequelize extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  name!: string;
}

import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";

@Table({ tableName: "transport_type", timestamps: false })
export default class TransportTypeSequelize extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  name!: string;
}

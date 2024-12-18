import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";

@Table({ tableName: "account_type", timestamps: false })
export default class AccountTypeSequelize extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  name!: string;
}

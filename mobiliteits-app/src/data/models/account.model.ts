import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
} from "sequelize-typescript";
import AccountTypeSequelize from "./accountType.model";

@Table({ tableName: "account", timestamps: false })
export default class AccountSequelize extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  email!: string;

  @Column({ type: DataType.STRING })
  firstname!: string;

  @Column({ type: DataType.STRING })
  tussenvoegsel!: string | null;

  @Column({ type: DataType.STRING })
  lastname!: string;

  @Column({ type: DataType.STRING })
  account_type_name!: string;

  @ForeignKey(() => AccountTypeSequelize)
  @Column
  account_type!: string;
}

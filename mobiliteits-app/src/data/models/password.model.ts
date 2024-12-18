import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import UserSequelize from "./account.model";

/**
 * @author Joey
 */

@Table({
  tableName: 'password',
  timestamps: false
})

export default class PasswordSequelize extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    primaryKey: true
  })
  hash!: string;

  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => UserSequelize)
  @Column({ type: DataType.STRING })
  email!: string;

  @Column({ type: DataType.DATE })
  created_at!: Date;
}

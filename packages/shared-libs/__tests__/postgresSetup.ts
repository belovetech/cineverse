import { Table, Model, DataType, Column } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ type: DataType.STRING })
  email: string | undefined;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string | undefined;
}

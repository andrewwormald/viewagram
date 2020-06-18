import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DataType
} from 'sequelize-typescript';


@Table
export class FeedItem extends Model<FeedItem> {
  @Column
  public caption!: string;

  @Column
  public url!: string;

  @Column
  public owner!: string;

  @Column
  public likeCount: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  public comments: string[];

  @Column
  @CreatedAt
  public createdAt: Date = new Date();

  @Column
  @UpdatedAt
  public updatedAt: Date = new Date();
}

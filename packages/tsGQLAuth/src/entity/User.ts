import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  @Column("integer", { nullable: true })
  age?: number;

  @Field({ nullable: true })
  @Column("boolean", { nullable: true, default: false })
  admin?: boolean | false;

  @Field({ nullable: true })
  @Column("boolean", { nullable: true, default: false })
  analyst?: boolean | false;

  @Field({ nullable: true })
  @Column("boolean", { nullable: true, default: false })
  supervisor?: boolean | false;

  @Column()
  password: string;
}



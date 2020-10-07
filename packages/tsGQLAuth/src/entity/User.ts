import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text", { unique: true, })
  email: string;

  @Field()
  @Column("text", { nullable: true })
  firstName?: string;

  @Field()
  @Column("text", { nullable: true })
  lastName?: string;

  @Field()
  @Column("integer", { nullable: true })
  age?: number;

  @Field()
  @Column("boolean", { nullable: true })
  admin?: boolean;

  @Field()
  @Column("boolean", { nullable: true })
  analyst?: boolean;

  @Field()
  @Column("boolean", { nullable: true })
  supervisor?: boolean;

  @Column()
  password: string;
}



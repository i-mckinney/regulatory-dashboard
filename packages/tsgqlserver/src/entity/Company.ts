import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

//Specify class decorators for type-graphql here
@ObjectType()
@Entity()
export class Company extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  address1: string;

  @Field()
  @Column()
  address2: string;

  @Field()
  @Column()
  companyType: string;

  @Field()
  @Column()
  startDate: string;

  @Field()
  @Column()
  phoneNumber: string;

  @Field(() => Int)
  @Column("int", { default: 50 })
  employees: number;
}

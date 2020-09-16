import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Field, Int, ObjectType, ID } from "type-graphql";
import { EmployeeEmployer } from "./EmployeeEmployer";

//Specify class decorators for type-graphql here
@ObjectType()
@Entity()
export class Company extends BaseEntity {
  //()=> Int is specifying type for DB. simple types like string can be inferred
  @Field(() => ID)
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

  @OneToMany(() => EmployeeEmployer, (employer) => employer.company)
  userConnection: Promise<EmployeeEmployer[]>;
}

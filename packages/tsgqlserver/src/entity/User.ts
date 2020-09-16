import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import { EmployeeEmployer } from "./EmployeeEmployer";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  age: number;

  @OneToMany(() => EmployeeEmployer, (employer) => employer.user)
  companyConnection: Promise<EmployeeEmployer[]>;
}

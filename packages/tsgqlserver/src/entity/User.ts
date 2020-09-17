import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Field, ObjectType, ID, Ctx } from "type-graphql";
import { EmployeeEmployer } from "./EmployeeEmployer";
import { Company } from "./Company";
import { MyContext } from "../types/MyContext";

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

  @Field(() => [Company])
  async companies(@Ctx() { companyLoader }: MyContext): Promise<Company[]> {
    return companyLoader.load(this.id);
  }
}

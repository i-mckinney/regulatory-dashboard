import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { Company } from "./Company";
import { User } from "./User";

@Entity()
export class EmployeeEmployer extends BaseEntity {
  @PrimaryColumn()
  companyId: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => Company, (company) => company.userConnection, {
    primary: true,
  })
  @JoinColumn({ name: "companyId" })
  company: Promise<Company>;

  @ManyToOne(() => User, (user) => user.companyConnection, {
    primary: true,
  })
  @JoinColumn({ name: "userId" })
  user: Promise<User>;
}

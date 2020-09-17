import { Resolver, Mutation, Arg, Int } from "type-graphql";
import { Company } from "../entity/Company";
import { EmployeeEmployer } from "../entity/EmployeeEmployer";
import { User } from "../entity/User";

@Resolver()
export class EmployeeEmployerResolver {
  @Mutation(() => String)
  async addEmployee(
    @Arg("userId", () => Int) userId?: number,
    @Arg("companyId", () => Int) companyId?: number
  ) {
    await EmployeeEmployer.create({ userId, companyId }).save();
    return "added employeeId: " + userId + "to CompanyId:" + companyId;
  }

  @Mutation(() => String)
  async deleteUser(@Arg("userId", () => Int) userId: number) {
    await EmployeeEmployer.delete({ userId });
    await User.delete({ id: userId });
  }

  @Mutation(() => String)
  async deleteCompany(@Arg("companyId", () => Int) companyId: number) {
    await EmployeeEmployer.delete({ companyId });
    await Company.delete({ id: companyId });
  }
}

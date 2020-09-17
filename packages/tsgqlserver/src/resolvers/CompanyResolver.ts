import {
  Resolver,
  Mutation,
  Arg,
  Int,
  Query,
  InputType,
  Field,
} from "type-graphql";
import { Company } from "../entity/Company";
import { EmployeeEmployer } from "../entity/EmployeeEmployer";

@InputType()
class CompanyInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  address1?: string;

  @Field({ nullable: true, defaultValue: "" })
  address2?: string;

  @Field(() => String, { nullable: true })
  companyType?: string;

  @Field(() => String, { nullable: true })
  startDate?: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  //number cannot be inferred
  @Field(() => Int, { nullable: true })
  employees?: number;
}

@InputType()
class UpdateCompanyInput {
  @Field(() => String, { nullable: true })
  //? denotes that it will allow undefined - aka input is optional
  name?: string;

  @Field(() => String, { nullable: true })
  address1?: string;

  @Field(() => String, { nullable: true })
  address2?: string;

  @Field(() => String, { nullable: true })
  companyType?: string;

  @Field(() => String, { nullable: true })
  startDate?: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  //number cannot be inferred
  @Field(() => Int, { nullable: true })
  employees?: number;
}

//Where we describe our queries
@Resolver()
export class CompanyResolver {
  //Mutations are changes to the db (create, put, delete)
  @Mutation(() => Company)
  async createCompany(
    @Arg("name", () => String) name: string,
    //type-graphql can infer that address 1 is a string like this if same as in Entity
    @Arg("address1") address1: string,
    //setting null arg - sets to empty string if not sent
    @Arg("address2", () => String, { nullable: true, defaultValue: "" })
    address2: string,
    @Arg("companyType", () => String) companyType: string,
    @Arg("startDate", () => String) startDate: string,
    @Arg("phoneNumber", () => String) phoneNumber: string,
    @Arg("employees", () => Int) employees: number
  ) {
    console.log("inserted :" + name);
    const company = await Company.insert({
      name,
      address1,
      address2,
      companyType,
      startDate,
      phoneNumber,
      employees,
    });
    return company;
  }

  @Mutation(() => String)
  async createCompany2(
    @Arg("params", () => CompanyInput) params: CompanyInput
  ) {
    await Company.insert(params);
    return "Inserted: " + JSON.stringify(params);
  }

  @Mutation(() => Boolean)
  async updateCompany(
    @Arg("id", () => Int) id: number,
    @Arg("updateParams", () => UpdateCompanyInput)
    updateParams: UpdateCompanyInput
  ) {
    await Company.update({ id }, updateParams);
    return true;
  }

  @Mutation(() => String)
  async deleteCompany(@Arg("companyId", () => Int) companyId: number) {
    await EmployeeEmployer.delete({ companyId: companyId });
    await Company.delete({ id: companyId });
    return "Deleted company: " + companyId;
  }

  @Query(() => [Company])
  companies() {
    return Company.find();
  }

  @Query(() => Company)
  async company(
    @Arg("id", () => Int) id: number
  ): Promise<Company | undefined> {
    return await Company.find((company) => company.id === id);
  }
}

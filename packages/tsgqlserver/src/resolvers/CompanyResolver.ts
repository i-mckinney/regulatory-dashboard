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

@InputType()
class CompanyInput {
  @Field()
  name: string;

  @Field()
  address1: string;

  @Field({ nullable: true, defaultValue: "" })
  address2: string;

  @Field()
  companyType: string;

  @Field()
  startDate: string;

  @Field()
  phoneNumber: string;

  //number cannot be inferred
  @Field(() => Int)
  employees: number;
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

  @Query(() => [Company])
  companies() {
    return Company.find();
  }
}

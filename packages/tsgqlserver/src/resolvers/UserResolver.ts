import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entity/User";
import { EmployeeEmployer } from "../entity/EmployeeEmployer";

@InputType()
class UserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => Int)
  age: number;
}

@InputType()
class UpdateUserInput {
  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => Int, { nullable: true })
  age?: number;
}

@Resolver()
export class UserResolver {
  @Mutation(() => String)
  async createUser(@Arg("userParams", () => UserInput) userParams: UserInput) {
    await User.insert(userParams);
    return "Inserted: " + JSON.stringify(userParams);
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("updateParams", () => UpdateUserInput)
    updateParams: UpdateUserInput
  ) {
    await User.update({ id }, updateParams);
    return true;
  }

  @Query(() => [User])
  async users() {
    return User.find();
  }

  @Mutation(() => String)
  async deleteUser(@Arg("userId", () => Int) userId: number) {
    await EmployeeEmployer.delete({ userId });
    await User.delete({ id: userId });
  }
}

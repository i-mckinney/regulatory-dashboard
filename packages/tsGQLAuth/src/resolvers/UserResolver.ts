import { Query, Resolver, UseMiddleware, Field, InputType, Int, Mutation, Arg } from "type-graphql";
import { User } from "../entity/User";
import { isAuth } from "../middleware/isAuth";

@InputType()
class UserInput {
  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => Int, { nullable: true })
  age?: number;
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
  @Query(() => [User])
  @UseMiddleware(isAuth)
  async getUsers() {
    return User.find();
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async deleteUser(@Arg("userId", () => Int) userId: number) {
    await User.delete({ id: userId });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("updateParams", () => UpdateUserInput)
    updateParams: UpdateUserInput
  ) {
    await User.update({ id }, updateParams);
    return true;
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async createUser(@Arg("userParams", () => UserInput) userParams: UserInput) {
    await User.insert(userParams);
    return "Inserted: " + JSON.stringify(userParams);
  }


}

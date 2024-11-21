import {Query, Resolver} from "type-graphql";
import User from "../entities/User.entity";
import UserServices from "../services/user.service";

@Resolver()
export default class UserResolver {
    @Query(() => [User])
    async listUsers(): Promise<User[]> {
        return await new UserServices().list();
    }
}
import {Repository} from "typeorm";
import datasource from "../lib/datasource";
import User from "../entities/User.entity";

export default class UserService {
    db: Repository<User>;
    constructor() {
        this.db = datasource.getRepository(User);
    };

    async list(): Promise<User[]> {
        return await this.db.find();
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.db.findOneBy({ email });
        if (!user) {
            return null;
        }
        return user;
    }
}
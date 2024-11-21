import {AuthChecker} from "type-graphql";
import MyContext from "../interfaces/MyContext.interface";

export const customAuthChecker: AuthChecker<MyContext> = ({ context }, roles) => {
    if (!context.user) {
        throw new Error("L'authentification est nécessaire.");
    }
    return true;
};
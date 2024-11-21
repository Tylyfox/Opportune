import express from "express";
import "reflect-metadata";
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import {expressMiddleware} from "@apollo/server/express4";
import {ApolloServer} from "@apollo/server";
import {buildSchema} from "type-graphql";
import * as http from "http";
import cors from "cors";
import datasource from "./lib/datasource";

import {customAuthChecker} from "./lib/authChecker";
import UserResolver from "./resolvers/user.resolver";
import MyContext from "./interfaces/MyContext.interface";
import User from "./entities/User.entity";
import Cookies from "cookies";
import {jwtVerify} from "jose";
import {Payload} from "./interfaces/Payload.interface";
import UserService from "./services/user.service";

const app = express();
const httpServer = http.createServer(app);

/**
 * Main function to initialize and start the Apollo Server with Express.
 */
async function main() {
    // Build GraphQL schema with TypeGraphQL
    const schema = await buildSchema({
        resolvers: [UserResolver],
        validate: false,
        authChecker: customAuthChecker,
    });

    // Create Apollo Server instance
    const server = new ApolloServer<MyContext>({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    // Start Apollo Server
    await server.start();

    // Apply middleware to Express app
    app.use(
        "/",
        cors<cors.CorsRequest>({
            origin: ["http://localhost:3000", "https://studio.apollographql.com"],
            credentials: true,
        }),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req, res }: { req: any, res: any}) => {
                // Handle preflight requests and health checks
                if (req.method === "OPTIONS" || req.url === "/.well-known/apollo/server-health") {
                    return { req, res, user: null };
                }
                try {
                    let user: User | null = null;

                    // Retrieve token from cookies and verify it
                    const cookies = new Cookies(req, res);
                    const token = cookies.get("token");
                    if (token) {
                        const verify = await jwtVerify<Payload>(token, new TextEncoder().encode(process.env.SECRET_KEY));
                        user = await new UserService().findByEmail(verify.payload.email);
                    }

                    return { req, res, user };
                } catch (error) {
                    return { req, res, user: null };
                }
            }
        })
    );

    // Initialize datasource
    await datasource.initialize();

    // Start HTTP server
    await new Promise<void>((resolve) => {
        console.log("server started port 4005");
        httpServer.listen({ port: 4005 }, resolve);
    });
}

// Execute main function and handle errors
main().catch(console.error);
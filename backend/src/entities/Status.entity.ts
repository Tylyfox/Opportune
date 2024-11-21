import {Field, ObjectType} from "type-graphql";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Applications from "./Applications";

@ObjectType()
@Entity()
export default class Status {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column({ unique: true })
    name: string; // Nom du statut (ex : "en attente", "accepté", etc.)

    @Field({ nullable: true })
    @Column({ type: "text", nullable: true })
    description: string; // Description ou explication facultative du statut

    @Field(() => [Applications]) // Relation avec Applications
    @OneToMany(() => Applications, (application) => application.status)
    applications: Applications[];
}

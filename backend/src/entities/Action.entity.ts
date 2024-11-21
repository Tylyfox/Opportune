import {Field, ObjectType} from "type-graphql";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Applications from "./Applications"; // Import de l'entité Applications

@ObjectType()
@Entity()
export default class Actions {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(() => Applications) // Relation avec Applications
    @ManyToOne(() => Applications, (application) => application.actions, { nullable: false, onDelete: "CASCADE" })
    application: Applications;

    @Field()
    @Column()
    action_date: Date;

    @Field()
    @Column({
        type: "enum",
        enum: ["relance", "réponse reçue", "autre"], // Types d'actions possibles
        default: "autre",
    })
    action_type: "relance" | "réponse reçue" | "autre";

    @Field({ nullable: true })
    @Column({ type: "text", nullable: true })
    details: string; // Détails spécifiques à l'action
}

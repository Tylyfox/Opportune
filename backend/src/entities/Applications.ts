import {Field, ObjectType} from "type-graphql";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import User from "./User.entity";
import Status from "./Status.entity";
import Action from "./Action.entity";

@ObjectType()
@Entity()
export default class Applications {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    company_name: string;

    @Field()
    @Column()
    position: string;

    @Field()
    @Column()
    application_date: Date;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.applications, { nullable: false, onDelete: "CASCADE" })
    user: User;

    @Field(() => Status) // Relation avec Status
    @ManyToOne(() => Status, (status) => status.applications, { nullable: false })
    status: Status;

    @Field(() => [Action]) // Relation avec Actions
    @OneToMany(() => Action, (action) => action.application, { cascade: true })
    actions: Action[];
}
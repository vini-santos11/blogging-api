import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base/entity";

@Entity()
export class Events extends BaseEntity {
    @Column("text")
    name: string;

    @Column("text", {nullable: true})
    description: string;

    @Column("date")
    startDate: Date;

    @Column("date")
    endDate: Date;
}
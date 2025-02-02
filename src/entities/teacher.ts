import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base/entity";
import { SchoolSupplies } from "./school-supplies";

@Entity()
export class Teacher extends BaseEntity {
    @Column("text")
    name: string;

    @Column("text", {nullable: true})
    email: string;

    @Column("text")
    phone: string;

    @OneToMany(() => SchoolSupplies, schoolSupplies => schoolSupplies.teacher)
    schoolSupplies: SchoolSupplies[];
}
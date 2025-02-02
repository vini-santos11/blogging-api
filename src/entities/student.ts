import { Column, Entity, JoinColumn, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "./base/entity";
import { SchoolSupplies } from "./school-supplies";

@Entity()
export class Student extends BaseEntity {
    @Column("text")
    name: string;

    @Column("text", {nullable: true})
    email: string;

    @Column("text")
    phone: string;

    @Column("text")
    identifier: string;

    @ManyToMany(() => SchoolSupplies, schoolSupplies => schoolSupplies.students)
    @JoinTable({
        name: 'student_school_supplies',
        joinColumn: {
            name: 'student_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'school_supplies_id',
            referencedColumnName: 'id'
        },
    })
    schoolSupplies: SchoolSupplies[];
}
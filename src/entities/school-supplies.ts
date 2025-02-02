import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { Teacher } from "./teacher";
import { Student } from "./student";
import { BaseEntity } from "./base/entity";

@Entity()
export class SchoolSupplies extends BaseEntity {
    @Column("text")
    name: string;

    @Column("text", {nullable: true})
    description: string;

    @Column("text")
    identifier: string;

    @ManyToOne(() => Teacher, teacher => teacher.schoolSupplies)
    @JoinColumn({name: 'teacher_id'})
    teacher: Teacher;

    @ManyToMany(() => Student, student => student.schoolSupplies)
    students: Student[];
}
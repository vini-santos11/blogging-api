import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base/entity";

@Entity()
export class User extends BaseEntity {
    @Column("text")
    username: string

    @Column("text")
    password: string
}
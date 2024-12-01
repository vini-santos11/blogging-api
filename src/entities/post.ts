import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base/entity";

@Entity()
export class Post extends BaseEntity {
    @Column("text")
    title: string;

    @Column("text")
    content: string;

    @Column("text")
    author: string;

    @Column("text")
    updatedBy: string;
}
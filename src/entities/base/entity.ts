import { PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}

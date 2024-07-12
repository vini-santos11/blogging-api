import { Column, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "timestamp", default: new Date()})
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}

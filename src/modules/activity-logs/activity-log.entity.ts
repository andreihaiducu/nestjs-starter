import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ApiModelProperty } from "@nestjs/swagger";
@Entity('activity_logs')
export class ActivityLog {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({type:'text'})
    oldValue: string

    @Column({type:'text'})
    newValue: string

    @Column()
    field: string

}

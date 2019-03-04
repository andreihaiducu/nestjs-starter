import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    last_name: string;

    @Column()
    first_name: string;

    @Column()
    role: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ type: 'datetime', nullable: true })
    last_login: string

    @Column({ nullable: true })
    token: string

    @CreateDateColumn()
    create_date: Date
}
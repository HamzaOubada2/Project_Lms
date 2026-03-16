import { Exclude } from "class-transformer";
import { UserRole } from "src/constants/UserRole";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;


    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.STUDENT,
    })
    role: UserRole;

    @Column({ nullable: true })
    avatar: string;

    @Column({ default: true })
    isActive: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
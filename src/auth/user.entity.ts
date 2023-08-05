import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    password : string;

    @Column()
    username : string;

    @OneToMany(type => Board, board => board.user, {eager:true})
    boards:Board[]
}
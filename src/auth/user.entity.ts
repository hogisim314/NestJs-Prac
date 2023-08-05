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

    @OneToMany(type => Board, board => board.user, {eager:true})//type은 그 column의 타입, board->는 board를 접근할 때 어떻게 접근할 것인지..(board entity의 user로 접근), eager는 user를 부르면 board가 따라서 불러지냐 라는 말.
    boards:Board[]
}
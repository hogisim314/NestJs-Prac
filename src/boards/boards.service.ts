import { Injectable, NotFoundException } from '@nestjs/common';
import {BoardStatus } from './board-status.enum';
import {v1 as uuid} from 'uuid'
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    constructor(@InjectRepository(BoardRepository)
        private boardRepository :BoardRepository) {}

    // getAllBoards() : Board[] {
    //     return this.boards;
    // }

    createBoard(createBoardDto : CreateBoardDto) : Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    async getBoardById(id:number) : Promise<Board> {
        const found = await this.boardRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`can't find board with id ${id}`)
        }
        return found;
    }
    async deleteBoard(id:number) : Promise<void> {
        const result = await this.boardRepository.delete(id);

        if (result.affected ===0) {
            throw new NotFoundException(`can't find board with id ${id}`);
        } 
    }

    async updateBoardStatus(id:number, status : BoardStatus) : Promise<Board> {
        const board =await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);

        return board;

    }

    async getAllBoards() : Promise<Board[]> {
        return await this.boardRepository.find();
    }
}

const myPromise = new Promise((resolve, reject)=> {
    setTimeout(()=>{
        reject(new Error());
    }, 1000);
})

myPromise.then(n=>{
    console.log(n);
}).catch(error => {
    console.log(error);
})

function fetchUser() {
    var url = 'https://jsonplaceholder.typicode.com/users/1'
    return fetch(url).then(function(response) {
      return response.json();
    });
  }
  
  function fetchTodo() {
    var url = 'https://jsonplaceholder.typicode.com/todos/1';
    return fetch(url).then(function(response) {
      return response.json();
    });
  }

  async function logTodoTitle() {
    try {
        var user = await fetchUser();
        if (user.id===1) {
            var todo = await fetchTodo();
            console.log(todo.title);
        }
    } catch(error) {
        console.log(error);
    }
  }
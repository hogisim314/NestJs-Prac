import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { create } from 'domain';
import { getFileInfo } from 'prettier';
import { Board } from './board.entity';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './board-status.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardService:BoardsService) {}

    // @Get() 
    // getAllBoard():Board[] {
    //     return this.boardService.getAllBoards();
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto : CreateBoardDto) : Promise<Board> {
        return this.boardService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id:number):Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    @Delete('/:id')
    delteBoardById(@Param('id', ParseIntPipe) id:number) : Promise<void> {
        return this.boardService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id : number,
        @Param('status', BoardStatusValidationPipe) status : BoardStatus) : Promise<Board> {
        return this.boardService.updateBoardStatus(id,status);
    }

    @Get()
    getAllTask() : Promise<Board[]> {
        return this.boardService.getAllBoards();
    }
}
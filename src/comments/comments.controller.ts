import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDTO } from './dto/create-comment.dto';
@Controller('comments')
export class CommentsController {
  constructor(private commentServ: CommentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() data: CreateCommentDTO, @Request() req) {
    return this.commentServ.create(data, req.user.id);
  }
}

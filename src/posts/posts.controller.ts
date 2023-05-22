import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { UpdatePostDTO } from './dto/update-post.dto';
import { GetPostDTO } from './dto/get-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postServ: PostsService) {}

  @Get()
  async getAll(@Query() query: GetPostDTO): Promise<any> {
    return await this.postServ.getAll(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() post: CreatePostDTO, @Request() req) {
    // create a new post and return the newly created post
    return await this.postServ.create(post, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdatePostDTO,
    @Request() req,
  ) {
    // update a post and return the updated post
    return await this.postServ.update(+id, req.user.id, data);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { COMMENT_REPOSITORY } from '../core/constants';
import { Comment } from './comment.entity';
import { CreateCommentDTO } from './dto/create-comment.dto';
@Injectable()
export class CommentsService {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: typeof Comment,
  ) {}

  create(comment: CreateCommentDTO, userId: number) {
    return this.commentRepository.create({
      ...comment,
      userId,
    });
  }
}

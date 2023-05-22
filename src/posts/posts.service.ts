import { Injectable, Inject } from '@nestjs/common';
import { POST_REPOSITORY } from 'src/core/constants';
import { Post } from './post.entity';
import { UpdatePostDTO } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: typeof Post,
  ) {}

  create(post, userId) {
    return this.postRepository.create({
      ...post,
      userId,
    });
  }

  async update(id: number, userId: number, data: UpdatePostDTO) {
    if (!Object.keys(data).length) {
      return {};
    }

    await this.postRepository.update(
      { ...data },
      { where: { id, userId }, returning: true },
    );

    return {
      success: true,
    };
  }
}

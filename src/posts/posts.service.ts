import { Injectable, Inject } from '@nestjs/common';
import { POST_REPOSITORY } from '../core/constants';
import { Post } from './post.entity';
import { UpdatePostDTO } from './dto/update-post.dto';
import { GetPostDTO } from './dto/get-post.dto';
import { User } from 'src/users/user.entity';
import { Op } from 'sequelize';

@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: typeof Post,
  ) {}

  async getAll(query: GetPostDTO) {
    let sqlQuery = {};
    if (Object.keys(query).length) {
      if (query.title) {
        sqlQuery = {
          ...sqlQuery,
          title: {
            [Op.like]: `%${query.title}%`,
          },
        };
      }

      if (query.body) {
        sqlQuery = {
          ...sqlQuery,
          body: {
            [Op.like]: `%${query.body}%`,
          },
        };
      }

      if (query.userId) {
        sqlQuery = {
          ...sqlQuery,
          userId: query.userId,
        };
      }
    }

    // Pagination
    const pageNumber = query.page || 1;
    const limitForPage = query.limit || 5;
    const startIndex = (pageNumber - 1) * limitForPage;
    const endIndex = pageNumber * limitForPage;

    const total = await this.getTotalNumberOfPosts(sqlQuery);

    const pagination: any = {};
    if (endIndex < total) {
      pagination.next = {
        page: pageNumber + 1,
        limit: query.limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: pageNumber - 1,
        limit: query.limit,
      };
    }

    const data = await this.postRepository.findAll({
      where: {
        ...sqlQuery,
      },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
      order: [['createdAt', 'DESC']],
      offset: startIndex,
      limit: limitForPage,
    });

    return {
      total,
      count: data.length,
      pagination,
      data: data,
    };
  }

  private getTotalNumberOfPosts(sqlQuery: any) {
    return this.postRepository.count({
      where: {
        ...sqlQuery,
      },
    });
  }

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

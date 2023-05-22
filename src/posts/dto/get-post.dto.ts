import { IsNotEmpty, MinLength, IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetPostDTO {
  @IsOptional()
  readonly title: string;

  @IsOptional()
  readonly body: string;

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  readonly userId: number;

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  page: number;

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  limit: number;
}

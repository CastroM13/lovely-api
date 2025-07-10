import { Controller, Get, Post, Body, Param, Patch, Delete, Req, BadRequestException } from '@nestjs/common';
import { MediaService } from './media.service';
import { UserToken } from './interfaces/user-token/user-token.interface';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  create(@Body() createDto: any) {
    return this.mediaService.create(createDto);
  }

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(':imdbId')
  findOneByImdbId(@Param('imdbId') imdbId: string) {
    return this.mediaService.findOneByImdbId(imdbId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.mediaService.update(id, updateDto);
  }

  @Patch(':imdbID/review')
  async addOrUpdateReview(
    @Param('imdbID') imdbID: string,
    @Body('review') review: string,
    @Body('remark') remark: number,
    @Req() req: UserToken
  ) {
    return this.mediaService.addOrUpdateReview(imdbID, req.user.token.toLocaleLowerCase(), review, remark);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
} 
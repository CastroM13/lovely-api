import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel('Media') private readonly mediaModel: Model<any>,
  ) {}

  async create(createDto: any) {
    const created = new this.mediaModel(createDto);
    return created.save();
  }

  async findAll() {
    return this.mediaModel.find().exec();
  }

  async findOne(id: string) {
    const doc = await this.mediaModel.findById(id).exec();
    if (!doc) throw new NotFoundException('Media not found');
    return doc;
  }

  async findOneByImdbId(imdbID: string) {
    const doc = await this.mediaModel.findOne({ imdbID }).exec();
    if (!doc) throw new NotFoundException('Media not found');
    return doc;
  }

  async update(id: string, updateDto: any) {
    const updated = await this.mediaModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Media not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.mediaModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Media not found');
    return deleted;
  }

  async addOrUpdateReview(imdbID: string, user: string, review?: string, remark?: number) {
    console.log(imdbID, user, review, remark);
    const update: any = {};
    if (review !== undefined) update[`Reviews.${user}`] = review;
    if (remark !== undefined) update[`Remarks.${user}`] = remark;
    if (Object.keys(update).length === 0) throw new Error('No review or remark provided');
    const updated = await this.mediaModel.findOneAndUpdate(
      { imdbID },
      { $set: update },
      { new: true }
    ).exec();
    if (!updated) throw new NotFoundException('Media not found');
    return updated;
  }
} 
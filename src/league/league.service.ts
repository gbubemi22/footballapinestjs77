import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginateDto } from '../common/dto/paginate-sort-dto';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { League, LeagueDocument } from './schema/league.schema';

@Injectable()
export class LeagueService {
  leagues: any;
  constructor(
    @InjectModel(League.name) private leagueModel: Model<LeagueDocument>,
  ) {}
  async create(createLeagueDto: CreateLeagueDto): Promise<League> {
    const newLeague = new this.leagueModel(createLeagueDto);
    return newLeague.save();
  }

  async findAllLeagues(paginateDTO: PaginateDto): Promise<any> {
    const count: number = await this.leagueModel.countDocuments().exec();
    const docs: League[] = await this.leagueModel
      .find()
      .skip(paginateDTO.skip)
      .limit(paginateDTO.limit)
      .sort({ [paginateDTO.sortBy]: paginateDTO.sortOrder })
      .exec();

    return { count, docs };
  }

  async findOne(id: string): Promise<League> {
    const leagueId = await this.leagueModel.findById({ _id: id });
    if (!leagueId) {
      throw new HttpException(
        `League with id ${leagueId}not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    // return await this.leagueModel.findById({ _id: id }).exec();
    console.log(leagueId);
    return leagueId;
  }

  async update(id: string, updateLeagueDto: UpdateLeagueDto): Promise<League> {
    const leagueId = await this.leagueModel.findOne({ id });
    if (!leagueId) {
      throw new HttpException(
        `League with id ${leagueId}not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.leagueModel.findByIdAndUpdate(id, updateLeagueDto, {
      new: true,
    });
  }

  async deleteOne(id: string): Promise<boolean> {
    const leagues = await this.findAllLeagues({
      skip: 0,
      limit: 0,
      sortBy: '',
      sortOrder: 0,
    });
    this.leagues = leagues.filter((league) => league.id != id);

    return leagues.length != this.leagues.length;
  }

  // async deleteOne(id: string): boolean {
  //   const leagues = this.leagueModel.findOne({ id });
  //   this.league = leagues.filter((league) => league.id !== id);
  //   if(!leagues.length) {
  //     throw new HttpException(
  //              `League with id ${leagues}not found`,
  //            HttpStatus.NOT_FOUND,

  //   );
  // }
  // return await this.leagueModel.findOneAndRemove({ id }).exec();
}

// async deleteOne(id: string): Promise<League[]> {
//   const leagueId = await this.findOne(id);
//   this.leagueId.filter((league) => league.id !== id);

//   if (!leagueId) {
//     throw new HttpException(
//       `League with id ${leagueId}not found`,
//       HttpStatus.NOT_FOUND,
//     );
//   }

//   return await this.leagueModel.deleteOne({ leagueId }).exec();
// }

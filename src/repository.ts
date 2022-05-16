/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose'
import { PaginateDto } from 'src/common/dto/paginate-sort-dto';
import { CreateTeamDto } from '../dto/create-team.dto';
import { Teams, TeamsDocument } from '../schema/team.schema';
import { UpdateTeamDto } from '../dto/update-team.dto';

@Injectable()
export class TeamsRepository {
  constructor(
    @InjectModel(Teams.name) private teamsModel: Model<TeamsDocument>,
  ) {}

  async create(teamCreateDTO: CreateTeamDto): Promise<Teams> {
    const newTeam = new this.teamsModel(teamCreateDTO);
    return await newTeam.save();
  }

  async findAll(paginateDTO: PaginateDto): Promise<any> {
    const count: number = await this.teamsModel.countDocuments().exec();
    const docs: Teams[] = await this.teamsModel
      .find()
      .skip(paginateDTO.skip)
      .limit(paginateDTO.limit)
      .sort({ [paginateDTO.sortBy]: paginateDTO.sortOrder })
      .exec();
    return { count, docs };
      
  }


  async findOne(id: string): Promise<Teams> {
      return await this.teamsModel.findOne({_id: id })
  }
  
  async findAllByLeague(league: any, paginateDTO: PaginateDto): Promise<any> {
    const count: number = await this.teamsModel
      .countDocuments({ league })
      .exec();
    const docs: Teams[] = await this.teamsModel
      .find({ league })
      .skip(paginateDTO.skip)
      .limit(paginateDTO.limit)
      .sort({ [paginateDTO.sortBy]: paginateDTO.sortOrder })
      .exec();
    return { count, docs };

}
  async update(teamupdateDTO:UpdateTeamDto): Promise<Teams> {
    return await this.teamsModel
      .findOneAndUpdate({_id: teamupdateDTO.team}, { ...teamupdateDTO },
     { new: true })
      .exec();
    
  }

  async delete(id: string): Promise<boolean> {
    const objId = await this.teamsModel.findOne({id});

  const result = await this.teamsModel.deleteOne({_id: objId}).exec();
  console.log(result)
  return (result.deletedCount > 0, true)
}

}
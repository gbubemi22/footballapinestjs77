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
  [x: string]: any;
  constructor(
    @InjectModel(Teams.name) private teamsModel: Model<TeamsDocument>
  ) {}

  async create(teamCreateDTO: CreateTeamDto): Promise<Teams> {
    const newTeam = new this.teamsModel(teamCreateDTO);
    return await newTeam.save();
  }

  async findAll(): Promise<Teams[]> {
   
   return await this.teamsModel.find({})   
  }


  async findOne(id: string): Promise<Teams> {
      return await this.teamsModel.findOne({_id: id }).populate('league').exec()
  }
  
 
  async update(id: string, teamupdateDTO:UpdateTeamDto): Promise<Teams> {
    return await this.teamsModel
      .findOneAndUpdate({_id: id}, { ...teamupdateDTO },
     { new: true })
      .exec();
    
  }

  async delete(id: string) {
    const objId = await this.teamsModel.findOne({id});

  return await this.teamsModel.deleteOne({_id: objId});
  // return (result.filter(res => res.ok === 1).length > 0);
  
}

    


}
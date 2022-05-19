/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player, PlayerDocument } from '../schema/player.schema';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';

@Injectable()
export class PlayersRepository {
  constructor(
    @InjectModel(Player.name) private playersModel: Model<PlayerDocument>
  ) {}

  async findAll(): Promise<Player[]> {
    return await this.playersModel.find().populate('team');
  }

  async create(playerCreateDTO: CreatePlayerDto): Promise<Player> {
    const newPlayer = new this.playersModel(playerCreateDTO);
    return await newPlayer.save();
  }

 async findOne(id: string): Promise<Player> {
    return this.playersModel.findOne({ _id: id }).populate('team')
  }

async update(id: string, playerupdateDTO: UpdatePlayerDto): Promise<Player> {
  return await this.playersModel
  .findOneAndUpdate({ _id: id }, { ...playerupdateDTO },
  { new: true })
  .exec();
}

async deleteOne(id: string) { 
const playerId = await this.playersModel.findOne({_id: id});

return await this.playersModel.deleteOne({_id: playerId});

}

}

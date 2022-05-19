import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayersRepository } from './repository/player.repository';
import { Player } from './schema/player.schema';

@Injectable()
export class PlayersService {
  constructor(private playersRepository: PlayersRepository) {}
  async create(createPlayerDto: CreatePlayerDto) {
    return await this.playersRepository.create(createPlayerDto);
  }

  async findAll(): Promise<Player[]> {
    return await this.playersRepository.findAll();
  }

  async findOne(id: string): Promise<Player> {
    const player = this.playersRepository.findOne(id);
    if (!player) {
      throw new HttpException('Player does not exist!', HttpStatus.NOT_FOUND);
    }
    return player;
  }

  update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const player = this.playersRepository.findOne(id);
    if (!player) {
      throw new HttpException('Player does not exist!', HttpStatus.NOT_FOUND);
    }
    return this.playersRepository.update(id, updatePlayerDto);
  }

  async remove(id: string): Promise<any> {
    const result = await this.playersRepository.findOne(id);
    if (result.length === 0) {
    }
    return false;
  }
}

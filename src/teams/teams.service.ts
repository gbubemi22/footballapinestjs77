import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamsRepository } from './repository/repository';
import { Teams } from './schema/team.schema';

@Injectable()
export class TeamsService {
  constructor(private teamsRepository: TeamsRepository) {}

  async create(createTeamDto: CreateTeamDto) {
    return await this.teamsRepository.create(createTeamDto);
  }

  async findAll(): Promise<Teams[]> {
    return await this.teamsRepository.findAll();
  }

  async findOne(id: string): Promise<Teams> {
    const team = this.teamsRepository.findOne(id);
    if (!team) {
      throw new HttpException('Team does not exist!', HttpStatus.NOT_FOUND);
    }
    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Teams> {
    const team = await this.teamsRepository.findOne(id);
    if (!team) {
      throw new HttpException('Team does not exist!', HttpStatus.NOT_FOUND);
    }
    return this.teamsRepository.update(id, updateTeamDto);
  }

  async remove(id: string): Promise<any> {
    const result = await this.teamsRepository.findOne(id);
    if (result.length === 0) {
    }
    return false;
  }
}

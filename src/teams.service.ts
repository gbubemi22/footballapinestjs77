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
    return await this.teamsRepository.findAll({
      skip: 0,
      limit: 0,
      sortBy: '',
      sortOrder: 0,
    });
  }

  async findAllByLeague() {
    return await this.teamsRepository.findAll({
      skip: 0,
      limit: 0,
      sortBy: '',
      sortOrder: 0,
    });
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
    return this.teamsRepository.update(updateTeamDto);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.teamsRepository.delete(id);
    if (!result) {
      throw new HttpException('Team does not exist!', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}

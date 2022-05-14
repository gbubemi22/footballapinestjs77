import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LeagueService } from './league.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { PaginateDto } from 'src/common/dto/paginate-sort-dto';

@Controller('league')
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  @Post()
  async create(@Body() createLeagueDto: CreateLeagueDto) {
    await this.leagueService.create(createLeagueDto);
    return createLeagueDto;
  }

  @Get()
  async findAll(@Query() paginateSortDto: PaginateDto): Promise<any> {
    console.log(`paginateDTO: ${JSON.stringify(paginateSortDto)}`);

    return await this.leagueService.findAllLeagues(paginateSortDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.leagueService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeagueDto: UpdateLeagueDto) {
    return this.leagueService.update(id, updateLeagueDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.leagueService.deleteOne(id);
  }
}

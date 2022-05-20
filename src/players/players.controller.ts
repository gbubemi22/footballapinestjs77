import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './schema/player.schema';
import { Roles } from 'src/users/roles.decorator';
import { Role } from 'src/users/user.enum';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @Roles(Role.ADMIN)
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Player> {
    return this.playersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @Roles(Role.SUPER_ADMIN)
  removeOne(@Param('id') id: string) {
    return this.playersService.remove(id);
  }
}

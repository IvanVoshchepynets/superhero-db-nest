import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @Body() data: CreateSuperheroDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    // Лог для дебагу
    console.log('POST body:', data);
    console.log('Uploaded file:', file);

    const imageFilename = file ? file.filename : undefined;
    return await this.superheroesService.create(data, imageFilename);
  }

  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    return await this.superheroesService.findAll(
      Number(page) || 1,
      Number(limit) || 5,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.superheroesService.findOne(Number(id));
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() data: UpdateSuperheroDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const imageFilename = file ? file.filename : undefined;
    return await this.superheroesService.update(
      Number(id),
      data,
      imageFilename,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.superheroesService.remove(Number(id));
  }
}

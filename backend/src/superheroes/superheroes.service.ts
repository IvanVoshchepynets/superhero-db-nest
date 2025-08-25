import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';

@Injectable()
export class SuperheroesService {
  private prisma = new PrismaClient();

  async create(data: CreateSuperheroDto, imageFilename?: string) {
    // Якщо superpowers приходить рядком, перетворюємо у масив
    let superpowers: string[] = [];
    if (typeof data.superpowers === 'string') {
      try {
        superpowers = JSON.parse(data.superpowers);
      } catch {
        superpowers = [];
      }
    } else if (Array.isArray(data.superpowers)) {
      superpowers = data.superpowers;
    }

    const hero = await this.prisma.superhero.create({
      data: {
        nickname: data.nickname,
        real_name: data.real_name,
        origin_description: data.origin_description,
        superpowers,
        catch_phrase: data.catch_phrase,
        images: imageFilename
          ? { create: [{ url: imageFilename }] }
          : undefined,
      },
      include: { images: true },
    });

    return hero;
  }

  async findAll(page: number = 1, limit: number = 5) {
    const skip = (page - 1) * limit;
    const items = await this.prisma.superhero.findMany({
      skip,
      take: limit,
      include: { images: true },
    });
    const total = await this.prisma.superhero.count();
    return { items, page, limit, total };
  }

  async findOne(id: number) {
    const hero = await this.prisma.superhero.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!hero) throw new NotFoundException('Superhero not found');
    return hero;
  }

  async update(id: number, data: UpdateSuperheroDto, imageFilename?: string) {
    let superpowers: string[] = [];
    if (typeof data.superpowers === 'string') {
      try {
        superpowers = JSON.parse(data.superpowers);
      } catch {
        superpowers = [];
      }
    } else if (Array.isArray(data.superpowers)) {
      superpowers = data.superpowers;
    }

    const hero = await this.prisma.superhero.update({
      where: { id },
      data: {
        nickname: data.nickname,
        real_name: data.real_name,
        origin_description: data.origin_description,
        superpowers,
        catch_phrase: data.catch_phrase,
        images: imageFilename
          ? { create: [{ url: imageFilename }] }
          : undefined,
      },
      include: { images: true },
    });

    return hero;
  }

  async remove(id: number) {
    await this.prisma.image.deleteMany({ where: { superheroId: id } });
    return this.prisma.superhero.delete({ where: { id } });
  }
}

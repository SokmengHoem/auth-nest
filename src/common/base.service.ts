import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DeepPartial, Repository } from "typeorm";


@Injectable()
export class BaseService<T> {

    constructor(private readonly baseRepository: Repository<T>){}

    async findAll(): Promise<T[]> {
        return await this.baseRepository.find();
    }

    async findOne(id: string): Promise<T | null> {
        const data = await await this.baseRepository.findOneBy({id} as any);
        if(!data){
            throw new NotFoundException(`Resource #${id} not found`);
        }
        return data;
    }

    async create(data: DeepPartial<T>): Promise<T> {
        const entity = this.baseRepository.create(data);
        if(!entity){
            throw new BadRequestException('Resource can not created');
        }
        return await this.baseRepository.save(entity);
    }

    async update(id: string, data: DeepPartial<T>): Promise<T | null>  {
        const dataDB = await this.findOne(id);
        const newData = await this.baseRepository.save({
            ...dataDB,
            ...data
        });
        return newData;
    }

    async remove(id:string): Promise<void> {
        await this.baseRepository.delete(id);
    }

    async softDelete(id: string): Promise<void> {
        await this.baseRepository.softDelete(id);
    }

    async restore(id: string): Promise<void> {
        await this.baseRepository.restore(id);
    }
}
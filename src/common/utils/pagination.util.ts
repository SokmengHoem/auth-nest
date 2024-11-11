import { Repository, SelectQueryBuilder } from "typeorm";
import { PaginatedResponse, PaginationParams } from "../interfaces/paginated.interface";


export async function paginate<T>(
    repository: Repository<T>,
    paginationParams: PaginationParams,
    message = 'Data retrieved successfully',
): Promise<PaginatedResponse<T>> {
    const {page, limit, sortBy, sortOrder, filters, min, max} = paginationParams;

    const queryBuilder: SelectQueryBuilder<T> = repository.createQueryBuilder('entity');

    //Apply filters
    if(filters) {
        Object.entries(filters).forEach(([field, value]) => {
            queryBuilder.andWhere(`entity.${field} = :${field}`, {[field]: value});
        });
    }

    //Apply minimum constraints
    if(min) {
        Object.entries(min).forEach(([field, value]) => {
            queryBuilder.andWhere(`entity.${field} >= :min_${field}`, {[`min_${field}`]: value});
        });
    }

    //Apply maximum constraints
    if(max) {
        Object.entries(max).forEach(([field, value]) => {
            queryBuilder.andWhere(`entity.${field} <= :max_${field}`, {[`max_${field}`]: value});
        });
    }

    //Apply Sorting
    if(sortBy) {
        queryBuilder.orderBy(`entity.${sortBy}`, sortOrder || 'ASC');
    }

    //Apply pagination
    queryBuilder.skip((page -1) * limit).take(limit);

    //Execute the query and get data with total count
    const [data, totalItems] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(totalItems/ limit);

    return {
        statusCode:200,
        message,
        data,
        meta: {
            totalItems,
            page,
            limit,
            totalPages
        }
    }
}
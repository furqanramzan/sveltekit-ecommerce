import { and, desc, eq, like, sql } from 'drizzle-orm';
import type { InferModel, SQL } from 'drizzle-orm';
import { BaseRepository, type GetMany } from './base-repository';
import { products } from '$lib/server/database/schema';

type Product = typeof products;
export type Create = InferModel<Product, 'insert'>;
interface GetManyWithFilter {
  name?: string;
  category?: number;
}

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(products);
  }

  async getManyWithCategory({ limit, offset }: GetMany) {
    const items = await this.drizzle.query.products.findMany({
      limit,
      offset,
      columns: {
        id: true,
        name: true,
        quantity: true,
        price: true,
        image: true,
      },
      with: { category: { columns: { id: true, name: true } } },
      orderBy: desc(this.table.createdAt),
    });
    const total = await this.count();
    return { items, total };
  }

  async getManyWithFilter(
    { limit, offset }: GetMany,
    { category, name }: GetManyWithFilter,
  ) {
    let where: SQL<unknown> | undefined;
    if (name && category) {
      where = and(
        like(this.table.name, `%${name}%`),
        eq(this.table.categoryId, category),
      );
    } else if (name) {
      where = like(this.table.name, `%${name}%`);
    } else if (category) {
      where = eq(this.table.categoryId, category);
    }

    const items = await this.drizzle.query.products.findMany({
      limit,
      offset,
      where,
      columns: {
        id: true,
        name: true,
        quantity: true,
        price: true,
        image: true,
      },
      orderBy: desc(this.table.createdAt),
    });
    const data = await this.drizzle
      .select({ count: sql<number>`count(${this.table.id})` })
      .from(this.table)
      .where(where);

    return { items, total: data[0].count };
  }

  getAllById(ids: number[]) {
    return this.getAllByInColumn(this.table.id, ids);
  }

  async create(values: Create) {
    const result = await this.drizzle.insert(this.table).values(values);

    return this.createResponse(result);
  }

  async createMany(values: Create[]) {
    const result = await this.drizzle.insert(this.table).values(values);

    return this.createManyResponse(result);
  }

  async update(values: Create, id: number) {
    const result = await this.drizzle
      .update(this.table)
      .set(values)
      .where(eq(this.table.id, id));

    return this.updateResponse(result, id);
  }
}

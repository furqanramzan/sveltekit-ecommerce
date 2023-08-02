import { type InferModel, eq } from 'drizzle-orm';
import { BaseRepository, type GetMany } from './base-repository';
import { products } from '$lib/server/database/schema';

type Product = typeof products;
export type Create = InferModel<Product, 'insert'>;

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(products);
  }

  async getPaginatedItems({ limit, offset }: GetMany) {
    const items = await this.drizzle.query.products.findMany({
      limit,
      offset,
      columns: { id: true, name: true, quantity: true, price: true, image: true },
      with: { category: { columns: { id: true, name: true } } },
    });
    const total = await this.count();
    return { items, total };
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
    const result = await this.drizzle.update(this.table).set(values).where(eq(this.table.id, id));

    return this.updateResponse(result, id);
  }
}

import { type InferModel, eq } from 'drizzle-orm';
import { BaseRepository } from './base-repository';
import { products } from '$lib/server/database/schema';

type Product = typeof products;
type Create = InferModel<Product, 'insert'>;

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(products);
  }

  async create(values: Create) {
    const result = await this.drizzle.insert(this.table).values(values);

    return this.createResponse(result);
  }

  async update(values: Create, id: number) {
    const result = await this.drizzle.update(this.table).set(values).where(eq(this.table.id, id));

    return this.updateResponse(result, id);
  }
}

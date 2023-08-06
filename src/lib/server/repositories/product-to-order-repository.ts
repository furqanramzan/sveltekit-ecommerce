import type { InferModel } from 'drizzle-orm';
import { productsToOrders } from '$lib/server/database/schema';
import { drizzle } from '$lib/server/database';

type ProductToOrder = typeof productsToOrders;
type Create = InferModel<ProductToOrder, 'insert'>;

export class ProductToOrderRepository {
  protected table = productsToOrders;
  protected drizzle = drizzle;

  async create(values: Create[]) {
    await this.drizzle.insert(this.table).values(values);
  }
}

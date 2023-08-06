import { AdminRepository } from './admin-repository';
import { AdminPasswordRepository } from './admin-password-repository';
import { ProductRepository } from './product-repository';
import { CategoryRepository } from './category-repository';
import { OrderRepository } from './order-repository';
import { ProductToOrderRepository } from './product-to-order-repository';

const admin = new AdminRepository();
const adminPassword = new AdminPasswordRepository();
const product = new ProductRepository();
const category = new CategoryRepository();
const order = new OrderRepository();
const productToOrder = new ProductToOrderRepository();

const repositories = {
  admin,
  adminPassword,
  product,
  category,
  order,
  productToOrder,
};

type Repositories = typeof repositories;
type RepositoryKey = keyof Repositories;

export function useRepository<T extends RepositoryKey>(
  key: T,
): Repositories[T] {
  return repositories[key];
}

import { AdminRepository } from './admin-repository';
import { AdminPasswordRepository } from './admin-password-repository';
import { ProductRepository } from './product-repository';
import { CategoryRepository } from './category-repository';

const admin = new AdminRepository();
const adminPassword = new AdminPasswordRepository();
const product = new ProductRepository();
const category = new CategoryRepository();

const repositories = {
  admin,
  adminPassword,
  product,
  category,
};

type Repositories = typeof repositories;
type RepositoryKey = keyof Repositories;

export function useRepository<T extends RepositoryKey>(
  key: T,
): Repositories[T] {
  return repositories[key];
}

import { AdminRepository } from './admin-repository';
import { AdminPasswordRepository } from './admin-password-repository';
import { ProductRepository } from './product-repository';

const admin = new AdminRepository();
const adminPassword = new AdminPasswordRepository();
const product = new ProductRepository();

const repositories = {
  admin,
  adminPassword,
  product,
};

type Repositories = typeof repositories;
type RepositoryKey = keyof Repositories;

export function useRepository<T extends RepositoryKey>(key: T): Repositories[T] {
  return repositories[key];
}

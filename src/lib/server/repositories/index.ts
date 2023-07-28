import { AdminRepository } from './admin-repository';
import { AdminPasswordRepository } from './admin-password-repository';

const admin = new AdminRepository();
const adminPassword = new AdminPasswordRepository();

const repositories = {
  admin,
  adminPassword,
};

type Repositories = typeof repositories;
type RepositoryKey = keyof Repositories;

export function useRepository<T extends RepositoryKey>(key: T): Repositories[T] {
  return repositories[key];
}

import { mysqlConnection } from './utils';
import * as schema from './schema';

export const drizzle = await mysqlConnection(schema);

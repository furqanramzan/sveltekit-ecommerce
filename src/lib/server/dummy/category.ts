import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { uploadSharp } from '$lib/server/filesystem';
import { useRepository } from '$lib/server/repositories';

// Note: Category's index should be match with product's index.
// Otherwise, products will be assign to the wrong category
const categoriesData = [
  { name: 'All', image: 'all' },
  { name: 'Sofa', image: 'sofa' },
  { name: 'Table', image: 'table' },
  { name: 'Double Bed', image: 'double-bed' },
  { name: 'Wardrobe', image: 'wardrobe' },
  { name: 'Dressing Table', image: 'dressing-table' },
  { name: 'Office Chair', image: 'office-chair' },
  { name: 'Coffee Table', image: 'coffee-table' },
];

export async function categories() {
  const data = structuredClone(categoriesData);
  for await (const category of data) {
    const imagePath = getFileInCurrentDirectory(`category/${category.image}.svg`);
    const image = sharp(imagePath);
    category.image = await uploadSharp(image, 'category');
  }

  const repository = useRepository('category');
  const items = await repository.createMany(data);
  items.shift();
  return items;
}

function getFileInCurrentDirectory(filename: string) {
  return join(dirname(fileURLToPath(import.meta.url)), filename);
}

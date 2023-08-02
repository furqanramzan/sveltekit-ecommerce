import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { uploadSharp } from '$lib/server/filesystem';
import { useRepository } from '$lib/server/repositories';
import type { Create } from '$lib/server/repositories/product-repository';

const productsData = [
  // Sofa
  [
    {
      name: 'Comfy Sofa 1',
      description: 'A comfortable sofa for your living room.',
      price: 599,
      quantity: 10,
      image: 'sofa-1',
    },
    {
      name: 'Comfy Sofa 2',
      description: 'Another comfortable sofa for your living room.',
      price: 699,
      quantity: 10,
      image: 'sofa-2',
    },
    {
      name: 'Soft Leather Sofa',
      description: 'A luxurious soft leather sofa for your home.',
      price: 999,
      quantity: 10,
      image: 'sofa-3',
    },
    {
      name: 'Modern Sectional Sofa',
      description: 'A modern sectional sofa for your stylish living room.',
      price: 799,
      quantity: 10,
      image: 'sofa-4',
    },
    {
      name: 'Convertible Sleeper Sofa',
      description: 'A practical convertible sleeper sofa for guests.',
      price: 799,
      quantity: 10,
      image: 'sofa-5',
    },
    {
      name: 'Reclining Sofa',
      description: 'A cozy reclining sofa for movie nights.',
      price: 899,
      quantity: 10,
      image: 'sofa-6',
    },
    {
      name: 'Mid-Century Sofa',
      description: 'A classic mid-century sofa for a retro look.',
      price: 749,
      quantity: 10,
      image: 'sofa-7',
    },
    {
      name: 'L-Shaped Sofa',
      description: 'A spacious L-shaped sofa for larger living rooms.',
      price: 899,
      quantity: 10,
      image: 'sofa-8',
    },
    {
      name: 'Velvet Tufted Sofa',
      description: 'A stylish velvet tufted sofa for a touch of elegance.',
      price: 999,
      quantity: 10,
      image: 'sofa-9',
    },
    {
      name: 'Fabric Loveseat',
      description: 'A cozy fabric loveseat for small spaces.',
      price: 499,
      quantity: 10,
      image: 'sofa-10',
    },
  ],

  // Table
  [
    {
      name: 'Wooden Dining Table 1',
      description: 'A sturdy wooden dining table for your family gatherings.',
      price: 399,
      quantity: 10,
      image: 'table-1',
    },
    {
      name: 'Wooden Dining Table 2',
      description: 'Another sturdy wooden dining table for your family gatherings.',
      price: 499,
      quantity: 10,
      image: 'table-2',
    },
    {
      name: 'Glass Top Dining Table',
      description: 'A modern glass top dining table for a sleek look.',
      price: 699,
      quantity: 10,
      image: 'table-3',
    },
    {
      name: 'Extendable Dining Table',
      description: 'An extendable dining table for accommodating more guests.',
      price: 799,
      quantity: 10,
      image: 'table-4',
    },
    {
      name: 'Marble Dining Table',
      description: 'A luxurious marble dining table for elegant dinners.',
      price: 999,
      quantity: 10,
      image: 'table-5',
    },
    {
      name: 'Farmhouse Dining Table',
      description: 'A rustic farmhouse dining table for a cozy ambiance.',
      price: 649,
      quantity: 10,
      image: 'table-6',
    },
    {
      name: 'Round Pedestal Dining Table',
      description: 'A classic round pedestal dining table for small spaces.',
      price: 599,
      quantity: 10,
      image: 'table-7',
    },
    {
      name: 'Industrial Dining Table',
      description: 'An industrial style dining table for a trendy look.',
      price: 749,
      quantity: 10,
      image: 'table-8',
    },
    {
      name: 'Folding Dining Table',
      description: 'A practical folding dining table for occasional use.',
      price: 399,
      quantity: 10,
      image: 'table-9',
    },
    {
      name: 'Bar Height Dining Table',
      description: 'A bar height dining table for casual dining.',
      price: 549,
      quantity: 10,
      image: 'table-10',
    },
  ],

  // Double Bed
  [
    {
      name: 'King Size Double Bed 1',
      description: "A luxurious king size double bed for a good night's sleep.",
      price: 899,
      quantity: 10,
      image: 'double-bed-1',
    },
    {
      name: 'King Size Double Bed 2',
      description: "Another luxurious king size double bed for a good night's sleep.",
      price: 999,
      quantity: 10,
      image: 'double-bed-2',
    },
    {
      name: 'Queen Size Double Bed',
      description: 'A comfortable queen size double bed for couples.',
      price: 799,
      quantity: 10,
      image: 'double-bed-3',
    },
    {
      name: 'Platform Double Bed',
      description: 'A platform double bed for a modern bedroom.',
      price: 849,
      quantity: 10,
      image: 'double-bed-4',
    },
    {
      name: 'Wooden Double Bed',
      description: 'A classic wooden double bed for timeless elegance.',
      price: 799,
      quantity: 10,
      image: 'double-bed-5',
    },
    {
      name: 'Upholstered Double Bed',
      description: 'An upholstered double bed for a soft and cozy feel.',
      price: 899,
      quantity: 10,
      image: 'double-bed-6',
    },
    {
      name: 'Storage Double Bed',
      description: 'A double bed with storage drawers for extra convenience.',
      price: 999,
      quantity: 10,
      image: 'double-bed-7',
    },
    {
      name: 'Metal Double Bed',
      description: 'A sturdy metal double bed for durability.',
      price: 699,
      quantity: 10,
      image: 'double-bed-8',
    },
    {
      name: 'Fabric Double Bed',
      description: 'A fabric double bed for a touch of luxury.',
      price: 849,
      quantity: 10,
      image: 'double-bed-9',
    },
    {
      name: 'Sleigh Double Bed',
      description: 'A sleigh-style double bed for a sophisticated look.',
      price: 949,
      quantity: 10,
      image: 'double-bed-10',
    },
  ],

  // Office Chair
  [
    {
      name: 'Ergonomic Office Chair 1',
      description: 'An ergonomic office chair for comfortable work hours.',
      price: 199,
      quantity: 10,
      image: 'offcie-chair-1',
    },
    {
      name: 'Ergonomic Office Chair 2',
      description: 'Another ergonomic office chair for comfortable work hours.',
      price: 249,
      quantity: 10,
      image: 'offcie-chair-2',
    },
    {
      name: 'Mesh Back Office Chair',
      description: 'A breathable mesh back office chair for long hours at the desk.',
      price: 299,
      quantity: 10,
      image: 'offcie-chair-3',
    },
    {
      name: 'Executive Leather Office Chair',
      description: 'An executive leather office chair for a professional look.',
      price: 399,
      quantity: 10,
      image: 'offcie-chair-4',
    },
    {
      name: 'Task Office Chair',
      description: 'A practical task office chair for versatile use.',
      price: 179,
      quantity: 10,
      image: 'offcie-chair-5',
    },
    {
      name: 'Swivel Office Chair',
      description: 'A swivel office chair for easy movement around the desk.',
      price: 229,
      quantity: 10,
      image: 'offcie-chair-6',
    },
    {
      name: 'Modern Office Chair',
      description: 'A modern office chair for contemporary workspaces.',
      price: 279,
      quantity: 10,
      image: 'offcie-chair-7',
    },
    {
      name: 'Drafting Office Chair',
      description: 'A drafting office chair for elevated workstations.',
      price: 249,
      quantity: 10,
      image: 'offcie-chair-8',
    },
    {
      name: 'Fabric Office Chair',
      description: 'A fabric office chair for a cozy and comfortable feel.',
      price: 199,
      quantity: 10,
      image: 'offcie-chair-9',
    },
    {
      name: 'Lumbar Support Office Chair',
      description: 'An office chair with lumbar support for better posture.',
      price: 299,
      quantity: 10,
      image: 'offcie-chair-10',
    },
  ],
];

export async function products(categories: { id: number }[]) {
  const data: Create[] = [];
  for await (const [categoryIndex, category] of productsData.entries()) {
    for await (const product of category) {
      const imagePath = getFileInCurrentDirectory(`product/${product.image}.png`);
      const image = await uploadSharp(sharp(imagePath), 'product');

      const categoryId = categories[categoryIndex].id;

      data.push({ ...product, image, categoryId });
    }
  }

  const repository = useRepository('product');
  return repository.createMany(shuffleArray(data));
}

function getFileInCurrentDirectory(filename: string) {
  return join(dirname(fileURLToPath(import.meta.url)), filename);
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

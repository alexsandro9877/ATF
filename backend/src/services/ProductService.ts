import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export interface CreateProductProps {
  cod_prod: number;
  cod_prod_origem: number;
  desc_marca: string;
  desc_cor: string[];
  ind_prod_peso: string;
  desc_prod: string[];
  ind_prod_status: boolean;
  images: { end_link_imagem: string; cod_prod: number }[];
  ean_codes: { ean: string[]; emba: number; status: boolean; cod_prod: number }[];
  prices: { status: boolean; cod_prod: number; price: string }[]; // Added price field here
  measures: {
    ean_prod: string[];
    unm_desc: string;
    prod_altura: number;
    prod_larg: number;
    prod_comprimento: number;
    prod_peso_bruto: number;
    prod_peso_liquido: number;
    prod_peso_unm: number;
    prod_mtc: number;
    cod_prod: number;
  }[];
  departmentId?: string;
  categoryId?: string;
  subcategoryId?: string;
  sectionId?: string;
  groupId?: string;
  subgroupId?: string;
  accountId?: string;
}

export interface DeleteProductProps {
  id: string;
}

class ListProductsService {
  async execute() {
    try {
      const products = await prisma.product.findMany({
        include: {
          images: true,
          ean_codes: true,
          prices: true,
          measures: true,
        },
      });
      return products;
    } catch (error) {
      throw new Error("Erro ao listar os produtos.");
    }
  }
}

class GetProductByIdService {
  async execute(id: string) {
    if (!id) {
      throw new Error("ID do produto não fornecido.");
    }

    try {
      const product = await prisma.product.findUnique({
        where: {
          id: id,
        },
        include: {
          images: true,
          ean_codes: true,
          prices: true,
          measures: true,
        },
      });

      if (!product) {
        throw new Error("Produto não encontrado.");
      }

      return product;
    } catch (error) {
      throw new Error(`Erro ao buscar o produto: ${error}`);
    }
  }
}

class DeleteProductService {
  async execute({ id }: DeleteProductProps) {
    if (!id) {
      throw new Error("Solicitação inválida!");
    }

    const findProduct = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!findProduct) {
      throw new Error("Produto não encontrado!");
    }

    await prisma.product.delete({
      where: {
        id: id, // Corrected here
      },
    });

    return { message: `${id} deletado com sucesso!` };
  }
}

class CreateProductService {
  async execute({
    cod_prod,
    cod_prod_origem,
    desc_marca,
    desc_cor,
    ind_prod_peso,
    desc_prod,
    ind_prod_status,
    images,
    ean_codes,
    prices,
    measures,
    departmentId,
    categoryId,
    subcategoryId,
    sectionId,
    groupId,
    subgroupId,
    accountId,
  }: CreateProductProps) {
    if (
      !cod_prod ||
      !cod_prod_origem ||
      !desc_marca ||
      !desc_cor ||
      !ind_prod_peso ||
      !desc_prod ||
      !ind_prod_status ||
      !images ||
      !ean_codes ||
      !prices ||
      !measures||
      !accountId
    ) {
      throw new Error("Envie todos os campos...");
    }

    const product = await prisma.product.create({
      data: {
        cod_prod,
        cod_prod_origem,
        desc_marca,
        desc_cor,
        ind_prod_peso,
        desc_prod,
        ind_prod_status,
        created_at: new Date(),
        updated_at: new Date(),
        images: {
          create: images.map(image => ({
            end_link_imagem: image.end_link_imagem,
            cod_prod: image.cod_prod,
          })),
        },
        ean_codes: {
          create: ean_codes.map(ean => ({
            ean: ean.ean,
            emba: ean.emba,
            status: ean.status,
            cod_prod: ean.cod_prod,
          })),
        },
        prices: {
          create: prices.map(price => ({
            status: price.status,
            cod_prod: price.cod_prod,
            price: price.price, // Added price field here
          })),
        },
        measures: {
          create: measures.map(measure => ({
            ean_prod: measure.ean_prod,
            unm_desc: measure.unm_desc,
            prod_altura: measure.prod_altura,
            prod_larg: measure.prod_larg,
            prod_comprimento: measure.prod_comprimento,
            prod_peso_bruto: measure.prod_peso_bruto,
            prod_peso_liquido: measure.prod_peso_liquido,
            prod_peso_unm: measure.prod_peso_unm,
            prod_mtc: measure.prod_mtc,
            cod_prod: measure.cod_prod,
          })),
        },
        departmentId,
        categoryId,
        subcategoryId,
        sectionId,
        groupId,
        subgroupId,
        accountId
      },
    });

    return product;
  }
}

export { CreateProductService, ListProductsService, GetProductByIdService, DeleteProductService };

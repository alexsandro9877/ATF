import {create} from 'zustand';
import { IProduct, CProduct } from '../modules/product.entity'; // Atualize o caminho para o arquivo onde está a classe CProduct

const cProduct = new CProduct(); // Cria uma única instância de CProduct

interface ProductState {
    products: IProduct[];
    fetchProducts: () => Promise<void>;
    addProduct: (product: IProduct) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    editProduct: (id: number, newProduct: IProduct) => Promise<void>;
}

const productStore = create<ProductState>((set) => ({
    products: [],
    fetchProducts: async () => {
        await cProduct.fetchAllProducts();
        set({ products: cProduct.getAllProducts() });
    },
    addProduct: async (product) => {
        await cProduct.addProduct(product);
        set({ products: cProduct.getAllProducts() });
    },
    deleteProduct: async (id) => {
        await cProduct.deleteProduct(id);
        set({ products: cProduct.getAllProducts() });
    },
    editProduct: async (id, newProduct) => {
        await cProduct.editProduct(id, newProduct);
        set({ products: cProduct.getAllProducts() });
    },
}));

export default productStore;

import {create} from 'zustand';
import { IItem, CItem } from '../modules/item.entity';

const cItem = new CItem(); // Cria uma única instância de CItem

interface ItemState {
    items: IItem[];
    fetchItems: () => Promise<void>;
    addItem: (item: IItem) => Promise<void>;
    deleteItem: (id: number) => Promise<void>;
    editItem: (id: number, newItem: IItem) => Promise<void>;
}

const itemStore = create<ItemState>((set) => ({
    items: [],
    fetchItems: async () => {
        const items = await cItem.getAllItems();
        set({ items });

    },
    addItem: async (item) => {
        await cItem.addItem(item);
        const items = await cItem.getAllItems();
        set({ items });
    },
    deleteItem: async (id) => {
        await cItem.deleteItem(id);
        const items = await cItem.getAllItems();
        set({ items });
    },
    editItem: async (id, newItem) => {
        await cItem.editItem(id, newItem);
        const items = await cItem.getAllItems();
        set({ items });
    },
}));

export default itemStore;
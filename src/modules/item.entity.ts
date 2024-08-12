


export interface IItem {
    id: number,
    code: string,
    description: string,
    ean: string,
    price: string,
    urlImage: string,
    stateItem: boolean
}


export class CItem {
    public items: IItem[];
    public lastId: number;

    constructor() {
        this.items = [];
        this.lastId = 0;
    }

    public generateId(): number {
        return ++this.lastId;
    }

    addItem(item: IItem): void {
        const newItem = { ...item, id: this.generateId() };
        this.items.push(newItem);
    }

    editItem(id: number, newItem: IItem): void {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items[index] = { ...newItem, id };
        }
    }

    deleteItem(id: number): void {
        this.items = this.items.filter(item => item.id !== id);
    }

    getAllItems(): IItem[] {
        return this.items;
    }

    getItemById(id: number): IItem | undefined {
        return this.items.find(item => item.id === id);
    }
}
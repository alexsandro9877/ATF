import {create} from 'zustand';
import { CUser,IUser, IUserCreate } from '../modules/user.entity';


const cUser = new CUser(); 

interface userState {
    user: IUser[];
    fetchUser: (id : string) => Promise<void>;
    addUser: (user: IUserCreate) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    editUser: (id: number, newUser: IUser) => Promise<void>;
}

const userStore = create<userState>((set) => ({
    user: [],
    fetchUser: async (id) => {
        await cUser.fetchAllUsers(id);
        set({ user: cUser.getAllUsers() });
    },
    addUser: async (user) => {
        await cUser.addUser(user);
        set({ user: cUser.getAllUsers() });
    },
    deleteUser: async (id) => {
        await cUser.deleteUser(id);
        set({ user: cUser.getAllUsers() });
    },
    editUser: async (id, newUser) => {
        await cUser.editUser(id, newUser);
        set({ user: cUser.getAllUsers() });
    },
}));

export default userStore;

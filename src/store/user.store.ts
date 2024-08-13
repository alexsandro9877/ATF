import {create} from 'zustand';
import { CUser } from '../modules/user.entity';
import { IUserResp } from '../types/typeUserResp';


const cUser = new CUser(); 

interface userState {
    user: IUserResp[];
    fetchUser: (id : string) => Promise<void>;
    addUser: (user: IUserResp) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    editUser: (id: number, newUser: IUserResp) => Promise<void>;
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

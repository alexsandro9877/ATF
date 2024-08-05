import { create } from 'zustand';
import cAutenticaUser, { IUser } from '../modules/autentica.entity';

interface AutenticaUserState {
  userAut: IUser[];
  statusAutenticacao: boolean;
  logOut: () => Promise<void>;
  logIn: (email: string) => Promise<{ success: boolean; message?: string }>;
  fetchUser: () => Promise<void>;
}

const AuthUserStore = create<AutenticaUserState>((set) => ({
  userAut: [],
  statusAutenticacao: false,
  logIn: async (email) => {
   return await cAutenticaUser.logIn(email).then((e)=>{e
      set({ 
        userAut: cAutenticaUser.getUser(),
        statusAutenticacao: cAutenticaUser.statusAutenticacao
      });
      return { success: e.success, message: e.message };
    });
   
  },
  logOut: async () => {
    await cAutenticaUser.logOut();
    set({ 
      userAut: cAutenticaUser.getUser(),
      statusAutenticacao: cAutenticaUser.statusAutenticacao
    });
  },
  fetchUser: async () => {
    set({ 
      userAut: cAutenticaUser.getUser(),
      statusAutenticacao: cAutenticaUser.statusAutenticacao
    });
  },
}));

export default AuthUserStore;

import { create } from 'zustand';
import cAutenticaUser, { IUser } from '../modules/autentica.entity';

interface AutenticaUserState {
  userAut: IUser[];
  statusAutenticacao: boolean;
  logOut: () => Promise<void>;
  logIn: (email: string) => Promise<{ success: boolean; message?: string }>;
  fetchUser: () => void;
  refreshToken: string;
}

const AuthUserStore = create<AutenticaUserState>((set) => ({
  userAut: [],
  statusAutenticacao: false,
  expires_in: 0,
  refreshToken: '',

  logIn: async (email) => {
    const result = await cAutenticaUser.logIn(email);
    set({ 
      userAut: cAutenticaUser.getUser(),
      statusAutenticacao: cAutenticaUser.statusAutenticacao
    });
    return { success: result.success, message: result.message };
  },

  logOut: async () => {
    await cAutenticaUser.logOut();
    set({ 
      userAut: cAutenticaUser.getUser(),
      statusAutenticacao: cAutenticaUser.statusAutenticacao
    });
  },

  fetchUser: async () => {
    await cAutenticaUser.getUser(); 
    set({ 
      userAut: cAutenticaUser.getUser(),
      refreshToken: cAutenticaUser.refreshToken,
      statusAutenticacao: cAutenticaUser.statusAutenticacao
    });
  },
}));

export default AuthUserStore;

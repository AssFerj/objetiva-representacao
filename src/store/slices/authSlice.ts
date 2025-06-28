import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, LoginCredentials, UserRole } from '../../types/auth';
import { signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Primeiro, faz o login com Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      try {
        // Depois, busca os dados do usuário no Firestore
        const userRef = doc(db, 'users', userCredential.user.uid);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
          await firebaseSignOut(auth); // Faz logout se não encontrar o usuário no Firestore
          return rejectWithValue('Usuário não encontrado no sistema');
        }

        const userData = userDoc.data();
        const userRole = userData.role as UserRole;

        if (!userRole) {
          await firebaseSignOut(auth);
          return rejectWithValue('Permissão não encontrada');
        }

        return {
          id: userCredential.user.uid,
          email: userCredential.user.email || '',
          role: userRole,
          name: userCredential.user.displayName || 'User'
        };
      } catch (firestoreError) {
        console.error('Erro ao buscar dados do usuário:', firestoreError);
        await firebaseSignOut(auth);
        return rejectWithValue('Erro ao buscar dados do usuário');
      }
    } catch (authError) {
      console.error('Erro de autenticação:', authError);
      if (authError instanceof Error && 'code' in authError) {
        const errorCode = (authError as { code: string }).code;
        if (errorCode === 'auth/invalid-credential') {
          return rejectWithValue('E-mail ou senha inválidos');
        }
        return rejectWithValue(
          errorCode === 'auth/user-not-found'
            ? 'Usuário não encontrado'
            : errorCode === 'auth/wrong-password'
            ? 'Senha incorreta'
            : 'Erro ao fazer login'
        );
      }
      return rejectWithValue('Erro ao fazer login');
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

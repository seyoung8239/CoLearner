import create from 'zustand';
import { Node } from '../types'

type Store = {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
  name: string;
  setName: (name: string) => void;
  nodes: Node[];
  load: (nodes: Node[]) => void
  cookie: string;
  setCookie: (c: string) => void
}

const useStore = create<Store>((set) => ({
  cookie: '',
  setCookie(cc) {
    set((state: Store) => ({
      ...state,
      cookie: cc
    }))
  },
  setName(name) {
    set((state: Store) => ({
      ...state,
      name: name
    }))
  },
  isLogin: false,
  login() {
    set((state: Store) => ({
      ...state,
      isLogin: true
    }))
  },
  logout() {
    set((state: Store) => ({
      ...state,
      isLogin: false
    }))
  },
  name: '',
  nodes: [],
  load(nodes: Node[]) {
    set((state: Store) => ({
      ...state,
      nodes: nodes,
    }))
  }
}))

export default useStore;
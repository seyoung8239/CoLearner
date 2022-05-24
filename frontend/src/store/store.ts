import create from 'zustand';
import {Node} from '../types'

type Store = {
  nodes: Node[];
  load: (nodes: Node[]) => void
}

const useStore = create<Store>((set) => ({
  nodes: [],
  load(nodes: Node[]) {
    set((state: Store) => ({
      ...state,
      nodes: nodes,
    }))
  }
}))

export default useStore;
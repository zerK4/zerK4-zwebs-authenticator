/**
 * ? Authentication store.
 * * Creates the local storage for the authenticated user.
 * * Removes the saved user on logout.
 */
import create, { StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import {AuthStoreType} from '../utils/interfaces/StoresInterface'

// ? Used to create the local storage for the authenticated user.

  type MyPersist = (
    config: StateCreator<AuthStoreType>,                                            
    options: PersistOptions<AuthStoreType>                                          
  ) => StateCreator<AuthStoreType>                                                  
  const useAuthStore = create<AuthStoreType>(                                           
    (persist as MyPersist)(                                                   
      (set) => ({                                                             
        userProfile: {
          email: "",
          firstName: "",
          lastName: "",
          validated: false,
        },                                                     
        authenticated: false,
        addUser: (user) => set({ userProfile: user, authenticated: true }),
        removeUser: () => set({ userProfile: undefined, authenticated: false }),                                                                    
      }),                                                                     
      { name: 'auth' }                                                  
    )                                                                         
  )

  export default useAuthStore;
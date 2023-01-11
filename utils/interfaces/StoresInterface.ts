export type AuthStoreType = {
    userProfile: {
      email: String,
      firstName: String;
      lastName: String;
      validated: boolean;
    }
    authenticated: boolean;
    addUser: (user: any) => void
    removeUser: () => void
  }
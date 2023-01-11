export interface UserType {
    id: number;
    username: string;
    email: string;
    token: string;
    confirmed: boolean;
    confirmationToken: string;
    profile?: Profile;
}

export type Profile = {
    firstName: string;
    lastName: string;
    avatar: string;
    jobPosition: string;
    phoneNumber: string;
    userId: number;
}

export interface ServerSessionUser{
   
        id?: string | null | undefined;
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
        number?: string | null | undefined;
        accessToken: string | null | undefined;
  
} 

interface ClientSessionData {
    user?: ServerSessionUser;
    expires: string;
  }
  
 export interface ClientSession {
    data: ClientSessionData | null;
    status: 'authenticated' | 'loading' | 'unauthenticated';
    update: (data: ClientSessionData | null) => void;
  }

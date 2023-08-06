export interface AuthResponse{
    body: {
        user: User;
        accessToken: string;
        refreshToken: string;
    };

}

export interface AuthResponseError{
    body:{
        error: string;
    }
}


export interface User{
    _id: string;
    name: string;
    username: string;
}

export interface AccessTokenResponse{
    statusCode: number;
    body: {
        accesToken: string;
    };
    error?: string;
    
}
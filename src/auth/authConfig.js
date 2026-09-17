export const msalConfig = {
    auth: {
        clientId: "fdc7e232-5931-4ca2-870e-4fa49ff4ac1c",
        authority: "https://login.microsoftonline.com/d3701f96-7ab6-4c44-82b0-f6925953f544",
        redirectUri: "http://localhost:5173",
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

export const loginRequest = {
    scopes: ["User.Read"]
};

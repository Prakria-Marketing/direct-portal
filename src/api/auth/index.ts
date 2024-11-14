import axiosInstance from "../axiosinstance";


type RegisterUser ={
    name : string ;
    email : string ;
    password :string ;

}

export async function registerUser(credential : RegisterUser) {
    const res =  await axiosInstance.post("/auth/register-login" , credential);
    return res.data;
}
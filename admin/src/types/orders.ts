export interface Orders {
    _id:number;
    name:string;
    phone:string;
    productDetails:productDetails[];
    status:string;
    updatedAt:Date
}

type productDetails = {
    name:string
    quantity:number
    price:number
}
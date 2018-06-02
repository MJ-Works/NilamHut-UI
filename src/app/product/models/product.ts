import { ProductTag } from './ProductTag';
import { Bid } from './Bid';

export class Product
{
    posterId: string;
    userName: string;
    userId: string;
    userImage: string;
    userAddress: string;
    userPhone: string;
    userCity: string;
    startDateTime: string;
    endDateTime: string;
    productName: string;
    productDescription: string;
    quantity: number;
    basePrice: number;
    contactInfo: string;
    categoryId: string;
    categoryName: string;
    cityId: string;
    cityName: string;
    image: string[];
    bids: Bid[];
}
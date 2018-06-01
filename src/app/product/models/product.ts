import { ProductTag } from './ProductTag';
import { Bid } from './Bid';

export class Product
{
    posterId: string;
    userName: string;
    userImage: string;
    userAddress: string;
    StartDateTime: string;
    EndDateTime: string;
    ProductName: string;
    ProductDescription: string;
    Quantity: number;
    BasePrice: number;
    ContactInfo: string;
    CategoryId: string;
    CategoryName: string;
    CityId: string;
    CityName: string;
    Image: string[];
    Bids: Bid[];
}
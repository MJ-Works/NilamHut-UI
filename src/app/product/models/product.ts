import { ProductTag } from './ProductTag';
import { Image } from './Image';

export class Product
{
    ApplicationUserId: string;
    StartDateTime: string;
    EndDateTime: string;
    ProductName: string;
    ProductDescription: string;
    Quantity: number;
    BasePrice: number;
    ContactInfo: string;
    CategoryId: string;
    CityId: string;
    Image: Image[];
    Tags: ProductTag[];
}
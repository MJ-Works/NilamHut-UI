import { ProductTag } from './ProductTag';
import { Image } from './Image';

export class product
{
    StartDateTime: string;
    EndDateTime: string;
    ProductName: string;
    ProductDescription: string;
    Quantity: number;
    BasePrice: number;
    CountryId: string;
    ContactInfo: string;
    CityId: string;
    Image: Image[];
    Tags: ProductTag[];
}
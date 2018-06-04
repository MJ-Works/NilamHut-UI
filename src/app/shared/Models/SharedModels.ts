export class City{
    id: String;
    cityName: String;
}

export class Category{
    id: String;
    categoryName: String;
}

export class Tag
{
    id : string = '';
    tagName : string = '';
    tagDescription : string = '' ;
}

export class NewBid {
    public BidPrice: number;
    public BidTime: string;
    public ApplicationUserId: string;
    public ProductId: string
}
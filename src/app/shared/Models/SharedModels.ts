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
    Id : string = '';
    TagName : string = '';
    TagDescription : string = '' ;
}

export class NewBid {
    public BidPrice: number;
    public BidTime: string;
    public ApplicationUserId: string;
    public ProductId: string
}
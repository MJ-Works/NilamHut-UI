export class UserBid {
    BidId: string;
    ProductId: string
    ProductName: string
    BidTime: string
    BidEndTime: String
    BidPrice: number;
}

export class UserPost {
    PostId: string;
    StartDateTime: String;
    EndDateTime: String;
    ProductName: String;
}

export class UserInfo {
    userId: string;
    applicationUserId: string;
    fullName: string;
    cityId: string;
    cityName: string;
    phone: string;
    address: string;
    postCode: string;
    email: string;
    rating: number;
    image: string;
}

export class UserData{
    ApplicationUserId: string;
    FullName: string;
    CityId: string;
    PostCode: string;
    Address: string;
    Phone: string;
}
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
    id: String;
    applicationUser: object;
    applicationUserId: string;
    fullName: string;
    cityId: string;
    postCode: string;
    address: string;
    phone: string;
    image: string;
    isVip: boolean;
    rating: object;
    credit: object;
}
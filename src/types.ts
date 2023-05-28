interface Place {
    lat: number;
    lng: number;
}

interface Product {
    id: string;
    price: string;
    name: string;
    img: string;
    quantity?: number;
}

interface Restaurant {
    _id: string;
    restaurantName: string;
    address: string;
    phone: string;
    place: Place;
    products: Product[];
    cuisine: string;
}

export type { Place, Product, Restaurant }
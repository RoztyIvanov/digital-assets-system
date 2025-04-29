export class Asset {
    id: number;
    name: string;
    symbol: string;
    price: number;

    constructor(id: number, name: string, symbol: string, price: number) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.price = price;
    }
}

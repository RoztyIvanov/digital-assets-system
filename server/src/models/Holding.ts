export class Holding {
    id: number;
    user_id: number;
    asset_id: number;
    quantity: number;

    constructor(id: number, user_id: number, asset_id: number, quantity: number) {
        this.id = id;
        this.user_id = user_id;
        this.asset_id = asset_id;
        this.quantity = quantity;
    }
}

export interface CartItem {
	_id: string;
	total: number;
	title?: string;
	price?: number;
	old_price?: number;
	imgURL?: string;
}

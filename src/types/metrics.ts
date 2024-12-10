export interface AuctionMetrics {
    auction_id: number;
    title: string;
    start_price: number;
    final_price: number;
    shipping_price: number;
    buy_it_now_price: number;
    number_of_bids: number;
    duration_hours: number;
    highest_bid: number;
    lowest_bid: number;
    average_bid: number;
    bid_velocity: number;
    seller_id: string;
    buyer_id?: string;
    created_at: string;
    closed_at: string;
    is_buy_it_now: boolean;
  }
  
  export interface MetricsResponse {
    metrics: AuctionMetrics[];
    total: number;
    page: number;
    page_size: number;
  }
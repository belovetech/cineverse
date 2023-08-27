export interface Metadata {
    total_items: number;
    item_per_page: number;
    total_page: number;
    previous_page: number | null;
    current_page: number;
    next_page: number | null;
}

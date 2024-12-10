import { MetricsResponse } from "@/types/metrics";

export const fetchUserMetrics = async (userId: string): Promise<MetricsResponse> => {
  try {
    const response = await fetch(`/api/metrics?seller_id=${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch metrics: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return { metrics: [], total: 0, page: 0, page_size: 0 };
  }
};
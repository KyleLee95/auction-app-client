import { useOutletContext } from "react-router-dom";
import { DashboardOutletProps } from "./dashboard-page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuctionMetrics } from "@/types/metrics";

export function DashboardMetricsList() {
  const { metrics = [] } = useOutletContext<DashboardOutletProps>();

  // Calculate aggregate metrics
  const totalAuctions = metrics.length;
  const averageFinalPrice = metrics.reduce((acc, m) => acc + m.final_price, 0) / totalAuctions || 0;
  const averageBids = metrics.reduce((acc, m) => acc + m.number_of_bids, 0) / totalAuctions || 0;
  const totalBids = metrics.reduce((acc, m) => acc + m.number_of_bids, 0);
  const highestBid = Math.max(...metrics.map(m => m.highest_bid));

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Auction Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Auctions</CardTitle>
            <CardDescription>Number of auctions you've created</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalAuctions}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Final Price</CardTitle>
            <CardDescription>Average closing price of your auctions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${averageFinalPrice.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Bids Received</CardTitle>
            <CardDescription>Total number of bids across all auctions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalBids}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Bids per Auction</CardTitle>
            <CardDescription>Average number of bids per auction</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{averageBids.toFixed(1)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Highest Bid Received</CardTitle>
            <CardDescription>Highest bid across all auctions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${highestBid.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Recent Auction Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Title</th>
                <th className="text-right p-2">Final Price</th>
                <th className="text-right p-2">Bids</th>
                <th className="text-right p-2">Bid Velocity</th>
                <th className="text-right p-2">Duration (hrs)</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric) => (
                <tr key={metric.auction_id} className="border-b">
                  <td className="p-2">{metric.title}</td>
                  <td className="text-right p-2">${metric.final_price.toFixed(2)}</td>
                  <td className="text-right p-2">{metric.number_of_bids}</td>
                  <td className="text-right p-2">{metric.bid_velocity.toFixed(2)}/hr</td>
                  <td className="text-right p-2">{metric.duration_hours.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
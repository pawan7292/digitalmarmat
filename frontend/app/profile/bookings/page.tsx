"use client";

import { useState, useEffect } from "react";
import { getUserBookings } from "@/lib/fetches/profile";

interface Branch {
  branch_name: string;
  branch_email: string;
  branch_address: string;
  branch_mobile: string;
}

interface Slot {
  source_Values: string;
}

interface Product {
  source_name: string;
}

interface Booking {
  id: number;
  order_id: string;
  booking_date: string;
  booking_status: string;
  payment_status: string;
  total_amount: number;
  branch: Branch;
  slot: Slot;
  product: Product;
}

interface BookingsResponse {
  bookings: {
    data: Booking[];
    current_page: number;
    last_page: number;
  };
}

export default function UserBookings() {
  const [bookingsData, setBookingsData] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async (page = 1) => {
    setLoading(true);
    try {
      const response: BookingsResponse = await getUserBookings({
        page: currentPage,
      }); // optionally pass page to API
      setBookingsData(response.bookings.data);
      setCurrentPage(response.bookings.current_page);
      setLastPage(response.bookings.last_page);
    } catch (err) {
      console.error("Error fetching bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < lastPage) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <p className="text-center">Loading bookings...</p>;

  if (!bookingsData.length)
    return <p className="text-center">No bookings found.</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Bookings</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Booking Date</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Branch</th>
              <th className="p-3 text-left">Slot</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Booking Status</th>
              <th className="p-3 text-left">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {bookingsData.map((b) => (
              <tr key={b.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{b.order_id}</td>
                <td className="p-3">
                  {new Date(b.booking_date).toLocaleDateString()}
                </td>
                <td className="p-3">{b.product.source_name}</td>
                <td className="p-3">
                  <div>{b.branch.branch_name}</div>
                  <div className="text-sm text-gray-500">
                    {b.branch.branch_address}
                  </div>
                </td>
                <td className="p-3">{b.slot?.source_Values || "-"}</td>
                <td className="p-3">NPR {b.total_amount}</td>
                <td className="p-3">{b.booking_status}</td>
                <td className="p-3">{b.payment_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-3 py-1">
          Page {currentPage} of {lastPage}
        </span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={nextPage}
          disabled={currentPage === lastPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

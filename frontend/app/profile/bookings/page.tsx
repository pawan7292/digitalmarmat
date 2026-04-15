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
  booking_status: string | number;
  payment_status: string | number;
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

// Status mapping
const BOOKING_STATUS_MAP: { [key: string | number]: string } = {
  "1": "Open",
  "2": "Accepted",
  "3": "Cancelled",
  "4": "In Progress",
  "5": "Completed",
  1: "Open",
  2: "Accepted",
  3: "Cancelled",
  4: "In Progress",
  5: "Completed",
};

const PAYMENT_STATUS_MAP: { [key: string | number]: string } = {
  "1": "Unpaid",
  "2": "Paid",
  1: "Unpaid",
  2: "Paid",
};

const getBookingStatusColor = (status: string | number): string => {
  const statusMap = {
    Open: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    Accepted: "bg-blue-50 text-blue-700 border border-blue-200",
    Cancelled: "bg-red-50 text-red-700 border border-red-200",
    "In Progress": "bg-purple-50 text-purple-700 border border-purple-200",
    Completed: "bg-green-50 text-green-700 border border-green-200",
  };
  const statusText = BOOKING_STATUS_MAP[status] || String(status);
  return statusMap[statusText as keyof typeof statusMap] || "bg-gray-50 text-gray-700 border border-gray-200";
};

const getPaymentStatusColor = (status: string | number): string => {
  const statusMap = {
    Unpaid: "bg-orange-50 text-orange-700 border border-orange-200",
    Paid: "bg-green-50 text-green-700 border border-green-200",
  };
  const statusText = PAYMENT_STATUS_MAP[status] || String(status);
  return statusMap[statusText as keyof typeof statusMap] || "bg-gray-50 text-gray-700 border border-gray-200";
};

const StatusBadge = ({ text, colorClass }: { text: string; colorClass: string }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
    {text}
  </span>
);

export default function UserBookings() {
  const [bookingsData, setBookingsData] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async (page = 1) => {
    setLoading(true);
    try {
      const response: BookingsResponse = await getUserBookings({ page });
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

  if (loading)
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border b-2 border-gray-300 border-t-brand-raiden-500 mx-auto mb-4"></div>
          <p>Loading bookings...</p>
        </div>
      </div>
    );

  if (!bookingsData.length)
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-500">No bookings found.</p>
        <p className="text-sm text-gray-400 mt-2">Your bookings will appear here</p>
      </div>
    );

  return (
    <div className="space-y-6 px-4 sm:px-6 md:px-12 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-brand-raiden-900 mb-2">My Bookings</h1>
        <p className="text-gray-500">Track and manage all your bookings here</p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Branch</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Slot</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Booking Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Payment Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookingsData.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{b.order_id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(b.booking_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.product.source_name}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="font-medium text-gray-900">{b.branch.branch_name}</div>
                  <div className="text-xs text-gray-500">{b.branch.branch_address}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.slot?.source_Values || "-"}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">NPR {b.total_amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <StatusBadge
                    text={BOOKING_STATUS_MAP[b.booking_status] || String(b.booking_status)}
                    colorClass={getBookingStatusColor(b.booking_status)}
                  />
                </td>
                <td className="px-6 py-4">
                  <StatusBadge
                    text={PAYMENT_STATUS_MAP[b.payment_status] || String(b.payment_status)}
                    colorClass={getPaymentStatusColor(b.payment_status)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {bookingsData.map((b) => (
          <div
            key={b.id}
            className="rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="font-bold text-lg text-gray-900">{b.order_id}</div>
                <div className="text-xs text-gray-500">
                  {new Date(b.booking_date).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="border-t pt-3">
                <span className="text-xs font-semibold text-gray-600 uppercase">Product</span>
                <div className="text-sm text-gray-900 mt-1">{b.product.source_name}</div>
              </div>

              <div className="border-t pt-3">
                <span className="text-xs font-semibold text-gray-600 uppercase">Branch</span>
                <div className="text-sm text-gray-900 mt-1">{b.branch.branch_name}</div>
                <div className="text-xs text-gray-500">{b.branch.branch_address}</div>
              </div>

              <div className="border-t pt-3">
                <span className="text-xs font-semibold text-gray-600 uppercase">Time Slot</span>
                <div className="text-sm text-gray-900 mt-1">{b.slot?.source_Values || "-"}</div>
              </div>

              <div className="border-t pt-3">
                <span className="text-xs font-semibold text-gray-600 uppercase">Amount</span>
                <div className="text-lg font-bold text-brand-raiden-700 mt-1">NPR {b.total_amount.toLocaleString()}</div>
              </div>
            </div>

            <div className="border-t pt-4 space-y-3">
              <div>
                <span className="text-xs font-semibold text-gray-600 uppercase block mb-2">Booking Status</span>
                <StatusBadge
                  text={BOOKING_STATUS_MAP[b.booking_status] || String(b.booking_status)}
                  colorClass={getBookingStatusColor(b.booking_status)}
                />
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-600 uppercase block mb-2">Payment Status</span>
                <StatusBadge
                  text={PAYMENT_STATUS_MAP[b.payment_status] || String(b.payment_status)}
                  colorClass={getPaymentStatusColor(b.payment_status)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8 flex-wrap pb-4">
        <button
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>

        <div className="flex gap-2 items-center">
          <span className="text-sm font-medium text-gray-700">
            Page <span className="font-bold text-brand-raiden-600">{currentPage}</span> of{" "}
            <span className="font-bold text-gray-900">{lastPage}</span>
          </span>
        </div>

        <button
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={nextPage}
          disabled={currentPage === lastPage}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
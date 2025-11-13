import React, { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTablePlugin from "jspdf-autotable";

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const extractOrders = (payload) => {
    if (!payload) return [];
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.orders)) return payload.orders;
    if (Array.isArray(payload?.items)) return payload.items;
    return [];
  };

  useEffect(() => {
    document.title = "PawMart - My Orders";
    if (!user?.email) return;

    (async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const res = await API.get("/orders", { params: { email: user.email } });
        setOrders(extractOrders(res.data));
      } catch (err) {
        console.error("Error fetching orders:", err);
        toast.error(
          err?.response?.data?.error ||
            "Unable to load your orders right now. Please try again shortly."
        );
        setErrorMessage(
          err?.response?.data?.error ||
            "We couldn’t load your orders. Please try again later."
        );
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user?.email]);

  const downloadPDF = () => {
    try {
      if (!orders || orders.length === 0) {
        toast.error("No orders to download.");
        return;
      }

      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("My Orders Report", 14, 15);

      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

      const tableColumn = [
        "Product",
        "Buyer",
        "Price",
        "Quantity",
        "Address",
        "Phone",
        "Date",
      ];

      const tableRows = orders.map((o) => [
        o?.productName || "—",
        o?.buyerName || user?.displayName || "—",
        o?.price !== undefined && o?.price !== null
          ? Number(o.price) === 0
            ? "Free"
            : `$${Number(o.price).toFixed(2)}`
          : "—",
        o?.quantity ?? "—",
        o?.address || "—",
        o?.phone || "—",
        o?.date ? new Date(o.date).toLocaleDateString() : "—",
      ]);

      const autoTable = autoTablePlugin.default || autoTablePlugin;
      if (typeof autoTable === "function") {
        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 30,
          styles: { fontSize: 8 },
          headStyles: { fillColor: [255, 140, 0] },
          margin: { top: 30 },
        });
      } else if (typeof doc.autoTable === "function") {
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 30,
          styles: { fontSize: 8 },
          headStyles: { fillColor: [255, 140, 0] },
          margin: { top: 30 },
        });
      } else {
        throw new Error(
          "autoTable is not available. Please ensure jspdf-autotable is properly installed."
        );
      }

      doc.save(`orders-report-${new Date().toISOString().split("T")[0]}.pdf`);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
            My Orders
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            View and manage all your orders and adoption requests.
          </p>
        </div>
        <button
          onClick={downloadPDF}
          disabled={!orders || orders.length === 0}
          className="w-full sm:w-auto px-5 py-2.5 bg-orange-500 dark:bg-orange-600 text-white rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-200 text-sm sm:text-base font-semibold disabled:cursor-not-allowed"
        >
          Download Report
        </button>
      </div>

      <div className="mt-4 overflow-x-auto -mx-3 sm:mx-0">
        <table className="w-full table-auto min-w-[720px]">
          <thead className="text-left bg-gray-50/60 dark:bg-gray-800/70">
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <th className="text-gray-800 dark:text-gray-200 py-3 px-4 font-semibold">
                Product
              </th>
              <th className="text-gray-800 dark:text-gray-200 py-3 px-4 font-semibold">
                Buyer
              </th>
              <th className="text-gray-800 dark:text-gray-200 py-3 px-4 font-semibold">
                Price
              </th>
              <th className="text-gray-800 dark:text-gray-200 py-3 px-4 font-semibold">
                Quantity
              </th>
              <th className="text-gray-800 dark:text-gray-200 py-3 px-4 font-semibold">
                Address
              </th>
              <th className="text-gray-800 dark:text-gray-200 py-3 px-4 font-semibold">
                Phone
              </th>
              <th className="text-gray-800 dark:text-gray-200 py-3 px-4 font-semibold">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan="7"
                  className="py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  Loading orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  {errorMessage || "No orders yet."}
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr
                  key={o?._id || `${o?.productName}-${o?.date}`}
                  className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200 font-medium">
                    {o?.productName || "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    {o?.buyerName || user?.displayName || "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    {o?.price === 0 || o?.price === "0"
                      ? "Free"
                      : o?.price
                      ? `$${Number(o.price).toFixed(2)}`
                      : "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    {o?.quantity ?? "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    {o?.address || "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    {o?.phone || "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-sm">
                    {o?.date ? new Date(o.date).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

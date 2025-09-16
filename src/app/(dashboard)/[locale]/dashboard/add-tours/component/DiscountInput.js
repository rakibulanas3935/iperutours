import { useState } from "react";

export default function DiscountInput({ onChange, discountData }) {
  const [discount, setDiscount] = useState({
    couponCode: discountData?.couponCode || "",
    discountType: discountData?.discountType || "percentage",
    discountValue: discountData?.discountValue || "",
    validFrom: discountData?.validFrom || "",
    validUntil: discountData?.validUntil || "",
    isActive: discountData?.isActive ?? true,
  });

  const handleChange = (key, value) => {
    const newDiscount = { ...discount, [key]: value };
    setDiscount(newDiscount);
    onChange && onChange(newDiscount); // pass to parent
  };

  return (
    <div className="mb-4 p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-md font-semibold mb-2">Discount</h3>

      {/* Coupon Code */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Coupon Code</label>
        <input
          type="text"
          value={discount.couponCode}
          onChange={(e) => handleChange("couponCode", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
          placeholder="Enter coupon code"
        />
      </div>

      {/* Discount Type */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Discount Type</label>
        <select
          value={discount.discountType}
          onChange={(e) => handleChange("discountType", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
        >
          <option value="percentage">Percentage (%)</option>
          <option value="fixed">Fixed Amount</option>
        </select>
      </div>

      {/* Discount Value */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Discount Value</label>
        <input
          type="number"
          min={0}
          value={discount.discountValue}
          onChange={(e) => handleChange("discountValue", Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
          placeholder="Enter discount value"
        />
      </div>

      {/* Valid From / Until */}
      <div className="mb-3 grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Valid From</label>
          <input
            type="date"
            value={discount.validFrom}
            onChange={(e) => handleChange("validFrom", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Valid Until</label>
          <input
            type="date"
            value={discount.validUntil}
            onChange={(e) => handleChange("validUntil", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
      </div>

      {/* Active Switch */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={discount.isActive}
          onChange={(e) => handleChange("isActive", e.target.checked)}
          id="discountActive"
        />
        <label htmlFor="discountActive" className="text-sm font-medium">Active</label>
      </div>
    </div>
  );
}

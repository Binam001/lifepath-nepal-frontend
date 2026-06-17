"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Award,
  Clock,
  RefreshCw,
  Search,
  ChevronDown,
  Filter,
} from "lucide-react";
import PageTitle from "../ui/PageTitle";

interface Donor {
  id: string;
  rank: string;
  name: string;
  avatar: string;
  lastDonationDate: string;
  donationsCount: number;
  totalAmount: number;
  type: "top" | "recent" | "recurring" | "standard";
}

const donorData: Donor[] = [
  {
    id: "1",
    rank: "01",
    name: "Aakash Dahal",
    avatar: "/students/alish_img.jpeg",
    lastDonationDate: "27 Oct, 2027",
    donationsCount: 12,
    totalAmount: 125000,
    type: "recent",
  },
  {
    id: "2",
    rank: "02",
    name: "Biraj Shrestha",
    avatar: "/students/binam.jpeg",
    lastDonationDate: "16 Jun, 2026",
    donationsCount: 13,
    totalAmount: 450000,
    type: "top",
  },
  {
    id: "3",
    rank: "03",
    name: "Sameer Adhikari",
    avatar: "/students/Saurav.jpeg",
    lastDonationDate: "17 Apr, 2027",
    donationsCount: 32,
    totalAmount: 25000,
    type: "recurring",
  },
  {
    id: "4",
    rank: "04",
    name: "Aarati Shah",
    avatar: "/students/woman3.png",
    lastDonationDate: "16 May, 2027",
    donationsCount: 10,
    totalAmount: 15000,
    type: "standard",
  },
  {
    id: "5",
    rank: "05",
    name: "Aman Regmi",
    avatar: "/students/Aayush.jpeg",
    lastDonationDate: "12 Feb, 2027",
    donationsCount: 5,
    totalAmount: 85000,
    type: "standard",
  },
  {
    id: "6",
    rank: "06",
    name: "Sunil Tamang",
    avatar: "/students/sujan.jpeg",
    lastDonationDate: "05 Mar, 2027",
    donationsCount: 8,
    totalAmount: 60000,
    type: "standard",
  },
  {
    id: "7",
    rank: "07",
    name: "Suraj Bhandari",
    avatar: "/students/Sijan.jpeg",
    lastDonationDate: "22 Jan, 2027",
    donationsCount: 15,
    totalAmount: 220000,
    type: "standard",
  },
];

interface DonorHighlightCardProps {
  icon: React.ReactNode;
  title: string;
  name: string;
  image: string;
  amountLabel: string;
  amountNumber: string | React.ReactNode;
  variant: "recent" | "top" | "recurring";
}

const DonorHighlightCard = ({
  icon,
  title,
  name,
  image,
  amountLabel,
  amountNumber,
  variant,
}: DonorHighlightCardProps) => {
  const isTop = variant === "top";

  return (
    <div
      className={`relative group transition-all duration-300 transform w-full rounded-3xl border p-6 shadow-xs hover:shadow-md hover:-translate-y-1.5 ${
        isTop
          ? "border-primary/20 bg-linear-to-b from-blue-50/35 to-white z-10 order-1 md:order-2"
          : variant === "recent"
            ? "border-zinc-100 bg-white order-2 md:order-1"
            : "border-zinc-100 bg-white order-3 md:order-3"
      }`}
    >
      <div
        className={`absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full text-xs whitespace-nowrap font-semibold shadow-xs ${
          isTop
            ? "bg-primary text-white px-4 py-2 border border-primary/10"
            : variant === "recent"
              ? "bg-blue-50 text-blue-700 px-3.5 py-1.5 border border-blue-100"
              : "bg-emerald-50 text-emerald-700 px-3.5 py-1.5 border border-emerald-100"
        }`}
      >
        {icon}
        <span>{title}</span>
      </div>

      <div className="text-center mt-3">
        <div
          className={`relative mx-auto rounded-full overflow-hidden mb-4 border-3 border-zinc-50 ${
            isTop ? "size-24 ring-3 ring-primary/10" : "size-20"
          }`}
        >
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <h3
          className={`font-semibold text-black text-center ${
            isTop
              ? "text-xl"
              : variant === "recent"
                ? "text-lg group-hover:text-primary transition-colors"
                : "text-lg group-hover:text-emerald-600 transition-colors"
          }`}
        >
          {name}
        </h3>

        <div
          className={`inline-block w-full text-center ${
            isTop
              ? "bg-primary/5 border border-primary/10 rounded-2xl px-6 py-3 mt-5"
              : "bg-zinc-50 border border-zinc-100/80 rounded-xl px-5 py-2.5 mt-4"
          }`}
        >
          <span
            className={`block text-[11px] uppercase tracking-wider ${
              isTop
                ? "text-primary/75 font-semibold"
                : "text-zinc-500 font-medium"
            }`}
          >
            {amountLabel}
          </span>
          <span
            className={`block font-bold mt-0.5 ${
              isTop ? "text-xl text-primary" : "text-md text-zinc-900"
            }`}
          >
            {amountNumber}
          </span>
        </div>
      </div>
    </div>
  );
};

const TopDonorSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"amount" | "donations" | "name">(
    "amount",
  );
  const [filterType, setFilterType] = useState<
    "all" | "top" | "recent" | "recurring"
  >("all");

  // Calculate dynamic rank based on total amount across all donors
  const rankedDonorsMap = new Map<string, string>(
    [...donorData]
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .map((donor, idx) => [donor.id, String(idx + 1).padStart(2, "0")]),
  );

  const formatCurrency = (val: number) => {
    const formattedVal = new Intl.NumberFormat("en-NP").format(val);
    return `NRs. ${formattedVal}`;
  };

  // Filter and sort the donor list
  const filteredDonors = donorData
    .filter((donor) => {
      const matchesSearch = donor.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      if (filterType === "all") return matchesSearch;
      return matchesSearch && donor.type === filterType;
    })
    .sort((a, b) => {
      if (sortBy === "amount") {
        return b.totalAmount - a.totalAmount;
      }
      if (sortBy === "donations") {
        return b.donationsCount - a.donationsCount;
      }
      return a.name.localeCompare(b.name);
    });

  // Extract the specific highlighted donors
  const recentDonor =
    donorData.find((d) => d.type === "recent") || donorData[0];
  const topDonor = donorData.find((d) => d.type === "top") || donorData[1];
  const recurringDonor =
    donorData.find((d) => d.type === "recurring") || donorData[2];

  return (
    <section className="relative px-4 md:px-8 py-8 xl:py-16 bg-zinc-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <PageTitle
          title="Honoring Our Generous Contributors"
          subtitle="Every contribution fuels education, training, and career mentorship for youths across Nepal. We are extremely grateful to our community members."
        />

        {/* Top Designation Showcase Cards */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto">
          <DonorHighlightCard
            variant="recent"
            title="Recent Donor"
            name={recentDonor.name}
            image={recentDonor.avatar}
            amountLabel="Donation Amount"
            amountNumber={formatCurrency(recentDonor.totalAmount)}
            icon={<Clock size={13} className="text-blue-600" />}
          />

          <DonorHighlightCard
            variant="top"
            title="TOP DONOR"
            name={topDonor.name}
            image={topDonor.avatar}
            amountLabel="Total Contributions"
            amountNumber={formatCurrency(topDonor.totalAmount)}
            icon={<Award size={14} className="text-amber-300 fill-amber-300" />}
          />

          <DonorHighlightCard
            variant="recurring"
            title="Recurring Donor"
            name={recurringDonor.name}
            image={recurringDonor.avatar}
            amountLabel="Monthly Support"
            amountNumber={
              <>
                {formatCurrency(recurringDonor.totalAmount)}
                <span className="text-xs text-zinc-500 font-normal"> / mo</span>
              </>
            }
            icon={<RefreshCw size={13} className="text-emerald-600" />}
          />
        </div>

        {/* Filter controls row */}
        <div className="flex flex-col md:flex-row md:items-center sm:justify-between gap-4 max-w-5xl mx-auto mb-6">
          <div>
            <h3 className="text-xl font-bold text-zinc-900">All Donors</h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Showing {filteredDonors.length} generous supporters
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-auto">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-zinc-400" />
              </span>
              <input
                type="text"
                placeholder="Search donor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-60 pl-9 pr-4 py-2 border border-zinc-200 rounded-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
              />
            </div>

            {/* Sort Select */}
            <div className="relative w-full md:w-auto">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={14} className="text-zinc-400" />
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full md:w-48 pl-9 pr-8 py-2 border border-zinc-200 rounded-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer shadow-2xs font-medium text-zinc-700"
              >
                <option value="amount">Sort by Amount</option>
                {/* <option value="donations">Sort by Donations</option> */}
                <option value="name">Sort by Name</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />
            </div>

            {/* Filter Toggle */}
            {/* <div className="flex rounded-full border border-zinc-200 p-0.5 bg-zinc-50 shadow-2xs">
              <button
                onClick={() => setFilterType("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filterType === "all"
                    ? "bg-white text-zinc-900 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType("top")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filterType === "top"
                    ? "bg-white text-zinc-900 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                Top
              </button>
              <button
                onClick={() => setFilterType("recurring")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filterType === "recurring"
                    ? "bg-white text-zinc-900 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                Recurring
              </button>
            </div> */}
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="max-w-5xl mx-auto">
          <div className="overflow-hidden border border-zinc-200/80 rounded-2xl bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50/75 border-b border-zinc-200/70 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    <th className="py-4 px-6 text-center w-20 whitespace-nowrap">
                      Rank
                    </th>
                    <th className="py-4 px-6 whitespace-nowrap">Donor</th>
                    <th className="py-4 px-6 whitespace-nowrap">
                      Last Donation
                    </th>
                    {/* <th className="py-4 px-6 text-center whitespace-nowrap">Donations</th> */}
                    <th className="py-4 px-6 text-right whitespace-nowrap">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-700 text-sm font-medium">
                  {filteredDonors.length > 0 ? (
                    filteredDonors.map((donor, idx) => (
                      <tr
                        key={donor.id}
                        className="hover:bg-zinc-50/50 transition-colors duration-200"
                      >
                        {/* Rank */}
                        <td className="py-4 px-6 text-center font-mono text-zinc-400">
                          {rankedDonorsMap.get(donor.id)}
                        </td>

                        {/* Donor Info */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="relative size-10 rounded-full overflow-hidden border border-zinc-100 bg-zinc-50 flex-shrink-0">
                              <Image
                                src={donor.avatar}
                                alt={donor.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <span className="font-semibold text-zinc-900 block whitespace-nowrap">
                                {donor.name}
                              </span>
                              {donor.type !== "standard" && (
                                <span
                                  className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-sm mt-0.5 uppercase leading-none ${
                                    donor.type === "top"
                                      ? "bg-amber-50 text-amber-700"
                                      : donor.type === "recent"
                                        ? "bg-blue-50 text-blue-700"
                                        : "bg-emerald-50 text-emerald-700"
                                  }`}
                                >
                                  {donor.type} donor
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Last Donation Date */}
                        <td className="py-4 px-6 text-zinc-600 whitespace-nowrap">
                          {donor.lastDonationDate}
                        </td>

                        {/* Donations Count */}
                        {/* <td className="py-4 px-6 text-center font-mono text-zinc-500 whitespace-nowrap">
                          {donor.donationsCount}
                        </td> */}

                        {/* Total Amount */}
                        <td className="py-4 px-6 text-right font-semibold text-zinc-900 font-mono whitespace-nowrap">
                          {formatCurrency(donor.totalAmount)}
                          {/* {donor.type === "recurring" && (
                            <span className="text-[10px] text-zinc-400 font-normal">
                              {" "}
                              /mo
                            </span>
                          )} */}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-12 text-center text-zinc-400 font-medium"
                      >
                        No donors found matching "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopDonorSection;

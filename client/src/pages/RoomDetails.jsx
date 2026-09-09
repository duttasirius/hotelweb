import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData } from "../assets/assets";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContex";
import toast from "react-hot-toast";
import axios from "axios";

const RoomDetails = () => {
  const { id } = useParams();

  // App-level values: routing, authentication token access and the room collection.
  const { navigate, getToken, rooms } = useAppContext();

  // Local UI state: selected dates, guest count, gallery image and booking progress.
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [guest, setGuest] = useState(1);
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  // Generate today's date once so guests cannot choose a past check-in date.
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  // Any date change invalidates the previous availability check.
  useEffect(() => {
    setIsAvailable(false);
  }, [checkInDate, checkOutDate]);

  // Resolve the room from shared state whenever the URL id or room list changes.
  useEffect(() => {
    const selectedRoom = rooms.find((item) => item._id === id);

    if (selectedRoom) {
      setRoom(selectedRoom);
      setMainImage(selectedRoom.images?.[0] || "");
    }
  }, [id, rooms]);

  // Call the backend to verify that the selected room is free for the chosen dates.
  const checkAvailability = async () => {
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select both check-in and check-out dates.");
      return false;
    }

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      toast.error("Check-out must be after check-in.");
      return false;
    }

    setIsChecking(true);

    try {
      const { data } = await axios.post("/api/bookings/check-availability", {
        room: id,
        checkInDate,
        checkOutDate,
      });

      if (data.success) {
        setIsAvailable(true);
        toast.success("Room is available.");
        return true;
      }

      setIsAvailable(false);
      toast.error(data.message || "Room is not available for these dates.");
      return false;
    } catch (error) {
      console.error("Availability check failed:", error);
      setIsAvailable(false);
      toast.error(
        error.response?.data?.message ||
          "Unable to check availability right now.",
      );
      return false;
    } finally {
      setIsChecking(false);
    }
  };

  // Submit the booking request. The first click checks availability; the next books the room.
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!checkInDate || !checkOutDate) {
      toast.error("Please select your stay dates.");
      return;
    }

    if (Number(guest) < 1) {
      toast.error("Guests must be at least 1.");
      return;
    }

    try {
      const token = await getToken();

      if (!isAvailable) {
        await checkAvailability();
        return;
      }

      setIsBooking(true);

      const { data } = await axios.post(
        "/api/bookings/book",
        {
          room: id,
          checkInDate,
          checkOutDate,
          guest: Number(guest),
          paymentMethod: "Pay At Hotel",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message || "Booking confirmed.");
        navigate("/my-bookings");
      } else {
        toast.error(data.message || "Unable to complete booking.");
      }
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error(
        error.response?.data?.message || "Unable to complete your booking.",
      );
    } finally {
      setIsBooking(false);
    }
  };

  // Loading state shown while the room is being resolved from shared application data.
  if (!room) {
    return (
      <main className="min-h-[70vh] bg-slate-50 px-4 py-20">
        <div className="mx-auto flex min-h-[40vh] max-w-7xl items-center justify-center">
          <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
            <p className="text-sm font-semibold text-slate-900">
              Loading room details
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Preparing your stay information...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    // Premium page shell: a soft neutral background makes the white content cards stand out.
    <main className="min-h-screen bg-slate-50 pb-24 text-slate-900">
      {/* Header: establishes hotel, room type, trust signals and location before users see the gallery. */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-12">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
              Premium stay
            </span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Instant booking
            </span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              20% OFF
            </span>
          </div>

          <div>
            <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {room.hotel.name}
              <span className="mt-1 block text-lg font-medium text-slate-500 sm:ml-3 sm:mt-0 sm:inline sm:text-2xl">
                {room.roomType}
              </span>
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <StarRating />
                <span className="font-semibold text-slate-800">4.8</span>
                <span className="text-slate-500">200+ reviews</span>
              </div>

              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

              <div className="flex items-center gap-2 text-slate-500">
                <img src={assets.locationIcon} alt="" className="h-4 w-4" />
                <span>{room.hotel.address}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery: large feature image plus responsive clickable thumbnails. */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="group relative min-h-[280px] overflow-hidden rounded-[1.75rem] bg-slate-200 shadow-xl shadow-slate-200/60 sm:min-h-[440px] lg:min-h-[560px]">
            <img
              src={mainImage}
              alt={`${room.hotel.name} ${room.roomType}`}
              className="h-full min-h-[280px] w-full object-cover transition duration-700 group-hover:scale-[1.02] sm:min-h-[440px] lg:min-h-[560px]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Your room
              </p>
              <p className="mt-1 text-lg font-semibold text-white sm:text-xl">
                {room.roomType}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-1">
            {room.images?.map((image, index) => {
              const active = mainImage === image;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setMainImage(image)}
                  aria-label={`View room image ${index + 1}`}
                  className={`group relative min-h-28 overflow-hidden rounded-2xl border bg-white text-left transition sm:min-h-36 lg:min-h-0 ${
                    active
                      ? "border-blue-500 ring-2 ring-blue-500/20"
                      : "border-slate-200 hover:-translate-y-0.5 hover:shadow-lg"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full min-h-28 w-full object-cover transition duration-500 group-hover:scale-105 sm:min-h-36 lg:min-h-0"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 pb-2 pt-8 text-xs font-medium text-white">
                    Image {index + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main layout: benefits/content on the left and a sticky booking card on desktop. */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="space-y-8">
            {/* Amenities: converts the raw amenities array into compact, scannable benefit cards. */}
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Included with your stay
              </p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                  What this room offers
                </h2>
                <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 sm:inline-flex">
                  {room.amenities?.length || 0} amenities
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {room.amenities?.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3.5 transition hover:border-blue-100 hover:bg-blue-50/50"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <img
                        src={facilityIcons[item]}
                        alt=""
                        className="h-5 w-5 object-contain"
                      />
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room features: presents reusable specification data as elevated information cards. */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Room highlights
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Designed around your comfort
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {roomCommonData.map((spec, index) => (
                  <article
                    key={`${spec.title}-${index}`}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                      <img
                        src={spec.icon}
                        alt=""
                        className="h-7 w-7 object-contain"
                      />
                    </div>
                    <h3 className="mt-4 font-semibold text-slate-900">
                      {spec.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {spec.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Description: gives the guest a clean narrative about the room and stay. */}
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                The stay
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                About this room
              </h2>
              <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                Experience comfort and elegance in our Deluxe Room, thoughtfully
                designed for both relaxation and convenience. Featuring a plush
                king-size bed, modern furnishings, large windows with beautiful
                city views, high-speed Wi-Fi, air conditioning, a flat-screen
                TV, a work desk, and a spacious private bathroom with premium
                toiletries.
              </p>
            </div>

            {/* Host block: adds trust and a clear secondary contact action. */}
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                    alt="Host"
                    className="h-16 w-16 rounded-2xl object-cover ring-4 ring-slate-100 sm:h-20 sm:w-20"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                      Your host
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-950 sm:text-xl">
                      Hosted by John Doe
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Superhost · 5 years hosting experience
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <StarRating />
                      <span className="text-xs font-semibold text-slate-600">
                        200+ reviews
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  Contact host
                </button>
              </div>
            </div>
          </div>

          {/* Booking card: keeps the price and primary conversion action visible on large screens. */}
          <aside id="booking-panel" className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/70">
              {/* Price header: strong visual hierarchy makes the main commercial value immediately visible. */}
              <div className="bg-slate-950 p-6 text-white sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  Reserve your stay
                </p>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-4xl font-semibold tracking-tight">
                    ${room.pricePerNight}
                  </span>
                  <span className="pb-1 text-sm text-slate-400">/ night</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  Secure your dates and confirm your room in a few steps.
                </p>
              </div>

              <form onSubmit={onSubmitHandler} className="p-5 sm:p-6">
                <div className="space-y-4">
                  {/* Date controls: guests define the stay window before availability is checked. */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <label className="block">
                      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                        Check in
                      </span>
                      <input
                        id="checkIn"
                        type="date"
                        value={checkInDate}
                        min={today}
                        onChange={(event) => setCheckInDate(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                        Check out
                      </span>
                      <input
                        id="checkOut"
                        type="date"
                        value={checkOutDate}
                        min={checkInDate || today}
                        disabled={!checkInDate}
                        onChange={(event) =>
                          setCheckOutDate(event.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </label>
                  </div>

                  {/* Guest control: keeps the booking quantity valid and easy to understand. */}
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                      Guests
                    </span>
                    <input
                      id="guests"
                      type="number"
                      min="1"
                      value={guest}
                      onChange={(event) =>
                        setGuest(Math.max(1, Number(event.target.value || 1)))
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </label>

                  {/* Booking summary: surfaces the essential values before the user commits. */}
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Nightly rate</span>
                      <span className="font-semibold text-slate-900">
                        ${room.pricePerNight}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-slate-500">Guests</span>
                      <span className="font-semibold text-slate-900">
                        {guest}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-sm">
                      <span className="font-semibold text-slate-900">
                        Booking status
                      </span>
                      <span
                        className={`font-semibold ${
                          isAvailable ? "text-emerald-600" : "text-amber-600"
                        }`}
                      >
                        {isAvailable ? "Available" : "Check dates"}
                      </span>
                    </div>
                  </div>

                  {/* Primary action: one button handles both availability checking and final booking. */}
                  <button
                    type="submit"
                    disabled={isChecking || isBooking}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isChecking || isBooking ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        {isBooking ? "Processing..." : "Checking..."}
                      </>
                    ) : (
                      <>
                        {isAvailable ? "Book now" : "Check availability"}
                        <span aria-hidden="true">→</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs leading-5 text-slate-400">
                    Pay at hotel · Availability is verified by the server before
                    booking.
                  </p>
                </div>
              </form>
            </div>
          </aside>
        </div>
      </section>

      {/* Mobile helper: lets users jump back to the booking card after scrolling through details. */}
      <div className="fixed inset-x-4 bottom-4 z-40 lg:hidden">
        <button
          type="button"
          onClick={() =>
            document
              .getElementById("booking-panel")
              ?.scrollIntoView({ behavior: "smooth", block: "center" })
          }
          className="w-full rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-2xl"
        >
          Reserve from ${room.pricePerNight} / night
        </button>
      </div>
    </main>
  );
};

export default RoomDetails;

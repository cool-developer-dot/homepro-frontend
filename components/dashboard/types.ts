export type BookingStatus = "pending" | "completed" | "cancelled";

export type Booking = {
  id: string;
  serviceName: string;
  dateTimeISO: string;
  status: BookingStatus;
  price: number;
  duration: string;
  address: string;
};


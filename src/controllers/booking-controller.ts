import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getBookingByUserId(req: AuthenticatedRequest, res: Response) {
  const bookingData = await bookingService.getBookingByUserId(req.userId);
  res.status(httpStatus.OK).send(bookingData);
}
export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const userId: number = req.userId;
  const roomId: number = req.body.roomId;
  const booking = await bookingService.postBooking(roomId, userId);
  res.status(httpStatus.OK).send({ bookingId: booking.id });
}
export async function putRoomChange(req: AuthenticatedRequest, res: Response) {
  const roomId: number = req.body.roomId;
  const userId: number = req.userId;
  const userBookedRoom = await bookingService.getBookingByUserId(userId);
  const booking = await bookingService.putRoomChange(roomId, userBookedRoom.id);
  res.status(httpStatus.OK).send({ bookingId: booking.id });
}

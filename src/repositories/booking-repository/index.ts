import { prisma } from "@/config";

async function findFirstUserBookedRoom(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId
    },
    select: {
      id: true,
      Room: true
    }
  });
}
async function findRoomById(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId
    }
  });
}
async function createBooking(roomId: number, userId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId
    },
    select: {
      id: true
    }
  });
}

const bookingRepository = {
  findFirstUserBookedRoom,
  findRoomById,
  createBooking
};

export default bookingRepository;

import type { ApiResponse } from '@/types/apiResponse';
import axiosClient from '@/config/axiosClient';

const AVAILABILITY_BASE_URL = '/api/v1/room-availability';

export interface RoomAvailabilityCheck {
  roomId: string;
  available: boolean;
  conflictingBookings?: string[];
}

export interface AvailableRoomsRequest {
  roomTypeId?: string;
  branchId: string;
  checkinDate: string;  // ISO date string
  checkoutDate: string; // ISO date string
}

export const roomAvailabilityApi = {
  // Check if a single room is available
  checkRoomAvailability: async (
    roomId: string,
    checkinDate: string,
    checkoutDate: string,
    excludeBookingId?: string
  ) => {
    const response = await axiosClient.get<ApiResponse<boolean>>(
      `${AVAILABILITY_BASE_URL}/check/${roomId}`,
      {
        params: {
          checkinDate,
          checkoutDate,
          excludeBookingId,
        },
      }
    );
    return response.data;
  },

  // Check multiple rooms at once
  checkMultipleRooms: async (
    roomIds: string[],
    checkinDate: string,
    checkoutDate: string
  ) => {
    const response = await axiosClient.post<ApiResponse<Record<string, boolean>>>(
      `${AVAILABILITY_BASE_URL}/check-multiple`,
      {
        roomIds,
        checkinDate,
        checkoutDate,
      }
    );
    return response.data;
  },

  // Get list of available rooms for a room type
  findAvailableRooms: async (params: AvailableRoomsRequest) => {
    const response = await axiosClient.get<ApiResponse<any[]>>(
      `${AVAILABILITY_BASE_URL}/available-rooms`,
      { params }
    );
    return response.data;
  },

  // Get count of available rooms
  countAvailableRooms: async (
    roomTypeId: string,
    checkinDate: string,
    checkoutDate: string,
    branchId: string
  ) => {
    const response = await axiosClient.get<ApiResponse<number>>(
      `${AVAILABILITY_BASE_URL}/count`,
      {
        params: {
          roomTypeId,
          checkinDate,
          checkoutDate,
          branchId,
        },
      }
    );
    return response.data;
  },
};

export default roomAvailabilityApi;

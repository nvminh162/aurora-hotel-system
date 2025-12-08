import { useState, useEffect } from 'react';
import roomAvailabilityApi from '@/services/roomAvailabilityApi';
import { toast } from 'sonner';

interface UseRoomAvailabilityProps {
  roomIds: string[];
  checkIn: string;
  checkOut: string;
  enabled?: boolean;
}

export const useRoomAvailability = ({
  roomIds,
  checkIn,
  checkOut,
  enabled = true,
}: UseRoomAvailabilityProps) => {
  const [availableRoomIds, setAvailableRoomIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAvailability = async () => {
      if (!enabled || roomIds.length === 0 || !checkIn || !checkOut) {
        setAvailableRoomIds(new Set(roomIds));
        return;
      }

      try {
        setLoading(true);
        const response = await roomAvailabilityApi.checkMultipleRooms(
          roomIds,
          checkIn,
          checkOut
        );

        if (response.result) {
          const availableIds = new Set(
            Object.entries(response.result)
              .filter(([_, isAvailable]) => isAvailable)
              .map(([roomId]) => roomId)
          );
          setAvailableRoomIds(availableIds);
        } else {
          setAvailableRoomIds(new Set(roomIds));
        }
      } catch (error) {
        console.error('Failed to check room availability:', error);
        toast.error('Không thể kiểm tra phòng trống');
        // On error, show all rooms
        setAvailableRoomIds(new Set(roomIds));
      } finally {
        setLoading(false);
      }
    };

    checkAvailability();
  }, [roomIds.join(','), checkIn, checkOut, enabled]);

  const isRoomAvailable = (roomId: string) => availableRoomIds.has(roomId);

  return {
    availableRoomIds,
    isRoomAvailable,
    loading,
  };
};

package com.archeryonly.quiver.reservations;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record CreateReservationDTO(boolean rental, Instant startsAt, Instant endsAt, List<UUID> lanes, String notes) {}

package com.archeryonly.quiver.reservations;

import com.archeryonly.quiver.lanes.Lane;
import java.time.Instant;
import java.util.Set;

public record ReservationDTO(
        Instant startsAt,
        Instant endsAt,
        Boolean rental,
        String notes,
        Instant createdAt,
        Instant updatedAt,
        Set<Lane> lanes) {
    public Reservation toEntity() {
        final var reservation = new Reservation();
        reservation.setStartsAt(this.startsAt);
        reservation.setEndsAt(this.endsAt);
        reservation.setRental(this.rental);
        reservation.setNotes(this.notes);
        reservation.setCreatedAt(this.createdAt);
        reservation.setUpdatedAt(this.updatedAt);
        reservation.setLanes(this.lanes);
        return reservation;
    }
}

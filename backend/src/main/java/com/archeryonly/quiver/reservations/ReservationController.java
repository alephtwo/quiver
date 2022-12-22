package com.archeryonly.quiver.reservations;

import com.archeryonly.quiver.lanes.LaneRepository;
import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("reservations")
public class ReservationController {
    private final ReservationRepository repository;

    private final LaneRepository laneRepository;

    @Autowired
    public ReservationController(final ReservationRepository repository, final LaneRepository laneRepository) {
        this.repository = repository;
        this.laneRepository = laneRepository;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Reservation> list() {
        return repository.findAll();
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Reservation> get(@PathVariable final UUID id) {
        final var reservation = repository.findById(id);
        return reservation
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UUID> create(@RequestBody final CreateReservationDTO dto) {
        final var reservation = new Reservation();
        reservation.setRental(dto.rental());
        reservation.setStartsAt(dto.startsAt());
        reservation.setEndsAt(dto.endsAt());
        reservation.setLanes(Set.copyOf(laneRepository.findAllById(dto.lanes())));
        reservation.setNotes(dto.notes());
        reservation.setCreatedAt(Instant.now());
        reservation.setUpdatedAt(Instant.now());

        final var persisted = repository.save(reservation);
        final var location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(persisted.getId())
                .toUri();

        return ResponseEntity.created(location).body(persisted.getId());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable final UUID id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

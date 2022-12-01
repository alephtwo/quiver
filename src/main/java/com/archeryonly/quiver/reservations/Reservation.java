package com.archeryonly.quiver.reservations;

import com.archeryonly.quiver.lanes.Lane;
import com.archeryonly.quiver.users.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "reservations")
public class Reservation {
    private UUID id;
    private Instant startsAt;
    private Instant endsAt;
    private Boolean rental;
    private String notes;
    private Instant createdAt;
    private User createdBy;
    private Instant updatedAt;
    private User updatedBy;
    private Set<Lane> lanes;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    public UUID getId() {
        return id;
    }

    public void setId(final UUID id) {
        this.id = id;
    }

    @Column(name = "starts_at")
    public Instant getStartsAt() {
        return startsAt;
    }

    public void setStartsAt(final Instant startsAt) {
        this.startsAt = startsAt;
    }

    @Column(name = "ends_at")
    public Instant getEndsAt() {
        return endsAt;
    }

    public void setEndsAt(final Instant endsAt) {
        this.endsAt = endsAt;
    }

    @Column(name = "rental")
    public Boolean getRental() {
        return rental;
    }

    public void setRental(final Boolean rental) {
        this.rental = rental;
    }

    @Column(name = "notes")
    public String getNotes() {
        return notes;
    }

    public void setNotes(final String notes) {
        this.notes = notes;
    }

    @Column(name = "created_at")
    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(final Instant createdAt) {
        this.createdAt = createdAt;
    }

    @ManyToOne
    @JoinColumn(name = "created_by")
    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(final User createdBy) {
        this.createdBy = createdBy;
    }

    @Column(name = "updated_at")
    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(final Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    @ManyToOne
    @JoinColumn(name = "updated_by")
    public User getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(final User updatedBy) {
        this.updatedBy = updatedBy;
    }

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "lane_reservations",
            joinColumns = {@JoinColumn(name = "reservation_id")},
            inverseJoinColumns = {@JoinColumn(name = "lane_id")})
    public Set<Lane> getLanes() {
        return lanes;
    }

    public void setLanes(final Set<Lane> lanes) {
        this.lanes = lanes;
    }
}

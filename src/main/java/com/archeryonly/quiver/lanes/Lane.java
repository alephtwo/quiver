package com.archeryonly.quiver.lanes;

import com.archeryonly.quiver.users.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "lanes")
public class Lane {
    private UUID id;
    private Integer number;
    private String notes;
    private Instant createdAt;
    private User createdBy;
    private Instant updatedAt;
    private User updatedBy;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    public UUID getId() {
        return id;
    }

    public void setId(final UUID id) {
        this.id = id;
    }

    @Column(name = "number")
    public Integer getNumber() {
        return number;
    }

    public void setNumber(final Integer number) {
        this.number = number;
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
}

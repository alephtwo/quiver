defmodule Quiver.ReservationsTest do
  use Quiver.DataCase

  alias Quiver.Reservations

  describe "reservations" do
    alias Quiver.Reservations.Reservation
    import Quiver.ReservationsFixtures

    @invalid_attrs %{ends_at: nil, notes: nil, rental: nil, starts_at: nil}

    test "list_reservations/0 returns all reservations" do
      reservation =
        reservation_fixture()
        |> Repo.preload(:lanes)

      assert Reservations.list_reservations() == [reservation]
    end

    test "get_reservation!/1 returns the reservation with given id" do
      reservation = reservation_fixture()
      assert Reservations.get_reservation!(reservation.id) == reservation
    end

    test "create_reservation/1 with valid data creates a reservation" do
      valid_attrs = %{
        ends_at: ~U[2022-11-30 21:24:00.000000Z],
        notes: "some notes",
        rental: true,
        starts_at: ~U[2022-11-30 21:24:00.000000Z]
      }

      assert {:ok, %Reservation{} = reservation} = Reservations.create_reservation(valid_attrs)
      assert reservation.ends_at == ~U[2022-11-30 21:24:00.000000Z]
      assert reservation.notes == "some notes"
      assert reservation.rental == true
      assert reservation.starts_at == ~U[2022-11-30 21:24:00.000000Z]
    end

    test "create_reservation/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Reservations.create_reservation(@invalid_attrs)
    end

    test "update_reservation/2 with valid data updates the reservation" do
      reservation = reservation_fixture()

      update_attrs = %{
        ends_at: ~U[2022-12-01 21:24:00.000000Z],
        notes: "some updated notes",
        rental: false,
        starts_at: ~U[2022-12-01 21:24:00.000000Z]
      }

      assert {:ok, %Reservation{} = reservation} =
               Reservations.update_reservation(reservation, update_attrs)

      assert reservation.ends_at == ~U[2022-12-01 21:24:00.000000Z]
      assert reservation.notes == "some updated notes"
      assert reservation.rental == false
      assert reservation.starts_at == ~U[2022-12-01 21:24:00.000000Z]
    end

    test "update_reservation/2 with invalid data returns error changeset" do
      reservation = reservation_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Reservations.update_reservation(reservation, @invalid_attrs)

      assert reservation == Reservations.get_reservation!(reservation.id)
    end

    test "delete_reservation/1 deletes the reservation" do
      reservation = reservation_fixture()
      assert {:ok, %Reservation{}} = Reservations.delete_reservation(reservation)
      assert_raise Ecto.NoResultsError, fn -> Reservations.get_reservation!(reservation.id) end
    end

    test "change_reservation/1 returns a reservation changeset" do
      reservation = reservation_fixture()
      assert %Ecto.Changeset{} = Reservations.change_reservation(reservation)
    end
  end
end

defmodule Quiver.ReservationsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Quiver.Reservations` context.
  """

  @doc """
  Generate a reservation.
  """
  def reservation_fixture(attrs \\ %{}) do
    {:ok, reservation} =
      attrs
      |> Enum.into(%{
        ends_at: ~U[2022-11-30 21:24:00.000000Z],
        notes: "some notes",
        rental: true,
        starts_at: ~U[2022-11-30 21:24:00.000000Z]
      })
      |> Quiver.Reservations.create_reservation()

    reservation
  end
end

defmodule QuiverWeb.ReservationController do
  use QuiverWeb, :controller

  alias Quiver.Reservations
  alias Quiver.Reservations.Reservation

  def index(conn, _params) do
    reservations = Reservations.list_reservations()
    render(conn, "index.html", reservations: reservations)
  end

  def new(conn, _params) do
    changeset = Reservations.change_reservation(%Reservation{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"reservation" => reservation_params}) do
    case Reservations.create_reservation(adjust_tz(reservation_params)) do
      {:ok, reservation} ->
        conn
        |> put_flash(:info, "Reservation created successfully.")
        |> redirect(to: Routes.reservation_path(conn, :show, reservation))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    reservation = Reservations.get_reservation!(id) |> shift_tz_to_la()
    render(conn, "show.html", reservation: reservation)
  end

  def edit(conn, %{"id" => id}) do
    reservation = Reservations.get_reservation!(id) |> shift_tz_to_la()
    changeset = Reservations.change_reservation(reservation)
    render(conn, "edit.html", reservation: reservation, changeset: changeset)
  end

  def update(conn, %{"id" => id, "reservation" => reservation_params}) do
    reservation = Reservations.get_reservation!(id)

    case Reservations.update_reservation(reservation, adjust_tz(reservation_params)) do
      {:ok, reservation} ->
        conn
        |> put_flash(:info, "Reservation updated successfully.")
        |> redirect(to: Routes.reservation_path(conn, :show, reservation))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", reservation: reservation, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    reservation = Reservations.get_reservation!(id)
    {:ok, _reservation} = Reservations.delete_reservation(reservation)

    conn
    |> put_flash(:info, "Reservation deleted successfully.")
    |> redirect(to: Routes.reservation_path(conn, :index))
  end

  defp adjust_tz(reservation_params) do
    reservation_params
    |> Map.update!("starts_at", &parse_date_as_los_angeles/1)
    |> Map.update!("ends_at", &parse_date_as_los_angeles/1)
  end

  defp shift_tz_to_la(reservation) do
    %Reservation{
      reservation
      | starts_at: reservation.starts_at |> DateTime.shift_zone!("America/Los_Angeles"),
        ends_at: reservation.ends_at |> DateTime.shift_zone!("America/Los_Angeles")
    }
  end

  defp parse_date_as_los_angeles(str) do
    # append the seconds so it's a valid iso 8601 time
    (str <> ":00")
    |> NaiveDateTime.from_iso8601!()
    |> DateTime.from_naive!("America/Los_Angeles")
  end
end

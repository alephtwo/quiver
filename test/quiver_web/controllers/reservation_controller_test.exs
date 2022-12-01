defmodule QuiverWeb.ReservationControllerTest do
  use QuiverWeb.ConnCase

  import Quiver.ReservationsFixtures

  @create_attrs %{
    ends_at: ~U[2022-11-30 21:24:00.000000Z],
    notes: "some notes",
    rental: true,
    starts_at: ~U[2022-11-30 21:24:00.000000Z]
  }
  @update_attrs %{
    ends_at: ~U[2022-12-01 21:24:00.000000Z],
    notes: "some updated notes",
    rental: false,
    starts_at: ~U[2022-12-01 21:24:00.000000Z]
  }
  @invalid_attrs %{ends_at: nil, notes: nil, rental: nil, starts_at: nil}

  describe "index" do
    test "lists all reservations", %{conn: conn} do
      conn = get(conn, Routes.reservation_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Reservations"
    end
  end

  describe "new reservation" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.reservation_path(conn, :new))
      assert html_response(conn, 200) =~ "New Reservation"
    end
  end

  describe "create reservation" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.reservation_path(conn, :create), reservation: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.reservation_path(conn, :show, id)

      conn = get(conn, Routes.reservation_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Reservation"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.reservation_path(conn, :create), reservation: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Reservation"
    end
  end

  describe "edit reservation" do
    setup [:create_reservation]

    test "renders form for editing chosen reservation", %{conn: conn, reservation: reservation} do
      conn = get(conn, Routes.reservation_path(conn, :edit, reservation))
      assert html_response(conn, 200) =~ "Edit Reservation"
    end
  end

  describe "update reservation" do
    setup [:create_reservation]

    test "redirects when data is valid", %{conn: conn, reservation: reservation} do
      conn =
        put(conn, Routes.reservation_path(conn, :update, reservation), reservation: @update_attrs)

      assert redirected_to(conn) == Routes.reservation_path(conn, :show, reservation)

      conn = get(conn, Routes.reservation_path(conn, :show, reservation))
      assert html_response(conn, 200) =~ "some updated notes"
    end

    test "renders errors when data is invalid", %{conn: conn, reservation: reservation} do
      conn =
        put(conn, Routes.reservation_path(conn, :update, reservation), reservation: @invalid_attrs)

      assert html_response(conn, 200) =~ "Edit Reservation"
    end
  end

  describe "delete reservation" do
    setup [:create_reservation]

    test "deletes chosen reservation", %{conn: conn, reservation: reservation} do
      conn = delete(conn, Routes.reservation_path(conn, :delete, reservation))
      assert redirected_to(conn) == Routes.reservation_path(conn, :index)

      assert_error_sent 404, fn ->
        get(conn, Routes.reservation_path(conn, :show, reservation))
      end
    end
  end

  defp create_reservation(_) do
    reservation = reservation_fixture()
    %{reservation: reservation}
  end
end

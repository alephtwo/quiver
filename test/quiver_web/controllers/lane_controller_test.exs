defmodule QuiverWeb.LaneControllerTest do
  use QuiverWeb.ConnCase

  import Quiver.LanesFixtures

  @create_attrs %{notes: "some notes", number: 42}
  @update_attrs %{notes: "some updated notes", number: 43}
  @invalid_attrs %{notes: nil, number: nil}

  describe "index" do
    test "lists all lanes", %{conn: conn} do
      conn = get(conn, Routes.lane_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Lanes"
    end
  end

  describe "new lane" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.lane_path(conn, :new))
      assert html_response(conn, 200) =~ "New Lane"
    end
  end

  describe "create lane" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.lane_path(conn, :create), lane: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.lane_path(conn, :show, id)

      conn = get(conn, Routes.lane_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Lane"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.lane_path(conn, :create), lane: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Lane"
    end
  end

  describe "edit lane" do
    setup [:create_lane]

    test "renders form for editing chosen lane", %{conn: conn, lane: lane} do
      conn = get(conn, Routes.lane_path(conn, :edit, lane))
      assert html_response(conn, 200) =~ "Edit Lane"
    end
  end

  describe "update lane" do
    setup [:create_lane]

    test "redirects when data is valid", %{conn: conn, lane: lane} do
      conn = put(conn, Routes.lane_path(conn, :update, lane), lane: @update_attrs)
      assert redirected_to(conn) == Routes.lane_path(conn, :show, lane)

      conn = get(conn, Routes.lane_path(conn, :show, lane))
      assert html_response(conn, 200) =~ "some updated notes"
    end

    test "renders errors when data is invalid", %{conn: conn, lane: lane} do
      conn = put(conn, Routes.lane_path(conn, :update, lane), lane: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Lane"
    end
  end

  describe "delete lane" do
    setup [:create_lane]

    test "deletes chosen lane", %{conn: conn, lane: lane} do
      conn = delete(conn, Routes.lane_path(conn, :delete, lane))
      assert redirected_to(conn) == Routes.lane_path(conn, :index)

      assert_error_sent 404, fn ->
        get(conn, Routes.lane_path(conn, :show, lane))
      end
    end
  end

  defp create_lane(_) do
    lane = lane_fixture()
    %{lane: lane}
  end
end

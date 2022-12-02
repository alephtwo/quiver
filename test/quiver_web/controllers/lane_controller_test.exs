defmodule QuiverWeb.LaneControllerTest do
  use QuiverWeb.ConnCase

  describe "index" do
    test "lists all lanes", %{conn: conn} do
      conn = get(conn, Routes.lane_path(conn, :index))
      assert html_response(conn, 200) =~ "Lanes"
    end
  end
end

defmodule QuiverWeb.PageControllerTest do
  use QuiverWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "Quiver"
  end
end

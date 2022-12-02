defmodule QuiverWeb.LaneController do
  use QuiverWeb, :controller
  alias Quiver.Lanes

  def index(conn, _params) do
    lanes = Lanes.list_lanes() |> Enum.sort_by(fn x -> x.number end)
    render(conn, "index.html", lanes: lanes)
  end
end

defmodule QuiverWeb.LaneController do
  use QuiverWeb, :controller

  alias Quiver.Lanes
  alias Quiver.Lanes.Lane

  def index(conn, _params) do
    lanes = Lanes.list_lanes()
    render(conn, "index.html", lanes: lanes)
  end

  def new(conn, _params) do
    changeset = Lanes.change_lane(%Lane{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"lane" => lane_params}) do
    case Lanes.create_lane(lane_params) do
      {:ok, lane} ->
        conn
        |> put_flash(:info, "Lane created successfully.")
        |> redirect(to: Routes.lane_path(conn, :show, lane))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    lane = Lanes.get_lane!(id)
    render(conn, "show.html", lane: lane)
  end

  def edit(conn, %{"id" => id}) do
    lane = Lanes.get_lane!(id)
    changeset = Lanes.change_lane(lane)
    render(conn, "edit.html", lane: lane, changeset: changeset)
  end

  def update(conn, %{"id" => id, "lane" => lane_params}) do
    lane = Lanes.get_lane!(id)

    case Lanes.update_lane(lane, lane_params) do
      {:ok, lane} ->
        conn
        |> put_flash(:info, "Lane updated successfully.")
        |> redirect(to: Routes.lane_path(conn, :show, lane))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", lane: lane, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    lane = Lanes.get_lane!(id)
    {:ok, _lane} = Lanes.delete_lane(lane)

    conn
    |> put_flash(:info, "Lane deleted successfully.")
    |> redirect(to: Routes.lane_path(conn, :index))
  end
end

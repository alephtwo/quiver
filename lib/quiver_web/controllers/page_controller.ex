defmodule QuiverWeb.PageController do
  use QuiverWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end

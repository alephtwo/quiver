defmodule QuiverWeb.LayoutView do
  use QuiverWeb, :view

  # Phoenix LiveDashboard is available only in development by default,
  # so we instruct Elixir to not warn if the dashboard route is missing.
  @compile {:no_warn_undefined, {Routes, :live_dashboard_path, 2}}

  @doc """
  Set css class for active links in the navbar.
  """
  @spec active_link(Plug.Conn.t(), String.t()) :: String.t()
  def active_link(conn, activate_when) do
    case conn.path_info do
      [] when activate_when == "home" ->
        "nav-link active"

      [^activate_when | _] ->
        "nav-link active"

      _ ->
        "nav-link"
    end
  end
end

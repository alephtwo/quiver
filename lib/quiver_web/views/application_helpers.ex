defmodule QuiverWeb.ApplicationHelpers do
  @moduledoc """
  Helpers for the UI that are generally useful.
  """

  @spec format_date(DateTime.t()) :: String.t()
  def format_date(utc_datetime) do
    utc_datetime
    |> DateTime.shift_zone!("America/Los_Angeles")
    |> Calendar.strftime("%Y-%m-%d %H:%M:%S %Z")
  end
end

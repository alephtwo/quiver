defmodule Quiver.Lanes do
  @moduledoc """
  The Lanes context.
  """

  import Ecto.Query, warn: false
  alias Quiver.Lanes.Lane
  alias Quiver.Repo

  @doc """
  Returns the list of lanes.

  ## Examples

      iex> list_lanes()
      [%Lane{}, ...]

  """
  def list_lanes do
    Repo.all(Lane)
  end

  @doc """
  Finds all Lanes with the given ids.
  """
  def find(nil), do: []

  def find(ids) when is_list(ids) do
    Repo.all(from l in Lane, where: l.id in ^ids)
  end

  @doc """
  Gets a single lane.

  Raises `Ecto.NoResultsError` if the Lane does not exist.

  ## Examples

      iex> get_lane!(123)
      %Lane{}

      iex> get_lane!(456)
      ** (Ecto.NoResultsError)

  """
  def get_lane!(id), do: Repo.get!(Lane, id)
end

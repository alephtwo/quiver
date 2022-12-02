defmodule Quiver.Lanes do
  @moduledoc """
  The Lanes context.
  """

  import Ecto.Query, warn: false
  alias Quiver.Repo

  alias Quiver.Lanes.Lane

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
  Gets a single lane.

  Raises `Ecto.NoResultsError` if the Lane does not exist.

  ## Examples

      iex> get_lane!(123)
      %Lane{}

      iex> get_lane!(456)
      ** (Ecto.NoResultsError)

  """
  def get_lane!(id), do: Repo.get!(Lane, id)

  @doc """
  Creates a lane.

  ## Examples

      iex> create_lane(%{field: value})
      {:ok, %Lane{}}

      iex> create_lane(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_lane(attrs \\ %{}) do
    %Lane{}
    |> Lane.changeset(attrs)
    |> Repo.insert()
  end
end

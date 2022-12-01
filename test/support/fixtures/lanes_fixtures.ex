defmodule Quiver.LanesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Quiver.Lanes` context.
  """

  @doc """
  Generate a lane.
  """
  def lane_fixture(attrs \\ %{}) do
    {:ok, lane} =
      attrs
      |> Enum.into(%{
        notes: "some notes",
        number: 42
      })
      |> Quiver.Lanes.create_lane()

    lane
  end
end

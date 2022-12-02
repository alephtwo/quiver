defmodule Quiver.Lanes.Lane do
  @moduledoc """
  A lane represents a given lane in the range.
  """
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "lanes" do
    field :number, :integer
    timestamps(type: :utc_datetime_usec)
  end

  @doc false
  def changeset(lane, attrs) do
    lane
    |> cast(attrs, [:number])
    |> validate_required([:number])
    |> unique_constraint([:number])
    |> validate_number(:number, greater_than: 0)
  end
end

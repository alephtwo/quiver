defmodule Quiver.Reservations.Reservation do
  @moduledoc """
  A reservation represents a chunk of time where certain lanes are blocked off.
  """
  use Ecto.Schema
  import Ecto.Changeset
  alias Quiver.Lanes.Lane

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "reservations" do
    field :ends_at, :utc_datetime_usec
    field :notes, :string
    field :rental, :boolean, default: false
    field :starts_at, :utc_datetime_usec
    many_to_many :lanes, Lane, join_through: "reserved_lanes", on_replace: :delete

    timestamps(type: :utc_datetime_usec)
  end

  @doc false
  def changeset(reservation, attrs) do
    reservation
    |> cast(attrs, [:starts_at, :ends_at, :rental, :notes])
    |> validate_required([:starts_at, :ends_at, :rental])
  end
end

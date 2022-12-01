defmodule Quiver.Repo.Migrations.CreateReservedLanes do
  use Ecto.Migration

  def change do
    create table(:lane_reservations, primary_key: false) do
      add :lane_id, references(:lanes, type: :uuid), primary_key: true
      add :reservation_id, references(:reservations, type: :uuid), primary_key: true
    end
  end
end

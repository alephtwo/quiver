defmodule Quiver.Repo.Migrations.CreateReservedLanes do
  use Ecto.Migration

  def change do
    create table(:reserved_lanes, primary_key: false) do
      add :lane_id, references(:lanes, type: :uuid, on_delete: :delete_all), primary_key: true

      add :reservation_id, references(:reservations, type: :uuid, on_delete: :delete_all),
        primary_key: true
    end

    create index(:reserved_lanes, [:lane_id])
    create index(:reserved_lanes, [:reservation_id])
    create unique_index(:reserved_lanes, [:lane_id, :reservation_id])
  end
end

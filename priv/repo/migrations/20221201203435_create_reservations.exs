defmodule Quiver.Repo.Migrations.CreateReservations do
  use Ecto.Migration

  def change do
    create table(:reservations, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :starts_at, :timestamptz, null: false
      add :ends_at, :timestamptz, null: false
      add :rental, :boolean, null: false
      add :notes, :text
      timestamps(type: :timestamptz)
    end
  end
end

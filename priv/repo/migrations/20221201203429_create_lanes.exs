defmodule Quiver.Repo.Migrations.CreateLanes do
  use Ecto.Migration

  def change do
    create table(:lanes, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :number, :integer, null: false
      add :notes, :text
      timestamps(type: :timestamptz)
    end

    create unique_index(:lanes, [:number])
  end
end

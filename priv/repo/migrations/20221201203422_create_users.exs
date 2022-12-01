defmodule Quiver.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :name, :text, null: false
      timestamps(type: :timestamptz)
    end
  end
end

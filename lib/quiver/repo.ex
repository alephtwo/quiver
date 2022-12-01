defmodule Quiver.Repo do
  use Ecto.Repo,
    otp_app: :quiver,
    adapter: Ecto.Adapters.Postgres
end

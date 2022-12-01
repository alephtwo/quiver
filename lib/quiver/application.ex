defmodule Quiver.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Quiver.Repo,
      # Start the Telemetry supervisor
      QuiverWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Quiver.PubSub},
      # Start the Endpoint (http/https)
      QuiverWeb.Endpoint
      # Start a worker by calling: Quiver.Worker.start_link(arg)
      # {Quiver.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Quiver.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    QuiverWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end

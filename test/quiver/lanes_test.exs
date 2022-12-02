defmodule Quiver.LanesTest do
  use Quiver.DataCase

  alias Quiver.Lanes

  describe "lanes" do
    alias Quiver.Lanes.Lane

    import Quiver.LanesFixtures

    @invalid_attrs %{number: nil}

    test "list_lanes/0 returns all lanes" do
      lane = lane_fixture()
      assert Lanes.list_lanes() == [lane]
    end

    test "get_lane!/1 returns the lane with given id" do
      lane = lane_fixture()
      assert Lanes.get_lane!(lane.id) == lane
    end

    test "create_lane/1 with valid data creates a lane" do
      valid_attrs = %{number: 42}

      assert {:ok, %Lane{} = lane} = Lanes.create_lane(valid_attrs)
      assert lane.number == 42
    end

    test "create_lane/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Lanes.create_lane(@invalid_attrs)
    end
  end
end

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

    test "update_lane/2 with valid data updates the lane" do
      lane = lane_fixture()
      update_attrs = %{number: 43}

      assert {:ok, %Lane{} = lane} = Lanes.update_lane(lane, update_attrs)
      assert lane.number == 43
    end

    test "update_lane/2 with invalid data returns error changeset" do
      lane = lane_fixture()
      assert {:error, %Ecto.Changeset{}} = Lanes.update_lane(lane, @invalid_attrs)
      assert lane == Lanes.get_lane!(lane.id)
    end

    test "delete_lane/1 deletes the lane" do
      lane = lane_fixture()
      assert {:ok, %Lane{}} = Lanes.delete_lane(lane)
      assert_raise Ecto.NoResultsError, fn -> Lanes.get_lane!(lane.id) end
    end

    test "change_lane/1 returns a lane changeset" do
      lane = lane_fixture()
      assert %Ecto.Changeset{} = Lanes.change_lane(lane)
    end
  end
end

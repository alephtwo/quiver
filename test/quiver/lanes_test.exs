defmodule Quiver.LanesTest do
  use Quiver.DataCase
  alias Quiver.Lanes

  describe "lanes" do
    test "list_lanes/0 returns all lanes" do
      assert Enum.count(Lanes.list_lanes()) == 12
    end

    test "get_lane!/1 returns the lane with given id" do
      lane = List.first(Lanes.list_lanes())
      assert Lanes.get_lane!(lane.id) == lane
    end
  end
end

defmodule QuiverWeb.ApplicationHelpersTest do
  use QuiverWeb.ConnCase, async: true
  alias QuiverWeb.ApplicationHelpers

  test "formats dates using expected format" do
    # Make sure it handles DST...
    assert ApplicationHelpers.format_date(~U[2022-12-01 12:00:00.0000Z]) ==
             "2022-12-1 4:00 AM PST"

    assert ApplicationHelpers.format_date(~U[2022-05-01 12:00:00.0000Z]) ==
             "2022-5-1 5:00 AM PDT"
  end
end

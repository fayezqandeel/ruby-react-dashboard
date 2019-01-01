require "application_system_test_case"

class ReportsTest < ApplicationSystemTestCase
  setup do
    @report = reports(:one)
  end

  test "visiting the index" do
    visit reports_url
    assert_selector "h1", text: "Reports"
  end

  test "creating a Report" do
    visit reports_url
    click_on "New Report"

    fill_in "Advertiser", with: @report.advertiser_id
    fill_in "Campaign", with: @report.campaign_id
    fill_in "Clicks", with: @report.clicks
    fill_in "Cost Micros", with: @report.cost_micros
    fill_in "Date", with: @report.date
    fill_in "Impressions", with: @report.impressions
    fill_in "Installs", with: @report.installs
    click_on "Create Report"

    assert_text "Report was successfully created"
    click_on "Back"
  end

  test "updating a Report" do
    visit reports_url
    click_on "Edit", match: :first

    fill_in "Advertiser", with: @report.advertiser_id
    fill_in "Campaign", with: @report.campaign_id
    fill_in "Clicks", with: @report.clicks
    fill_in "Cost Micros", with: @report.cost_micros
    fill_in "Date", with: @report.date
    fill_in "Impressions", with: @report.impressions
    fill_in "Installs", with: @report.installs
    click_on "Update Report"

    assert_text "Report was successfully updated"
    click_on "Back"
  end

  test "destroying a Report" do
    visit reports_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Report was successfully destroyed"
  end
end

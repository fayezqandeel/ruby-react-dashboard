require 'test_helper'

class ReportsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @report = reports(:one)
  end

  test "should get index" do
    get reports_url
    assert_response :success
  end

  test "should get new" do
    get new_report_url
    assert_response :success
  end

  test "should create report" do
    assert_difference('Report.count') do
      post reports_url, params: { report: { advertiser_id: @report.advertiser_id, campaign_id: @report.campaign_id, clicks: @report.clicks, cost_micros: @report.cost_micros, date: @report.date, impressions: @report.impressions, installs: @report.installs } }
    end

    assert_redirected_to report_url(Report.last)
  end

  test "should show report" do
    get report_url(@report)
    assert_response :success
  end

  test "should get edit" do
    get edit_report_url(@report)
    assert_response :success
  end

  test "should update report" do
    patch report_url(@report), params: { report: { advertiser_id: @report.advertiser_id, campaign_id: @report.campaign_id, clicks: @report.clicks, cost_micros: @report.cost_micros, date: @report.date, impressions: @report.impressions, installs: @report.installs } }
    assert_redirected_to report_url(@report)
  end

  test "should destroy report" do
    assert_difference('Report.count', -1) do
      delete report_url(@report)
    end

    assert_redirected_to reports_url
  end
end

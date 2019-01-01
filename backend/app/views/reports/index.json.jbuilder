json.top10Installs @top_10_installs, partial: 'reports/report', as: :report
json.top10Clicks @top_10_clicks, partial: 'reports/report', as: :report
json.top10Impressions @top_10_impressions, partial: 'reports/report', as: :report
json.advertisersByInstalls @advertisers_by_installs, partial: 'reports/group_report.json.builder', as: :report
json.advertisersByClicks @advertisers_by_clicks, partial: 'reports/group_report.json.builder', as: :report
json.advertisersByImpressions @advertisers_by_impressions, partial: 'reports/group_report.json.builder', as: :report
json.advertisersByCosts @advertisers_by_costs, partial: 'reports/group_report.json.builder', as: :report
json.totalClicks @total_clicks
json.totalImpressions @total_impressions
json.totalInstalls @total_installs
json.totalCostMicros @total_cost_micros
json.totalAdvertisers @total_advertisers
json.totalCampaigns @total_campaigns
json.activityInstalls @activity_installs
json.activityClicks @activity_clicks
json.activityImpressions @activity_impressions
json.dateUnit @date_unit

json.extract! report, :id, :date, :impressions, :clicks, :installs, :cost_micros
json.campaign_name report.campaign.name
json.advertiser_name report.advertiser.name


class ReportsController < ApplicationController
  before_action :set_report, only: [:show, :edit, :update, :destroy]

  # GET /reports
  # GET /reports.json
  def index
      # loading all data at once is to avoid multiple request on server
    if(params[:fromDate] != nil and params[:toDate] != nil)
      ##
      # render list of units, basically when user select long date range
      # it will show so long list of days and will make points and whole chart
      # looks so ugly, so I made it to change the display base of the date range
      # length, if it's > 7 days and less than 60 days show weeks instead of days
      # if its's > 60 days and < than 360 days then it will display months
      # instead of days, and if it's more than 360 days, it will display years
      # inseated of days
      ##

      from = DateTime.parse(params[:fromDate])
      to = DateTime.parse(params[:toDate])
      diff = (from...to).count
      if(diff.between?(7, 60))
        @activity_installs = Report.select("sum(installs) as y, YEARWEEK(date) as x").group('x').where(:date => from..to)
        @activity_clicks = Report.select("sum(clicks) as y, YEARWEEK(date) as x").group('x').where(:date => from..to)
        @activity_impressions = Report.select("sum(impressions) as y, YEARWEEK(date) as x").group('x').where(:date => from..to)
        @date_unit = "week"
      elsif(diff.between?(60, 360))
        @activity_installs = Report.select("sum(installs) as y, MONTH(date) as x").group('x').where(:date => from..to)
        @activity_clicks = Report.select("sum(clicks) as y, MONTH(date) as x").group('x').where(:date => from..to)
        @activity_impressions = Report.select("sum(impressions) as y, MONTH(date) as x").group('x').where(:date => from..to)
        @date_unit = "month"
      elsif(diff > 360)
        @activity_installs = Report.select("sum(installs) as y, YEAR(date) as x").group('x').where(:date => from..to)
        @activity_clicks = Report.select("sum(clicks) as y, YEAR(date) as x").group('x').where(:date => from..to)
        @activity_impressions = Report.select("sum(impressions) as y, YEAR(date) as x").group('x').where(:date => from..to)
        @date_unit = "year"
      else
        @activity_installs = Report.select("sum(installs) as y, date as x").group('x').where(:date => from..to)
        @activity_clicks = Report.select("sum(clicks) as y, date as x").group('x').where(:date => from..to)
        @activity_impressions = Report.select("sum(impressions) as y, date as x").group('x').where(:date => from..to)
        @date_unit = "day"
      end
    else
      @total_clicks = Report.sum(:clicks)
      @total_impressions = Report.sum(:impressions)
      @total_installs = Report.sum(:installs)
      @total_cost_micros = Report.sum(:cost_micros)
      @total_advertisers = Advertiser.count
      @total_campaigns = Campaign.count
      @top_10_installs = Report.order('installs desc').limit(10)
      @top_10_clicks = Report.order('clicks desc').limit(10)
      @top_10_impressions = Report.order('impressions desc').limit(10)
      @advertisers_by_installs = Report.select("sum(installs) as value, advertiser_id").group('advertiser_id').order('value desc')
      @advertisers_by_clicks = Report.select("sum(clicks) as value, advertiser_id").group('advertiser_id').order('value desc')
      @advertisers_by_impressions = Report.select("sum(impressions) as value, advertiser_id").group('advertiser_id').order('value desc')
      @advertisers_by_costs = Report.select("sum(cost_micros) as value, advertiser_id").group('advertiser_id').order('value desc')
      @activity_installs = Report.select("sum(installs) as y, date as x").group('x').where("date > ?", Time.now-7.days)
      @activity_clicks = Report.select("sum(clicks) as y, date as x").group('x').where("date > ?", Time.now-7.days)
      @activity_impressions = Report.select("sum(impressions) as y, date as x").group('x').where("date > ?", Time.now-7.days)
      @date_unit = "day"
    end
  end

  # GET /reports/1
  # GET /reports/1.json
  def show
  end

  # GET /reports/new
  def new
    @report = Report.new
  end

  # GET /reports/1/edit
  def edit
  end

  # POST /reports
  # POST /reports.json
  def create
    @report = Report.new(report_params)

    respond_to do |format|
      if @report.save
        format.html { redirect_to @report, notice: 'Report was successfully created.' }
        format.json { render :show, status: :created, location: @report }
      else
        format.html { render :new }
        format.json { render json: @report.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /reports/1
  # PATCH/PUT /reports/1.json
  def update
    respond_to do |format|
      if @report.update(report_params)
        format.html { redirect_to @report, notice: 'Report was successfully updated.' }
        format.json { render :show, status: :ok, location: @report }
      else
        format.html { render :edit }
        format.json { render json: @report.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /reports/1
  # DELETE /reports/1.json
  def destroy
    @report.destroy
    respond_to do |format|
      format.html { redirect_to reports_url, notice: 'Report was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_report
      @report = Report.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def report_params
      params.require(:report).permit(:advertiser_id, :campaign_id, :date, :impressions, :clicks, :installs, :cost_micros)
    end
end

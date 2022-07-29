require 'rest_client'
require 'json'

class InterventionsController < ApplicationController
    respond_to :js, only: [:create]
    respond_to :html

    def index
        @interventions = Intervention.all
    end

    def show
        @intervention = Intervention.find(params[:id])
    end

    def new
        @intervention = Intervention.new
    end


    def create
        freshdesk_domain = ENV["BASE_URL"]
        user_name_or_api_key =  ENV["FRESH_KEY"]
        password_or_x = "X"

        author_id = params["author_id"]
        customer_id = params["selectCustomers"]
        building_id = params["selectBuilding"]
        battery_id = params["selectBattery"]
        column_id = params["selectColumn"]
        elevator_id = params["selectLift"]
        employee_id = params["selectEmployee"]
        # intervention_started = params[]
        # intervention_ended = params[]
        intervention_result = "incomplete"
        intervention_report = params["intMessages"]
        intervention_status = "pending"
  
        @intervention = Intervention.new(intervention_params)
            @intervention.author_id = author_id
            @intervention.customer_id = customer_id
            @intervention.building_id = building_id
            @intervention.battery_id = battery_id
            @intervention.column_id = column_id
            @intervention.elevator_id = elevator_id
            @intervention.employee_id = employee_id
            # @intervention.intervention_started = intervention_started
            # @intervention.intervention_ended = intervention_ended
            @intervention.intervention_result = intervention_result
            @intervention.intervention_report = intervention_report
            @intervention.intervention_status = intervention_status

        @intervention.save!

        if @intervention.save!
            redirect_back fallback_location: new_intervention_path, notice: "Intervention has been sent successfully!"
            # customer_email = Customer.find(params["customer_id"])
            intervention_payload =  {
                status: 2,
                priority: 2,
                type: "Feature Request",
                # email: customer_email[:email],
                email: 'zaltima99@gmail.com',
                subject: "new intervention request from #{Time.now}",
                description: "#{@intervention.author_id} has requested for an intervention in building id: #{@intervention.building_id} on: #{@intervention.battery_id}, #{@intervention.column_id}, #{@intervention.elevator_id}. <br/>
                The employee #{@intervention.employee_id} has been assigned with the task. The report reads as follows: #{@intervention.intervention_report}. <br/>"
            }

            freshdesk_api_path = 'api/v2/tickets'
            freshdesk_api_url  = "https://rocketelevators3709.freshdesk.com/#{freshdesk_api_path}"

            site = RestClient::Resource.new(freshdesk_api_url, user_name_or_api_key, password_or_x)

            begin
                response = site.post(intervention_payload.to_json, {content_type: :json, accept: :json})
                # RestClient.post freshdesk_api_url, multipart_payload.to_json, {content_type: :json, accept: :json}
                puts "response_code: #{response.code} \nLocation Header: #{response.headers[:Location]} \nresponse_body: #{response.body} \n"
            rescue RestClient::Exception => exception
                puts 'API Error: Your request is not successful. If you are not able to debug this error properly, mail us at support@freshdesk.com with the follwing X-Request-Id'
                puts "X-Request-Id : #{exception.response.headers[:x_request_id]}"
                puts "Response Code: #{exception.response.code} \nResponse Body: #{exception.response.body} \n"
            end
            

        else
            redirect_back fallback_location: root_path, notice: "Please sign up or sign in before submitting a intervention!"
            respond_with(@intervention)
        end
    end

    private
    def intervention_params
        params.fetch(:intervention, {})
    end


end

class BatteryController < ApplicationController
    respond_to :json, :html
    def search
       @battery_customer = Battery.all
        respond_with(@battery_customer)
    end
end
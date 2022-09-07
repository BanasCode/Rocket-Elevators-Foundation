class BuildingController < ApplicationController
    respond_to :json, :html
    def search
       @building_customer = Building.all
        respond_with(@building_customer)
    end
end
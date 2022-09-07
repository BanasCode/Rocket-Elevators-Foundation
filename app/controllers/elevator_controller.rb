class ElevatorController < ApplicationController
    respond_to :json, :html
    def search
       @elevator_customers = Elevator.all
        respond_with(@elevator_customers)
    end
end
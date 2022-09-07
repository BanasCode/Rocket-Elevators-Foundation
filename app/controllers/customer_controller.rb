class CustomerController < ApplicationController
    respond_to :json, :html
    def search
       @email_all_customers = Customer.all
        respond_with(@email_all_customers)
    end
end
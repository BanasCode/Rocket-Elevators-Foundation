class ColumnController < ApplicationController
    respond_to :json, :html
    def search
       @column_customers = Column.all
        respond_with(@column_customers)
    end
end
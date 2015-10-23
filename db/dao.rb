require 'sequel'

module DAO
	def self.setup(db)
		db.create_table?(:summoners){
			primary_key :id
		}
	end
end

class Summoner < Sequel::Model(:summoners)
	set_primary_key [:id]
end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

jer = User.first 

august = jer.check_ins.create(date: "2021-08-14", weight: 185)
sept = jer.check_ins.create(date: "2021-09-14", weight: 180)
oct = jer.check_ins.create(date: "2021-10-14", weight: 175)
nov = jer.check_ins.create(date: "2021-11-14", weight: 170)

goal = jer.goals.create(goal_name: "test", goal_start_date: "2021-08-14", goal_weight: 170, goal_end_date: "2021-12-15", goal_met: true)
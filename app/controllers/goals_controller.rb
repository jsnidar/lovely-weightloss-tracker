class GoalsController < ApplicationController

  def create
    goal = @current_user.goals.create!(goal_params)
    render json: goal, status: :created
  end

  def show
    goal = Goal.find(params[:id])
    render json: goal 
  end

  def update 
    goal = Goal.find(params[:id])
    goal.update!(goal_params)
    render json: goal
  end

  def destroy
    goal = Goal.find(params[:id])
    goal.destroy
    render json: {}
  end

  private 

  def goal_params
    params.permit(:goal_start_date, :goal_weight, :goal_end_date, :goal_name, :goal_met)
  end

end

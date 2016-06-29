class Api::V1::IdeasController < Api::ApiController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def create
    respond_with :api, :v1, Idea.create(idea_params)
  end

  def destroy
    respond_with status: 204 if Idea.delete(params[:id])
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body)
  end
end

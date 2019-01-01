FROM ruby:2.5
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /rubyapp
WORKDIR /rubyapp
COPY Gemfile /rubyapp/Gemfile
COPY Gemfile.lock /rubyapp/Gemfile.lock
RUN bundle install
COPY . /rubyapp
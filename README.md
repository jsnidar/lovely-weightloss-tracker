# Lovely Nutrition Weight Loss Tracker

## Description

Welcome to the Lovely Nutrition Weight Loss Tracker. This application allows users to track their weight loss over time. They can create check ins with a date and weight as well as enter goals. When users have created a goal and have a check in then they will see a line graph that displays their data. 

Here is a <a href="https://watch.screencastify.com/v/W1fjBS6PIxBKOmXFbyQg">link</a> to a video description of the application.

The application is a mono-repo application with a Rails-API backend, Postgres database and a React frontend. In order to load the project you'll need to begin by configuring your environment. 

## Usage

To use the application go to <a href="https://lovely-nutrition-weight-loss.herokuapp.com/">https://lovely-nutrition-weight-loss.herokuapp.com/</a>.

### Test Account

There is a test account set up with a goal and check ins already entered: 
<ul>
  <li>username: jsnidar</li>
  <li>password: abcd</li>
</ul>

### Sign In

<img src="client/public/Sign In.png">

### Sign Up

Users begin by creating an account using the Sign Up form. There are validations for each input and it uses has_secure_password to encrypt the password.

<img src="client/public/Sign Up Form.png">

### Log Out

Users logout by clicking the logout button in the navbar.

### Check Ins

#### Create Check In

Users create a check in by clicking on the Create a Check In button. This directs them to the Create Check In form where they enter information about their check in. Submitting the form creates a new check in. 

#### Show/Hide Check Ins

Users click on the Show Check Ins button to see cards for their check ins with the most recent check in first. Clicking on the button changes it to the Hide Check Ins button, by clicking it again they will hide the checkins.

#### Edit Check In

Users edit a check in by clicking the Edit button on the check in card. This will direct them to the Edit Check In form with the current data for that check in loaded. Submitting the form updates the check in.

#### Delete Check In

Users delete a check in by clicking the Delete button on the check in card. 

### Goals

#### Show/Hide Goals

Users click on the Show Goals button to see cards for their goals with the most recent goal first. Clicking on the button changes it to the Hide Goals button, by clicking it again they will hide the checkins.

#### Create Goal
Users create a goal by clicking on the Create a Goal button. This directs them to the Goal Form where they enter information about their goal. Submitting the form creates a new goal. 

#### Edit Goal

Users edit a goal by clicking the Edit button on the goal card. This will direct them to the Edit Goal form with the current data for that goal loaded. Submitting the form updates the goal.

#### Delete Goal

Users delete a check in by clicking the Delete button on the Goal card. 

## Contributing

### Requirements

- Ruby 2.7.4
- NodeJS (v16), and npm
- Heroku CLI
- Postgresql

See Environment Setup below for instructions on installing these tools if you don't already have them.

### Environment Setup

#### Install the Latest Ruby Version

Verify which version of Ruby you're running by entering this in the terminal:

```sh
ruby -v
```

Make sure that the Ruby version you're running is listed in the [supported
runtimes][] by Heroku. At the time of writing, supported versions are 2.6.8,
2.7.4, or 3.0.2. Our recommendation is 2.7.4, but make sure to check the site
for the latest supported versions.

If it's not, you can use `rvm` to install a newer version of Ruby:

```sh
rvm install 2.7.4 --default
```

You should also install the latest versions of `bundler` and `rails`:

```sh
gem install bundler
gem install rails
```

[supported runtimes]: https://devcenter.heroku.com/articles/ruby-support#supported-runtimes

#### Install NodeJS

Verify you are running a recent version of Node with:

```sh
node -v
```

If your Node version is not 16.x.x, install it and set it as the current and
default version with:

```sh
nvm install 16
nvm use 16
nvm alias default 16
```

You can also update your npm version with:

```sh
npm i -g npm
```
#### Install Postgresql

Since I deployed the app through Heroku I needed to use PostgreSQL for your database. If you don't already have it installed, you'll need to set it up.

##### PostgreSQL Installation for WSL

To install Postgres for WSL, run the following commands from your Ubuntu terminal:

```sh
sudo apt update
sudo apt install postgresql postgresql-contrib libpq-dev
```

Then confirm that Postgres was installed successfully:

```sh
psql --version
```

Run this command to start the Postgres service:

```sh
sudo service postgresql start
```

Finally, you'll also need to create a database user so that you are able to
connect to the database from Rails. First, check what your operating system
username is:

```sh
whoami
```

If your username is "ian", for example, you'd need to create a Postgres user
with that same name. To do so, run this command to open the Postgres CLI:

```sh
sudo -u postgres -i
```

From the Postgres CLI, run this command (replacing "ian" with your username):

```sh
createuser -sr ian
```

Then enter `control + d` or type `logout` to exit.

[This guide][postgresql wsl] has more info on setting up Postgres on WSL if you
get stuck.

[postgresql wsl]: https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-postgresql

##### Postgresql Installation for OSX

To install Postgres for OSX, you can use Homebrew:

```sh
brew install postgresql
```

Once Postgres has been installed, run this command to start the Postgres
service:

```sh
brew services start postgresql
```
### Clone using Github

Once the environment has been set up you can clone the repository onto your local device. 

### Install Dependencies

Enter these commands to begin working on the application. 

```sh
bundle install
npm install --prefix client
```

You can use the following commands to run the application:

- `rails s`: run the backend on [http://localhost:3000](http://localhost:3000)
- `npm start --prefix client`: run the frontend on
  [http://localhost:4000](http://localhost:4000)


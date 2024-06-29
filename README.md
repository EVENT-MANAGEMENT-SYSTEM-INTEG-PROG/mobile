# How to Run the Mobile App

## Instructions

To get started with the mobile app, follow these steps: (use Command Prompt or CMD)

```sh
# Clone the repository
git clone https://github.com/EVENT-MANAGEMENT-SYSTEM-INTEG-PROG/mobile.git

# Go the the Directory
cd mobile

# Open the IDE
code .

# Install dependencies
npm install

# Open the constants.js file and change the domain to your IPv4 address
open cmd -> type ipconfig -> copy the IPv4 address to the contants.js

# Use that IPv4 address to run the laravel
e.g. php artisan serve --host=192.168.1.102 --port=8000

# Start the application
npm start

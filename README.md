# Laravel React

## Create mysql `laravel_react`

## rename .env.example to .env
Change the following in the .env file
```
DB_DATABASE=laravel_react
DB_USERNAME=root
DB_PASSWORD=
...
...
SUPER_ADMIN_EMAIL=super@admin.com
SUPER_ADMIN_PASSWORD=abcd1234
TOKEN_EXPIRY_SECONDS=3600
```
Above user will be created upon migration.
# Super Admin cannot be delete/updated

# To Start Laravel
- cd laravel
- composer install
- php artisan migrate
- php artisan serve
### keep that running in the terminal

# To Start React
Open new terminal
- cd react
- npm install
- npm start
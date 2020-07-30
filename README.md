# Laravel React

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
# Super Admin cannot be delete/updated (from UI/API)

## Create mysql database `laravel_react.mysql`
> NOTE: If you want to use sample database, use `database.sql` file

# To Start Laravel
- cd laravel
- composer install
- php artisan key:generate
- php artisan migrate `(will do nothing in case of manually importing database file)`
- php artisan serve
### keep that running in the terminal

# To Start React
Open new terminal
- cd react
- npm install
- npm start



# Sample Output

![alt text](https://github.com/mubashir4ali/laravelreact/blob/master/HomeScreen.PNG?raw=true)

![alt text](https://github.com/mubashir4ali/laravelreact/blob/master/Login.PNG?raw=true)

![alt text](https://github.com/mubashir4ali/laravelreact/blob/master/SignUpUserOrAdmin.PNG?raw=true)

![alt text](https://github.com/mubashir4ali/laravelreact/blob/master/ListOfUsers.PNG?raw=true)

![alt text](https://github.com/mubashir4ali/laravelreact/blob/master/EditUser.PNG?raw=true)

![alt text](https://github.com/mubashir4ali/laravelreact/blob/master/DeleteUser.PNG?raw=true)
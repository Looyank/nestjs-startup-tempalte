## Use
recommend [@antfu/ni](https://github.com/antfu-collective/ni) to manage package
```sh
# install dependencies
ni
```

```sh
# init database
cp example.env .env
nr migrate
```

```sh
# generate dto from schema
nr generate
```

## Auth 
The project uses global guards, so all APIs have authentication, except for the registration and login interfaces. After logging in, the obtained token needs to be added to the header in the following manner:
`Authorization: Bearer [token]`
**if you want to open an opi, you can use @Public decorator.**

## swagger
`localhost:3000/swagger`

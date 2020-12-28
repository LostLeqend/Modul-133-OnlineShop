# Modul 133 OnlineShop
Projekt von Raphael Härtel

## Start application
The project can be started with the Script for Windows.
`./start.bat`

Or with the following to lines:
- `deno run --allow-read --allow-write --unstable ./tools/builder.ts` (build frontend .js files)
- `deno run --allow-net --allow-read ./backend/controller/webserver.ts` (starts the webserver)

### Open application
When you started the application it can be open with `http://localhost:8000`.

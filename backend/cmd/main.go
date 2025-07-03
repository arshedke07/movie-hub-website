package main

import (
	"database/sql"
	"log"
	"os"
	"time"

	"github.com/arshedke07/stream-service/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/session"
)

func main() {
	store := session.New(session.Config{
		CookieHTTPOnly: false,               // set False for development on localhost but must be set to true in production for security purposes, this prevents javascript to access cookies
		CookieSecure:   false,               // Use secure cookies (set false for dev) if set to true then browser sends cookies only through HTTPS must be set to true for production
		Expiration:     24 * time.Hour,      // Set session expiration
		KeyLookup:      "cookie:session_id", // Store session in cookies
	}) // can also store these session data in database

	app := fiber.New(fiber.Config{
		ReadBufferSize:               320000,
		DisablePreParseMultipartForm: true,
		DisableStartupMessage:        false,
		StreamRequestBody:            true,
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowCredentials: true,
		AllowHeaders:     "Origin, Content-Type, Accept",
	}))

	connectionString := "host=localhost port=5432 user=postgres password=1234 dbname=postgres sslmode=disable"
	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		log.Fatal("database not responding", err)
	}

	defer db.Close()

	loginroute := routes.NewLoginRoute(store)

	app.Get("/health", routes.HealthCheck)
	// app.Put("/updatemovie", routes.UpdateMovie)
	// app.Delete("/deletemovie", routes.DeleteMovie)
	app.Post("/adduser", routes.AddUserRoute)
	app.Post("/api/login", loginroute.LoginRoute)
	app.Get("/api/login", loginroute.LoginRoute)
	app.Get("/api/logout", loginroute.LogoutRoute)
	app.Post("/api/addmovie", func(c *fiber.Ctx) error {
		return routes.AddMovie(c, db)
	})
	app.Get("/api/getmovie", func(c *fiber.Ctx) error {
		return routes.GetMoviesRoute(c, db)
	})

	app.Listen(":3001")
	os.Exit(0)
}

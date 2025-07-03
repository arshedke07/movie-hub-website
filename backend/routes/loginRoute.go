package routes

import (
	"fmt"

	"github.com/arshedke07/stream-service/pkg/services"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
)

type LoginRouteStruct struct {
	Store *session.Store
}

func NewLoginRoute(store *session.Store) LoginRouteStruct {
	return LoginRouteStruct{
		Store: store,
	}
}

func (route LoginRouteStruct) LoginRoute(c *fiber.Ctx) error {
	if c.Method() == "GET" {
		sess, err := route.Store.Get(c)
		if err != nil {
			fmt.Println(err)
			return err
		}
		username := sess.Get("username")
		return c.JSON(fiber.Map{"username": username})
	} else if c.Method() == "POST" {
		emailId := c.FormValue("email")
		pass := c.FormValue("password")

		connectionString := "host=localhost port=5432 user=postgres password=1234 dbname=postgres sslmode=disable"

		user, err := services.LoginUser(emailId, pass, connectionString)
		if err != nil {
			return err
		}

		sess, err := route.Store.Get(c)
		if err != nil {
			fmt.Println(err)
			return err
		}

		sess.Set("username", user.FirstName+" "+user.LastName)
		sess.Save()

		return c.JSON(fiber.Map{
			"usertype": user.UserType,
		})
	}
	return nil
}

func (route LoginRouteStruct) LogoutRoute(c *fiber.Ctx) error {
	sess, _ := route.Store.Get(c)

	err := sess.Destroy()
	if err != nil {
		fmt.Println(err)
		return err
	}

	saveErr := sess.Save()
	if saveErr != nil {
		return saveErr
	}

	return nil
}

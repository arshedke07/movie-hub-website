package routes

import (
	"io"
	"os"

	"github.com/gofiber/fiber/v2"
)

func UploadMovie(c *fiber.Ctx) (string, error) {
	file, err := c.FormFile("myfile")
	if err != nil {
		return "", err
	}

	buffer, fileErr := file.Open()
	if fileErr != nil {
		return "", fileErr
	}

	defer buffer.Close()

	outputFile, err := os.Create("./uploads/" + file.Filename)
	if err != nil {
		return "", err
	}

	defer outputFile.Close()

	_, copyErr := io.Copy(outputFile, buffer)
	if copyErr != nil {
		return "", copyErr
	}

	return file.Filename, nil
}

package routes

import (
	"database/sql"
	"fmt"
	"os"
	"os/exec"

	"github.com/arshedke07/stream-service/model"
	"github.com/arshedke07/stream-service/pkg/services"
	"github.com/gofiber/fiber/v2"
)

func AddMovie(c *fiber.Ctx, db *sql.DB) error {
	movie := model.Movie{
		Name:         c.FormValue("name"),
		MediaContent: c.FormValue("mediacontent"),
		Duration:     c.FormValue("duration"),
		Genres:       c.FormValue("genre"),
		AgeRating:    c.FormValue("agerating"),
		Description:  c.FormValue("description"),
	}

	_, err := services.AddMovie(&movie, db)
	if err != nil {
		fmt.Println(err)
		return err
	}

	filename, uploadErr := UploadMovie(c)
	if uploadErr != nil {
		return uploadErr
	}

	go ConvertToHLS(filename) // run asynchronously
	return nil
}

// func UpdateMovie(c *fiber.Ctx) error {
// 	return nil
// }

// func DeleteMovie(c *fiber.Ctx) error {
// 	return nil
// }

func GetMoviesRoute(c *fiber.Ctx, db *sql.DB) error {
	data, err := services.GetAllMovies(db)
	if err != nil {
		return err
	}

	return c.JSON(data)
}

func ConvertToHLS(filename string) { // function to convert the uploaded video file to HLS using ffmpeg
	inputPath := "uploads/" + filename
	outputPath := "uploads/" + filename + ".m3u8"

	cmd := exec.Command(
		"ffmpeg",
		"-i", inputPath,
		"-c:v", "libx264", // Convert video to H.264 which is necessary for HLS format
		"-crf", "18", // CRF (Constant Rate Factor) controls the quality of H.264 encoding. Lower CRF means better quality; 18 is nearly lossless, while 23 is a good balance.
		"-preset", "slow", // The preset determines encoding speed vs. compression efficiency. slow uses a more efficient algorithm to reduce file size without sacrificing quality.
		"-c:a", "aac", // Convert audio to AAC which is necessary for HLS format
		"-b:a", "192k", // provides high-quality AAC audio (128k is acceptable, 256k is even better).
		"-hls_time", "6", // segment duration
		"-hls_list_size", "0", // Include all segments in the playlist
		"-f", "hls", // format
		outputPath, // output playlist
	)

	// cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr //capture any errors

	// Run the command
	err := cmd.Run()
	if err != nil {
		fmt.Println("Error executing command:", err)
		return
	}

	// fmt.Println("Command executed successfully!")
}

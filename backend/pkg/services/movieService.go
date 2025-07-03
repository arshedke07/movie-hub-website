package services

import (
	"database/sql"
	"fmt"

	"github.com/arshedke07/stream-service/model"
)

func AddMovie(movie *model.Movie, db *sql.DB) (*model.Movie, error) {
	insertstatement := "INSERT INTO movieitem(name, genres, mediacontent, duration, agerating, description, filepath) VALUES($1, $2, $3, $4, $5, $6, $7) returning movie_id"

	defer db.Close()

	row := db.QueryRow(insertstatement, movie.Name, movie.Genres, movie.MediaContent, movie.Duration, movie.AgeRating, movie.Description, nil)
	// _, insertErr := db.Exec(insertstatement, movie.Id, movie.Name, movie.Genres, movie.MediaContent, movie.Duration, movie.AgeRating, movie.Description, nil)
	insertErr := row.Scan(&movie.Id)
	if insertErr != nil {
		return nil, insertErr
	}

	newMovie := model.Movie{
		Id:           movie.Id,
		Name:         movie.Name,
		Genres:       movie.Genres,
		MediaContent: movie.MediaContent,
		Duration:     movie.Duration,
		AgeRating:    movie.AgeRating,
		Description:  movie.Description,
		// FilePath:     movie.FilePath,
	}

	return &newMovie, nil
}

func GetAllMovies(db *sql.DB) (*[]model.Movie, error) {
	selectstatement := "SELECT movie_id, name, genres, mediacontent, duration, agerating, description FROM movieitem"

	rows, err := db.Query(selectstatement)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	movies := []model.Movie{}
	for rows.Next() {
		movie := model.Movie{}
		scanErr := rows.Scan(&movie.Id, &movie.Name, &movie.Genres, &movie.MediaContent, &movie.Duration, &movie.AgeRating, &movie.Description)
		if scanErr != nil {
			fmt.Println(scanErr)
			return nil, err
		}
		movies = append(movies, movie)
	}
	return &movies, nil
}

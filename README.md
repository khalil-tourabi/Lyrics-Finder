# Lyrics-Finder

Lyrics-Finder is a Rest API application that allows users to easily search for and discover the lyrics of their favorite songs. In addition to providing lyrics, the application offers additional features to enhance the user experience, such as information about artists.

## Objectives

1. **Lyrics Search:** Allow users to quickly find the lyrics of any song.
2. **Additional Information:** Provide information about artists.

## User Stories

- As a user, I can create an account using my email address and a secure password.
- As a user, I can log in to my existing account using my email address and password.
- As a user, I can reset my password.
- As a user, I can view the lyrics of a song.
- As a user, I can view the list of artists and the list of songs by an artist.
- As a user, I want to receive news emails to stay informed of the latest updates.
- As a user, I want to be able to unsubscribe from the newsletter.
- As an administrator, I can add song lyrics and artists.
- As an administrator, I can edit song lyrics and artist information.
- As an administrator, I can delete existing song lyrics.
- As an administrator, I can modify user roles.

## Data Schemas

- **Artist:** (id, firstname, lastname, picture_url, genre, born_date, born_city, died_date)
- **Song:** (id, genre, title, Recorded_date, lyrics)
- **User:** (id, firstname, lastname, email, password, isAdmin)

## Technologies and Platforms

- **NodeJs**, **Express**, **TypeScript**, **Mongoose**
- **Database:** MongoDB
- **Data Validation:** Express-validator
- **Authentication:** JWT
- **Image Uploads:** Cloudinary or Amazon S3
- **Error Handling:** Custom errors
- **Unit Testing:** Jest and Supertest
- **Email Sending:** Nodemailer, SMTP
- **Cron Job:** Schedule automatic newsletter sending

## Bonus

- Define a unit test plan with Jest/Supertest.
- Deploy your Node.js application on a remote server.

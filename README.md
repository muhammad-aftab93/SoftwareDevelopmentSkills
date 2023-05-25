# Software Development Skills - Fullstack

This is a course project for the course **Software Development Skills - Fullstack** offered by **LUT University**

**Demo:**

Live demo: [https://e-learning-app.azurewebsites.net](https://e-learning-app.azurewebsites.net/ "eLearning")

Video demo: [https://youtu.be/r-AkLxBTOJs](https://youtu.be/r-AkLxBTOJs "Video Link")

Github repository: [https://github.com/muhammad-aftab93/SoftwareDevelopmentSkills](https://github.com/muhammad-aftab93/SoftwareDevelopmentSkills "Github Repository")

**How to run this project directly:**

Follow the following steps in order to run this project locally:

- To run the backend, go to ***root/backend*** and run `npm install`, once all the dependencies are installed, run `npm run start` to start backend server.
- To run the frontend, go to ***root/frontend*** and run `npm install`, once all the dependencies are installed, run `npm run start` to start the frontend application.
- Once backend and frontend are running, navigate to `http://localhost:4200` in your browser to access the website.

**How to run this project using Docker:**

If you want to run this project using docker you can follow following steps:

- Go to ***root/frontend*** and run `npm install`, then run `npm run prod`.
- Then go to ***root/backend*** and run `npm run docker`.
- Once docker image is built and container is running, navigate to `http://localhost:5000` in your browser to access the website.

**Technology stack:**

- MongoDB
- Express
- Angular
- NodeJS
- Azure Container Registery (for pushing the container (docker) image to ACR, continuous deployment is activated on this ACR so whenever there will be new container, it will deploy latest container application to Azure App Service)
- Azure App Service (for deploying and hosting website)

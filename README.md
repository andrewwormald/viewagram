# Udagram
<img src="https://api.travis-ci.org/andrewwormald/udagram.svg?branch=master&status=started"/>


1. Build the images: `docker-compose -f ./deployment/docker-compose-build.yaml build --parallel`
2. Push the images: `docker-compose -f ./deployment/docker-compose-build.yaml push`
3. Run the container: `docker-compose up`

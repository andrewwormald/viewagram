# Udagram
<img src="https://api.travis-ci.org/andrewwormald/udagram.svg?branch=master&status=started"/>

### Github repo:
https://github.com/andrewwormald/udagram

________
### Dockerhub images:

Found: https://hub.docker.com/r/andrewjameswormald/udagram/tags

#### Tags for service images are:
- docker push andrewjameswormald/udagram:feed-latest
- docker push andrewjameswormald/udagram:user-latest
- docker push andrewjameswormald/udagram:frontend-latest
- docker push andrewjameswormald/udagram:reverseproxy-latest
________

### Run
1. Build the images: `docker-compose -f ./deployment/docker-compose-build.yaml build --parallel`
2. Push the images: `docker-compose -f ./deployment/docker-compose-build.yaml push`
3. Run the container: `docker-compose up`

# Viewagram
<img src="https://api.travis-ci.org/andrewwormald/viewagram.svg?branch=master"/>

### Screenshots:
<img style="width:100%; display: inline;" src="./screenshots/desktop.png"/>
<img style="width:100%; display: inline;" src="./screenshots/travis.png"/>
<img style="width:100%; display: inline;" src="./screenshots/kube_screenshot.png"/>
<img style="width:550px;" src="./screenshots/api-endpoint.png"/>
<img style="width:550px;" src="./screenshots/mobile.png"/>

### Github repo:
https://github.com/andrewwormald/viewagram

________
### Dockerhub images:

Found: https://hub.docker.com/r/andrewjameswormald/viewagram/tags

#### Tags for service images are:
- docker push andrewjameswormald/viewagram:feed-latest
- docker push andrewjameswormald/viewagram:user-latest
- docker push andrewjameswormald/viewagram:frontend-latest
- docker push andrewjameswormald/viewagram:reverseproxy-latest
________

### Run your code
1. git add .
2. git commit -m '{{my commit message}}'
3. git push

###### Travis will begin to build master and automatically deploy it (updating the cluster with rolling changes)

###### To test the application running in the eks cluster you will need to run kubectl por-forwarding execs on frontend and the reverseproxy
###### OR
###### use the ELB public IP provided when typing `kubectl get services` for the frontend and reverseproxy services
 
4. `kubectl port-forward services/frontend`
5. `kubectl port-forward services/reverseproxy`

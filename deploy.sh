#!/bin/sh


cd $TRAVIS_BUILD_DIR/oribitile-power-backend
docker build -t orbitile-power/oribitile-power-backend:latest -t orbitile-power/oribitile-power-backend:$BUILD_ID -f ./Dockerfile .
cd $TRAVIS_BUILD_DIR
ls -l
echo $PWD
docker build -t orbitile-power/orbitile-power-web:latest -t orbitile-power/orbitile-power-web:$BUILD_ID -f ./orbitile-power-web/Dockerfile ./orbitile-power-web
docker push orbitile-power/oribitile-power-backend:latest
docker push orbitile-power/orbitile-power-web:latest

docker push orbitile-power/oribitile-power-backend:$BUILD_ID
docker push orbitile-power/orbitile-power-web:$BUILD_ID

kubectl apply -f ./contacts-deployment/k8s
kubectl set image deployments/oribitile-power-web-deployment orbitile-power-web=orbitile-power/orbitile-power-web:$BUILD_ID
kubectl set image deployments/oribitile-power-backend-deployment orbitile-power-api=orbitile-power/oribitile-power-backend:$BUILD_ID

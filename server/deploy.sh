#!/bin/bash

echo What should the version be?
read VERSION


docker build -t tienduy/bookstore:$VERSION .
docker push tienduy/bookstore:$VERSION
ssh tienduy@adev "docker pull tienduynguyen/bookstore:$VERSION && docker tag tienduynguyen/bookstore:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
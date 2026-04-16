#!/bin/bash
echo "🚀 Iniciando deploy..."

cd ~/mvp-msadvocacia

git pull

docker stop advocacia
docker rm advocacia

docker build \
  --build-arg VITE_GOOGLE_MAPS_API_KEY=AIzaSyBPtxwA3O7NMWCNKSAdw2fbLCvYp9EcjvI \
  --build-arg VITE_GOOGLE_PLACE_ID=ChIJf3Bs28xmBwcRQW_-u8U_saA \
  -t advocacia .

docker run -d \
  --name advocacia \
  --network bacaxita_bacaxita \
  advocacia

echo "✅ Deploy finalizado!"

docker build -t ianidi/nvision-front:1.11 .
docker push ianidi/nvision-front:1.11
docker run -d -p 3000:3000 ianidi/nvision-front:1.11
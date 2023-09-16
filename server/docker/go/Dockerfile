FROM golang:1.19-alpine

ENV GOPATH /go
ENV GO111MODULE on
RUN GOOS=linux GOARCH=arm64
ENV TZ Asia/Tokyo

WORKDIR /go/src/portfolioGo
COPY src/ .

EXPOSE 3001

RUN apk upgrade --update && apk --no-cache add git

RUN go get -u gorm.io/gorm
RUN go get -u gorm.io/driver/postgres
RUN go get -u github.com/gin-contrib/sessions
RUN go get -u github.com/cosmtrek/air/ && go build -o /go/bin/air github.com/cosmtrek/air
RUN go get -u github.com/jinzhu/copier

CMD ["air", "-c", ".air.toml"]

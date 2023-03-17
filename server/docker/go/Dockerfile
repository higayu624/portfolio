FROM golang:1.19-alpine

ENV GOPATH /go
ENV GO111MODULE on
RUN GOOS=linux GOARCH=arm64
ENV TZ Asia/Tokyo

# WORKDIR /go/src
# COPY ./src .

WORKDIR /go/src/jaglen
COPY src/ .

EXPOSE 3001

RUN apk upgrade --update && apk --no-cache add git

RUN go get -u github.com/cosmtrek/air/ && go build -o /go/bin/air github.com/cosmtrek/air

CMD ["air", "-c", ".air.toml"]

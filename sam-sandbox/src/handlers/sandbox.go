package main

import (
	"fmt"
	"context"
	"github.com/aws/aws-lambda-go/lambda"
)

func HandleRequest(ctx context.Context) (string, error) {
	return fmt.Sprintf("SandBox!"), nil
}

func main() {
	lambda.Start(HandleRequest)
}
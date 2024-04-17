package main

import (
	"github.com/zgwit/iot-master/v4/boot"
	"github.com/zgwit/iot-master/v4/log"
)

func main() {
	err := boot.Startup()
	if err != nil {
		log.Fatal(err)
	}

	select {}
}

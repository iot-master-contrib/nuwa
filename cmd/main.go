package main

import (
	_ "github.com/iot-master-contrib/nuwa"
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

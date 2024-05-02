package main

import (
	_ "github.com/iot-master-contrib/nuwa"
	master "github.com/zgwit/iot-master/v4"
	"github.com/zgwit/iot-master/v4/log"
	"github.com/zgwit/iot-master/v4/web"
)

func main() {
	err := master.Startup()
	if err != nil {
		log.Fatal(err)
	}

	err = web.Serve()
	log.Fatal(err)
}

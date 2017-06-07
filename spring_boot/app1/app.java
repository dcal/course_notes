// Gets spring-boot-starter-web

// import ort.springframework.web.bind.annotation.RestController
// + a bunch of other imports ...

@RestController
//@EnableAutoConfiguration
public class HelloWorld {

	@RequestMapping("/")
	public String home(){
	       return "Hello World";
	}

	// public static void main(String[] args) {
	//   SpringApplication.run(HelloWorld.class, args);
	// }
}

# The Spring Framework

## Section 1
### Lecture 2
IoC = Inversion of control. The IoC container is responsible for object lifecycles. It manages, initializes and wires together configuration.

### Lecture 3
- Spring boot takes care of a bulk of the configuration that otherwise would be a ton of XML. It's difficult to configure even with years of experience.

- Spring boot is opinionated on what it thinks configuration should be. It will allow you to easily override configuration settings.

- Spring CLI can let you quickly prototype. 

- Gives you an application class.

- Starter POMs (this is the xml file Maven uses for building. With Gradle, this is the gradle.build file written in Groovy.)

- Easy to build jars.

### Quiz 1
Q: Who created the Spring Framework?
A: Rod Johnson

Q: Spring Framework is maintained by...?
A: Pivotal

Q: Spring Boot makes building Spring Applications easy!
A: True

Q: You can create Spring applications using Groovy
A: True

Q: Central to the Spring Framework is what design pattern?
A: Inversion of Control (IoC)

## Section 2 -- Installing your shit!
### Lecture 6 -- Skip
### Lecture 8 -- Install on OSX
####JRE vs JDK:
JRE = Java Runtime Enviroment, where java programs run
JDK = Full SDK...JRE plus development tools such as compiler, javadoc, etc.

### Lecture 11: the CLI
Running `spring` without any commands will trigger help.

`spring run` will boot up the app

You can essentially create a new app (the same as using the initialzr on the web) from the command line using the CLI.

### Lecture 12: SDK MAN!
SDK Man allows us to manage parallel versions of different SDK's.
JDK is on the way!!!!

### Lecture 16
`@RestController` annotations tells Spring to:
1. Look for routes
2. Http endpoints will write directly to HTTP response instead of a view (An api controller)
	- if it were a @Controller annotation, it would write to a view.

It's pretty crazy that Spring will take a controller, and running it in the SpringCLI adds @EnableAutoConfiguration and drop a main method.Having a `public static void main()` method means it will run anywhere there is a JVM installed.

### Lecture 18: Spring Initializer / Start.Spring.Io
Bootstrap a new project at [start.spring.io](https:/start.spring.io)

Or, you can use the `spring init` command. `spring init --list` will give you the default options and show you the parameters and options you can select.

Spring Boot effectively emphasizes convention over configuration, meaning, you don't have to spend all kinds of time configuring your app. Spring Boot has defaults that it sets up for you.

### Lecture 18: Build Tools

Build tools automate developer tasks
- Compile source code into binary
- packaging that binary code
- running tests
- Deployment to other systems

Why not let the IDE compile my code???
Because build tools can make your life so much easier!!!


### Lecture 19: Apache Maven
If you add the plugin `spring-boot-maven-plugin` it will give you the spring boot starter POM. This allows you to create a jar from the command line.

You don't need a version number in Maven dependencies, since they are declared in the parent POM file. You can override, though.

Maven can run the project with `mvn spring-boot:run`

### Lecture 20-21: Gradle
Gradle has on "superparent" file to inherit dependencies from. You can just import the whole starter dependencies.

The `spring-boot` gradle plugin allows us to run Spring projects.



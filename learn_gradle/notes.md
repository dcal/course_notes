# Learn Gradle
## History
Gradle supercedes Ant and later Maven as a build tool. Maven has conventions that Ant doesn't have, as well as dependency management. Maven is highly extensible and can be configured. But like Ant, it's written in XML and can be hard to read and maintain. This is wehre Gradle comes in. It's written in a Groovy DSL, which makes it very simple to write and read, and later maintain.

##Lecture 5 - Intro to Builds
### Plugins & Tasks
Plugins offer extensibility to Gradle. Gradle is mostly task based, and plugins apply tasks for Gradle to use.
When gradle builds, it will only build the things that changed.

Plugin usage takes two steps: Resolving and Applying the plugin.

_Resolving_ means finding the correct plugin and adding it to the build script classpath.

_Applying_ means executing the Plugin.apply(T) on the project. Plugin application is idempotent; if you apply it multiple times it's not a problem.

The _Plugins DSL_ has a specific way of doing this that is at variance with some of the older methods in the first Java projects we did at AH.

### DSL
Core plugins can be applied with a short name:

```
plugins {
  id 'java'
}
```

Community plugins need a full id:

```
plugins {
  id 'com.jfrog.bintray' version '0.4.1'
}
```

The gradle documentation has an interesting section about the [limitations of the DSL] (https://docs.gradle.org/3.4/userguide/plugins.html#plugins_dsl_limitations) (still incubating as of 02/2017).

If you want to wait to apply the plugin instead of immediately applying it, you can tell Gradle to resolve the plugin and not apply it...then apply it in a subproject. From the Gradle docs:

```
plugins {
  id "org.gradle.sample.hello" version "1.0.0" apply false
  id "org.gradle.sample.goodbye" version "1.0.0" apply false
}

subprojects { subproject ->
  if (subproject.name.startsWith("hello")) {
    apply plugin: 'org.gradle.sample.hello'
  }
  if (subproject.name.startsWith("goodbye")) {
    apply plugin: 'org.gradle.sample.goodbye'
  }
}
```

### LEGACY!!!!
Plugins can be external binaries in the form of jar files. Most of the plugins used in AH projects are like this.

You can resolve these plugins in the buildscript block, and then apply them in a separate block:

```
buildscript {
  repositories {
    jcenter()
  }
  dependencies {
    classpath "com.jfrog.bintray.gradle:gradle-bintray-plugin:0.4.1"
  }
}

apply plugin: "com.jfrog.bintray"
```

This adds the plugin as a dependency to the build script classpath, then applies it to the project.

### Wrapper
Using a wrapper is like putting a middleware in front of your gradle process that manages gradle itself. It allows you to make sure you have the proper Gradle version before building. We carry the version of gradle along with the source control, so whoever checks it out gets the right version of gradle.

_Get in the habit of running gradlew for each new project, then using gradlew instead of gradle._

## Lecture 6 - Tasks
Tasks are code that Gradle executes for us.
- Tasks have a lifecycle: Initialization, Configuration, Execution.
- Tasks have properties: descriptions, groups, and some of their own properties.
- Tasks have actions: first action and last action
- Tasks have dependencies. Tasks may be dependent on each other and Gradle will execute them in order of their dependencies.

In a gradle build script, the top-level object is called a project.
To create a project level task, we do `project.task("Task1")`

You an also define without using the project keyword: `task("Task2")`

*If we dont specify an object to use, Groovy and Gradle assign it to the top-level object, which is Project.*

Because it's Groovy, you can leave off the parenthesis, or even leave off quotes: `task "Task3"   ...   task Task4`

### Description property
Assign a description property to the task through the description keyword: `Task4.description = "this is a test task"`

## Lecture 7 - Task Actions
The `doLast` method is part of every task. It's the last thing the task executes:
```
Task4.doLast { println "This is task 4" }
```

The `doLast` method is overwritten with the `<<` method. (Reverse shovel operator?)

Typically, you'd define the task and then give it a code block (closure): `task Task5 << { println "this is task 5" }`
If you add another closure through the `doLast` or `<<` method, it doesn't replace the last method...it APPENDS!!!!

```
task Task6 {
  description "This is task 6"
  doLast {
    println "This is Task 6"
  }
}
```

## Lecture 8 - Build Phases
The first phase is called the Initilization Phase. Typically this is part of multi-project builds.

_The configuration phase executes code that is not the action_...so the description of the task, but not the action.

The execution phase executes the task actions.

### doFirst action
We can also add a `doFirst` action:

```
task Task6 {
  description "This is task 6"
  doFirst { 
    println "this is first"
  }
  doLast {
    println "This is Task 6"
  }
}
```

You can append things to `doFirst` as well: `Task6.doFirst { println "I'm next!!!" }`

## Lecture 8 - Dependencies
We want tasks to execute in certain orders, after other things have completed. We do this by adding dependencies.

```
Task6.dependsOn Task5
Task5.dependsOn Task4
```

This will cause Task4 to execute, then Task5, then Task6.

You can have cross dependencies:

```
Task6.dependsOn Task5
Task6.dependsOn Task3
Task5.dependsOn Task4
```

Will cause Task3 > Task4 > Task5 > Task6.


## Lecture 10 - Properties
Two ways of adding properties - define a variable (locally scoped inside of closures)
```
task Task6 {
  def projectVersion = "2.0"
  description "Project version: $projectVersion"
}
```

For project-scoped variables, set project extended properties. _This will make it available even in the buildfile:_

```
ext.projectVersion = "3.0"

Task6.description = "This is task six for project version $projectVersion"
```

## Lecture 12 - Other Dependencies
Gradle will build a dependency tree for you but if you're not specifying order dependencies at the same priority level should execute, Gradle chooses for you. You can more tightly control them with the following methods:
### mustRunAfter
If two tasks execute, one MUST run after the other. If a single task executes, it's ignored. The Must and Should run after's only kick in if we try and run both tasks. You can still execute tasks individually.
### shouldRunAfter
If two taske esecute, one SHOULD run after the other. Ignores circular dependencies. Tries to run it after but if the dependency is circular it doesn't.

## Lecture 13 - finalizedBy (2.6)
Inverted dependency. If A is finalized by B, then B runs after A. This forces the task to run after. 

One possible use of this is running migrations. With a flyway plugin for Gradle, you can only call "flywayMigrate" once. But you might have multiple tasks that need to run migrations in different environments. So, set up your tasks with a flyway configuration, then set up a "finalizedBy" dependency on flywayMigrate for each of them.

## Lecture 14 - Typed Tasks
Typed tasks are more complex tasks you can configure. You can see these in the Gradle documentation.

## Lecture 15 - Continued
You can call these type tasks, you can re-use this pre-defined task type with configuration. You can write your own as well.

```
task copyImages (type: Copy) {
  exclude '*.jpg'
  from 'src'
  into 'dest'
}
```

You can extract configuration into a copySpec to break up the code.

```
def contentSpec = copySpec {
  exclude {it.file.name.startsWith('IMG')}
  from 'src'
}

task copyImage2 (type: Copy) {
  into 'dest'
}
```

Tasks will have helper methods like "copySpec" that can take Gradle code blocks. In the above example, 'copySpec' is an iterator, and passes an iterator `it` into the code block for you.

Copy can do edits and replaces in file (text expansion) and all kinds of cool stuff.

## Lecture 16 - Building Java
If we apply the java plugin, we get all kinds of cool tasks. `apply plugin: 'java'`
It sets up the directory structure as expected:

```
src/main/java
src/main/resources
etc.
```

## Lecture 17 - Java Details
The different tasks have different dependencies which you can observe by running them independently. For exaple, `gradle compileJava` will output your compiled code into its directories. `gradle classes` will compile Java but also process resources.

`assemble` is a lifecycle task.
`build` is check and assemble.

All this is in the documentation. Check it out.

## Lecture 18 - Daemonizing Gradle
The gradle daemon allows gradle to re-use a VM instead of spinning up a new VM every time it runs.

`gradle --daemon clean`

The best way to do this is to create a gradle properties file in your home directory. Go to your ~ directory, in the .gradle folder, and add `org.gradle.daemon=true`

This causes gradle to pick up the daemon automatically.

## Lecture 19 - Multi-project Builds
If you have multiple projects that depend on each other, you have to ad a top-level file called `settings.gradle` that lists all the projects that are part of the build.
We also need a top level `build.gradle` file that handles common dependencies.
This file goes in the parent directory of the two projects.

### Settings file example
Include all projects in the build
```
include 'Repository', 'JacketService'
```

### build.gradle file
In here we specify commonalities, like the java plugin.
We also specify dependencies, like one project depending on another.

```
allprojects {
  apply plugin: 'java'
}

// The colons here tell gradle that it's relative to the current directory
project(':Repository){}
// Since the JacketService project relies on the Repository project,
// we can set up that dependency here.
project(':JacketService){
  dependencies {
    compile project(':Repository')
  }
}
```

## Lecture 20: Creating a build from scratch
Here he writes a build file for an old project. I'm going to just take notes on things I learn rather than copy it.

First things first: we need to apply the java plugin. Remember, it uses the standard package layout, so if you have a project with a non-standard package layout, you can specify `sourceSets`.

You can pick dependencies off the local filesystem.

When we add dependencies, we have to specify which step the dependencies are for. 
```
dependencies {
  compile files ('lib/log4j-1.2.8.jar', 'lib/junit-3.8.1.jar')
}
```

The `application` plugin allows gradle to run the application.

## Lecture 21: Multi-project builds
You can pull in
- Other repos/projects
- File system
- Maven repos
- Other language builds

### Configurations
The Java plugin brings in four configurations:
- compile (required to compile)
- runtime (dependencies required by production classes at runtime...includes compile dependencies)
- testCompile (dependencies for compiling test source, includes prod compile and runtime dependencies)
- testRuntime (dependencies to run tests...includes all above dependencies)

The configurations represent the classpaths that Java uses.

Dependencies are transitive - Gradle will download dependencies of dependencies. 

## Lecture 22: Using Repositories
Ideally we'll get dependencies from repos rather than from files (although files will be useful).

The below will look in the .M2 directory:
```
repositories {
  mavenLocal()
}
```

Gradle specifies group, name, version in a couple of ways:

```
compile group: 'log4j', name: 'log4j', version: '1.2.17'
```

OR the less verbose way:

```
compile 'log4j:log4j:1.2.17'
```

After bulding the first time, it downloads the jar files and caches them locally in the filesystem, and retrieves them from the local cache thereafter.

## Lecture 23: Gradle Cache
Caches for different repo types are held in different locations.

Cache names are SHA1-based.

There is a `--refersh-dependencies` flat that we can pass to the Gradle build, if we want to check for updates.

The cache is located in `~/.gradle/caches`.

## Lecture 24: Testing
Test configuration defines:
- a source set (classpath for test sources)
- a task to compile steps
- a task to run tests
- hooks into the gradle build task

Test config looks in `src/test/java`.

The outputs go into `build/classes/test`.

The reports go into `build/reports/tests`. This puts out an HTML page with the test results.

## Lecture 25: Using filters to select tests
If we want to run a subset of tests, we can filter:

- single test
- all tests
- * wildcards

```
test {
  filter {
    includeTestsMatching "com.foo.shouldCreateASession"
      includeTestsMatching "*shouldCreateASession"
  }
}
```

You an also override the filter from the command line:

```
gradle test --tests *testWhenInputFileDoesExist
```

## Lecture 26 - Gradle-testsets-plugin

This plugin allows us to specify sets of source files for certain tests:

```
testSets {
  integrationTest {
    dirName = 'integration-test'
  }
}
```

## Lecture 27 - Gradle wrapper
Wrapper task is always available.

We can override and specify the version of Gradle we want to use.

```
task wrapper(type: Wrapper) {
  gradleVersion = '2.6'
}
```

Running the task sets up your gradle wrapper in the filesystem. It doesn't download it and install it until you run `gradlew build`, at which point it will download it and install it if it isn't already there.
Be sure to check the wrapper into your source code, and use gradlew to run your code.


# Navigating Notes
My notes tend to contail specificially things I've learned. If I already know something, I will probably not write it down, unless I want to be reminded about it. Thus the notes may skip around a lot and don't follow the class lesson-per-lesson.

# Introduction
Linux is not a unix operating system. Was designed from the ground up by Linus Torvalds in 1991.
First version released in 1994.
The heart of Linux is the Linux Kernel.

Literally hundreds of Linux distributions. [DistroWatch.com](http://DistroWatch.com) is a place to check these out.
Proprietery Unix systems only run on the servers they are designed for. Linux can run on any hardware.

# Linux Distributions
A distribution is a collection of software and applications bundled together and distributed as a complete system.
It's a curated collection of software that works well together.

All distros have the linux kernel in common.

## RedHat
RedHat Enterprise Linux and Ubuntu are the most popular in IT.

RedHat is usually a more "enterprise" version of Linux that you have to pay a licencing fee to use.
CentOS is a RedHat derivative that is free. It's basically RedHat rebranded with CentOS logos.

## Ubuntu
Usually used by cloud based or startups or smaller web-based platforms.


All Linux concepts are universal, with small differences.


# Getting Connected
SSH is the replcement for TelNet.



# SSH-ING To a VirtualBox Linux Distro

A good reference can be found in [this gist](https://gist.github.com/wacko/5577187).

1. With your VM shut down, go to Virtualbox > Preferences > Network > Host-only Networks and click the little "+" flag.
A network called "vboxnet0" should appear.
2. In the Manager window, click on the VM and then Settings > Network > Adapter2 and select "host-only network". It should give you the opportunity to select "vboxnet0".
3. On your linux distro in a terminal, run ifconfig and find the address for eth1. This was already set up in the CentOS image I used. For Ubuntu, running ifconfig actually showed the ethernet network as `enp0s8` with an address of 192.169.56.102
_note_ You may need to make sure openssh-server is installed and running first: [https://help.ubuntu.com/lts/serverguide/openssh-server.html]
4. On the host machine, ssh [user]@[address]


# Day 2: Linux directory structure

### Common directories
These directories repeat in the /usr and /opt directories.
In looking up the difference between /usr/local and /opt/appname or /opt/company/appname, a common idea seems to be that /usr/local is a place for in-house maintained software?
Files under /usr are shareable between OS instances, although rarely done in Linux.


/       Root. The lowest level directory - all directories branch off of root
/bin    Binary and executable files
/etc    System configuration files
/home   Home directories for different users
/opt    Optional third party software, not bundled with the OS
/tmp    Temporary space. Typically cleared on reboot. Don't put stuff here you want to keep after reboot
/usr    User related programs. You'll find binaries in here as well
/var    Variable data...things that change often. Logfiles, etc.

### Other directories
/boot   Files needed to boot the OS
/cdrom  Mounting point for media
/cgroup Control groups heirarchy
/dev    Device files, typically controlled by the operating system and admins
/lib    System libraries
/sbim  system admin binaries

## SHELL
The GUI is technically a shell. Obviously the CLI is as well.
A shell is just a program that takes your commands and executes them.

The `$` sign in a command line prompt means you're a regular user.
The `#` means you're the root user.
The `~` represents your home directory.

You need root access to install, start, stop applications that don't reside inside your user directory.

## Linux Commands
Most commands are lowercase. Commands are case sensitive.

ls    - list directory contents
cd    - change directory
pwd   - present working directory (print working directory?)
cat   - concatenate and display files
echo  - displays arguments to the screen
man   - displays online manual (man pages)
exit  - exits shell or logs out if you've changed users

ls -l = long list

_NOTE_ I should check out the man pages for some of these basic commands. There are some extensive abilities in simple commands like `ls` or `cd`.

##Path Variable
Path controls the command search path. This dictates where linux looks for the command you typed out, such as `ls`.
Contains list of directories separated by a colon.
Searches in order and executes the first it comes across in the path.

_AHA!_ The reason you have to type `./command` to execute a command in the current directory is that the current directory is not in the `$PATH` variable. You have to explicitly point to the command you want to execute if it's not in the `$PATH` variable.

### cd
`cd -` takes you to the last directory you were in.

### which 
`which [command]` command tells you which command the system would choose to run, based on the `$PATH` variable.

### mkdir
Passing the `-p` flag allows it ot make missing directories if you're creating something a few directories deep.

```
mkdir test
mkdir -p test/test2/test3
```
Without the `-p` flag, the above would throw an error.

## Files

### ls
To see hidden files, you need to add `-a`.
`ll` is basically shorthand for `ls -la`.
`-F` appends a character to a file or dirname that tells you what it is.
`@` is a link
`-t` sort by time
`-r` reverse time order
`-R` list directory contents recursively

`tree` shows the directory structure.

#### spaces in file or directory names
1. Stop doing it!
2. Encapsulate directory in quotes (single or double)
3. Escape spaces with a backslash

# File and Directory Permissions
l = symlink
'-' = file
d = directory

Execute permissions (x) give you ability to see owner, modified date, and other metadata.

Perms can be applide to User(u) Group(g) Other(o) and All(a)(ugo)

Every user is in at least one group, but can belong to many.

`groups` shows you groups you're a member of. Passing an ID of another user gives you groups they are in.

Characters in the file metadata are divided into threes (minus the first character, which is the file type):
type, user perms, group perms, other(all) perms
x   |   xxx      |    xxx     |     xxx

Permissions are also called "modes". Thus `chmod` is change mode.
Modes can be represented symbolically or numerically (octal mode, based in binary)

r = 4
w = 2
x = 1

Add together to set permissions per group.
rwxrw---x would be: 761

It's called "octal" because 4, 2, and 1 (and 0) can add up to 0 - 7.

Consider using groups rather than 777 or 666 permission modes.

Permissions in a directory affect the files in the directory.

### File creation mask
Default would be 777 for dirs and 666 for files, unless change by a sysadmin.
Decides default perms on files created. `umask` does the opposite of chmod. It says what permissions CANNOT be applied.


### File contents
`cat`
`more` scroll through files
`less` like more, but with more features
`head` display first 10 lines, pass `-n` to change number of lines
`tail` default see last 10 lines. `-f` follow file as it's modified

## Finding files and directories
`find [path...] [expression]` finds things recursively. You can give it a pattern with `-name`.
Has a bunch of options you can read about in man pages.

`-exec` option is a way to pass commands to the contents of the find command. Escape the ending semicolon.

### counting all lines in a directory and subdirectories
Trial 1:
`find . -type f | sed ‘s/^/“/g’ | sed ‘s/$/“/g’ | xargs wc -l`

Trial 2:
`find . -type f -print0 | xargs -0 wc -l`
The `print0` command sets the word separator to a null character, which helps to eliminate problems with spaces being interpreted as separate words in filenames.

Trial 3:
`find . -type f -exec wc -l {} +`

Ended up using:
`( find ./ -type f -print0| xargs -0 cat ) | wc -l`
(Gives you single line of output)

#### locate
Works off of indexes updated daily. Won't pick up latest changes.
`(locate -0 "/Users/danielmower/projects/courses/*.md" | xargs -0 cat )| wc -l`

You can benchmark locate vs time:
`time (find . -regex ".*\.md" -print0 | xargs -0 cat) | wc -l`
`time (locate -0 "/Users/danielmower/projects/courses/*.md" | xargs -0 cat )| wc -l`

### CP
`cp -r` recursive copy. Will only work on directories with a `-r`

### Sort
Sorts lines in file.

### tar
archive a directory

### du
`du` estimate file usage
`du -h` show in human readable format

Zipped tarfiles are usually appended with .tgz, or .tar.gz.

## Wildcards
Globbing is expanding a wildcard patter into a list of files and/or directories.

Thisis fairly common regex stuff.

`?` matches exactly one character.
`[]` include characters, matching all in any order.
`[a-z]` range, works with digits as well

When deleting with a wildcard matcher, test which files will be deleted with the `ls` command first.

There is a bunch of stuff in here that I probably won't need to memorize.

#IO

Linux thinks of practically everything as a file.

IO are streams, but are represented as file handles.

Standard Input (stdin): file handle the system reads to get input from you.
Standard Output (stdout): processes write information to this handle.
Standard Error (stderr): processes write error information here.

`>` redirects standard output from a command to a file. Overwrites existing contents.
`>>` Redirects standard output to a file, appending to existing contents.
`<` redirects input from a file to a command.

To ignore output point to the null device at `/dev/null`.

To link file descriptors, use the `&` symbol. It essentially means link to an existing stream.

##File descriptors:
`0` is stdin redirection
`1` is stdout redirection
`2` is stderr redirection

This [stackoverflow explanation](https://stackoverflow.com/questions/2341023/what-does-the-ampersand-indicate-in-this-bash-command-12) helps a lot:
--------------------------------------
2>&1 redirects standard error (file handle 2) to the same file that standard output (file handle 1) is currently going to.

It's also a position-dependent thing so:

`prog >x 2>&1 >y`

will actually send standard error to x and standard output to y as follows:

- Connect standard output to x;
- Then connect standard error to same as current standard output, which is x;
- Then connect standard output to y;
--------------------------------------------



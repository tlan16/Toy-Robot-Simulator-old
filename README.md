Welcome to the Toy-Robot-Simulator wiki!

# Toy Robot Simulator

## Problem:

```
The application is a simulation of a toy robot moving on a square tabletop,
of dimensions 5
units x 5 units.
There are no other obstructions on the table surface.
The robot is free to roam around the surface of the table, but must be
prevented from falling to
destruction. Any movement that would result in the robot falling from the
table must be prevented, however further valid movement commands
must still be allowed.
Create an application that can read in commands of the following form -
PLACE X,Y,F
MOVE
LEFT
RIGHT
REPORT
PLACE will put the toy robot on the table in position X,Y and facing
NORTH, SOUTH, EAST or
WEST.
The origin 0,0 can be considered to be the SOUTH WEST most corner.
The first valid command to the robot is a PLACE command, after that, any
sequence of
commands may be issued, in any order, including another PLACE
command. The application
should discard all commands in the sequence until a valid PLACE
command has been
executed.
```

```
MOVE will move the toy robot one unit forward in the direction it is
currently facing.
LEFT and RIGHT will rotate the robot 90 degrees in the specified direction
without changing
the position of the robot.
REPORT will announce the X,Y and F of the robot. This can be in any form,
but standard
output is sufficient.
A robot that is not on the table can choose the ignore the MOVE, LEFT,
RIGHT and REPORT
commands.
Input can be from a file, or from standard input , as the developer chooses.
Provide test data to exercise the application. (file input commands.txt)
```
## Constraints

The toy robot must not fall off the table during movement. This also includes
the initial
placement of the toy robot.
Any move that would cause the robot to fall must be ignored.
Example Input and Output:
a)
PLACE 0,0,NORTH
MOVE
REPORT
Output: 0,1,NORTH
b)
PLACE 0,0,NORTH
LEFT
REPORT
Output: 0,0,WEST


## Tech stack
1. typescript
1. mocha with chai
1. packages managed by pnpm
1. prettier
1. editor config
1. eslint
1. docker and docker compose

## Features
1. Tests can be performed via docker.

## Local Development
1. install nvm or use specified node version described in [.nvmrc](.nvmrc).
1. use package manager `yarn` to install node dependencies.
1. run `yarn start`.

## Cloud runtime environment
Please refer to [Dockerfile](docker/Dockerfile).

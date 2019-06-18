# This is a collection of my current BitBurner scripts.
  Please check out my scripts, and feel free to download them.  If you find them useful, 
  drop me a note!  Please check out [BitBurner HERE](https://danielyxie.github.io/bitburner)  

## A note on Automation
  I currently do not really like EVERYTHING being automated.  There are plenty of available
  BITBURNER script repositories, and browsing these, I was able to learn enough to write some
  of my own scripts, as well as modify others.  I did not want to create bots that do 
  it all for me.  I wanted a way to create a smart script, and then push it out to all
  servers.  I wanted to automate the buying of servers based on money.  Not sure where this
  adventure will take me, but I am loving this game!

**mapServer.js** - This takes NO arguments.  Run it and it will map servers to a text file.

**rootAll.js:** This will use your file from mapServer and attempt to root all of them.
                It will use whatever EXEs you currently have along with your Hack Level.
                It will also figure out the best server to currently target.

**purchaseServers.js:** This will automatically purchase servers for you.  It will 
                        calculate the RAM and cost needed to purchase, and will remove 
                        lesser servers.

**updateServers.js:** This takes 2 arguments, a script name, and a target.  It will then use
                      your purchased servers to run that script name against that target.
                      When running this, it will kill any processes already running on your
                      pservers, then send the new script to the pservers and then execute.
                      This automatically calculates the number of threads needed.

**smartHack.js:** This is my attempt at a smart hacking script.  It determines the security 
                  level and compares it against the threshhold.  It will weaken if the 
                  security level is higher.  Then it determines if the money is 50% of the 
                  max.  If not, it will grow.  Finally, it hacks.  It takes one argument 
                  which is the server to hack.  This is automatically passed to it, should
                  you use it along with updateServers.

**leechHack.js:** This is the same as the above smartHack, only it has been overridden to 
                  ignore the money on the server, and will always weaken, or hack.  This
                  takes one argument which is the server to hack.  This is automatically 
                  passed to it, should you use it with updateServers.

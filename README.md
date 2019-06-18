# This is a collection of my current BitBurner scripts.

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

**smartHack.js:** This is my attempt at a smart hacking script.  It determines the security 
                  level and compares it against the threshhold.  It will weaken if the 
                  security level is higher.  Then it determines if the money is 50% of the 
                  max.  If not, it will grow.  Finally, it hacks.

**leechHack.js:** This is the same as the above smartHack, only it has been overridden to 
                  ignore the money on the server, and will always weaken, or hack.

export async function main(ns) {
    ns.clear("nukedServers.txt");

    const myHackLevel = ns.getHackingLevel();
    var bestTargetIndex = 1;
    var bestTargetScore = 0;
    const rows = ns.read("servers.txt").split("\r\n");

    const portBusters = ['BruteSSH.exe', 'FTPCrack.exe', 'relaySMTP.exe', 'HTTPWorm.exe', 'SQLInject.exe'];
    var numBusters = 0;
    for (let i = 0; i < portBusters.length; i++) {
        if (ns.fileExists(portBusters[i], "home")) {
            ns.tprint(portBusters[i] + " exists");
            ++numBusters;
        } else {
            ns.tprint(portBusters[i] + " missing");
        }
    }


    for (let i = 0; i < rows.length; ++i) {
        var serverData = rows[i].split(',');
        if (serverData.length < 7) break; //Ignore last blank row

        var svName = serverData[0];
        // refresh target-data, in case an old file has been read
        var svRamAvail = ns.getServerRam(svName)[0];
        var svPortsNeeded = ns.getServerNumPortsRequired(svName);
        var svHackLevel = ns.getServerRequiredHackingLevel(svName);

        if (!(ns.hasRootAccess(svName)) &&
            (numBusters >= svPortsNeeded) &&
            (myHackLevel >= svHackLevel)) {

            if (ns.fileExists('BruteSSH.exe')) ns.brutessh(svName);
            if (ns.fileExists('FTPCrack.exe')) ns.ftpcrack(svName);
            if (ns.fileExists('relaySMTP.exe')) ns.relaysmtp(svName);
            if (ns.fileExists('HTTPWorm.exe')) ns.httpworm(svName);
            if (ns.fileExists('SQLInject.exe')) ns.sqlinject(svName);
            ns.nuke(svName);
            ns.tprint(svName + " nuked!");
        }

        if (ns.hasRootAccess(svName)) {
            var svMaxMoney = ns.getServerMaxMoney(svName);
            var svMinSec = ns.getServerMinSecurityLevel(svName);
            var svGrowRt = ns.getServerGrowth(svName);
            var svExecTime = ns.getHackTime(svName);
            var svScore = (100 - (svMinSec * 1.5)) * svMaxMoney * svGrowRt / svExecTime;

            if (svScore > bestTargetScore) {
                bestTargetScore = svScore;
                bestTargetIndex = i;
            }
            if (svRamAvail > 8 && svMaxMoney > 0) {
                ns.write("nukedServers.txt", svName + ",");
            }
        }

        await ns.sleep(100);
    }
    ns.write("best_target.txt", rows[bestTargetIndex], "w");
    ns.tprint("Best target:" + rows[bestTargetIndex]);
    
    var runNextScript = await ns.prompt("Do you want to update the nuked Servers?");
    if (runNextScript) {
        await ns.run("7_updateServers.ns");
    }
}

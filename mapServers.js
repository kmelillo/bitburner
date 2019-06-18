export async function main(ns) {
    var servers = ["home"];
    ns.clear("servers.txt");
    for (let i = 0; i < servers.length; ++i) {
        var hostname = servers[i];
        ns.print(hostname + " logged.");
        ns.write("servers.txt", hostname +
            "," + ns.getServerRam(hostname)[0] +
            "," + ns.getServerNumPortsRequired(hostname) +
            "," + ns.getServerRequiredHackingLevel(hostname) +
            "," + ns.getServerMaxMoney(hostname) +
            "," + ns.getServerMinSecurityLevel(hostname) +
            "," + ns.getServerGrowth(hostname) +
            "\r\n");

        var newScan = ns.scan(hostname);
        for (let j = 0; j < newScan.length; j++) {
            if (servers.indexOf(newScan[j]) == -1) {
                servers.push(newScan[j]);
            }
        }
    }
    ns.tprint("Network mapped with " + servers.length + " servers.");
}

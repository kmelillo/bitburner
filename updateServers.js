export async function main(ns) {
	const scriptName = ns.args[0];
	const target = ns.args[1];
	var threads = 0;
	var i = 0;
	var current = '';
	var hRAM = 0;
	var sCost = 0;

	// kill current processes on all pserv-## servers
	for (i=0; i < ns.getPurchasedServerLimit(); i++) {
		current = "pserv-" + i;
		if (ns.serverExists(current)) {
            ns.killall(current);
            await ns.sleep(1500);
            ns.tprint('Killing all processes on ' + current);
		}
	}
	await ns.sleep(1500);

    // copy and execute script for target on all pserv-## servers
    for (i=0; i < ns.getPurchasedServerLimit(); i++) {
		current = "pserv-" + i;
		if (ns.serverExists(current)) {
            ns.scp(scriptName, current);
            hRAM = ns.getServerRam(current);
            sCost = ns.getScriptRam(scriptName,current);
            threads = Math.floor(hRAM[0] / sCost);
            await ns.exec(scriptName, current, threads, target);
            ns.tprint('Starting ' + scriptName + ' on ' + current + ' (Target:' + target + ')');
            await ns.sleep(1500);
		}
	}

}

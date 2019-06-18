export async function main(ns) {
	const scriptName = ns.args[0];
	const target = ns.args[1];
	const threads = 6;
	var i = 0;
	var current = '';

	// kill current processes on all pserv-## servers
	for (i=0; i < ns.getPurchasedServerLimit(); i++) {
		current = "pserv-" + i;
		if (ns.serverExists(current)) {
            ns.killall(current);
            await ns.sleep(3000);
            ns.tprint('Killing all processes on ' + current);
		}
	}

    // copy and execute script for target on all pserv-## servers
    for (i=0; i < ns.getPurchasedServerLimit(); i++) {
		current = "pserv-" + i;
		if (ns.serverExists(current)) {
            ns.scp(scriptName, current);
            await ns.exec(scriptName, current, threads, target);
            ns.tprint('Starting ' + scriptName + ' on ' + current + ' (Target:' + target + ')');
            await ns.sleep(3000);
		}
	}

}

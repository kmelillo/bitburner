export async function main(ns) {
    ns.disableLog('ALL');
    const sThresh = 10; // If security level is greater than this, it will weaken the server.
    const mThresh = 0.50; // If money is less than 50% of the max, it will grow the server.
    const target = ns.args[0];
    const tMaxMoney = ns.getServerMaxMoney(target);
    const wMessage = 'Server security too strong - We will attempt to WEAKEN.';
    const gMessage = 'Server is too poor - We will attempt to GROW.';
    const hMessage = 'Server is ripe!  We will attempt to HACK.';
    var message = '';
    var loop = 0;
    var action = 0;

    while (true) {
        var tSecLevel = ns.getServerSecurityLevel(target);
        var dSecLevel = tSecLevel.toFixed(2);
        var tMoney = ns.getServerMoneyAvailable(target);
        var xMoney = Math.round(tMoney);
        var dMoney = xMoney.toLocaleString();
        var xMaxMoney = Math.round(tMaxMoney);
        var dMaxMoney = xMaxMoney.toLocaleString();
        var xMin = (tMaxMoney * 0.5);
        var mMin = xMin.toLocaleString();
        var wTime = ns.getWeakenTime(target).toFixed(1);
        var gTime = ns.getGrowTime(target).toFixed(1);
        var hTime = ns.getHackTime(target).toFixed(1);
        loop++;
        if (tSecLevel > sThresh) { 
            message = wMessage;
            action = 1;
            }
        else if ((ns.getServerMoneyAvailable(target) / tMaxMoney) < mThresh) { 
            message = gMessage;
            action = 2;
            }
        else { 
            message = hMessage ;
            action = 3;
            }
        ns.print('Current Target:  ' + target);
        ns.print('Security Level:  ' + dSecLevel);
        ns.print('Threshhold:        SEC(' + sThresh + ') $$$ (' + mMin + ')');
        ns.print('Time to:           Hack(' + hTime + ')  Weaken (' + wTime + ')  Grow(' + gTime +')');
        ns.print('Money Available: ' + dMoney + ' Max(' + dMaxMoney + ')');
        ns.print('Status: ' + message);
        ns.print('Loops: ' + loop);

        if (action == 1) { await ns.weaken(target) }
        else if (action == 2) { await ns.grow(target) }
        else { await ns.hack(target) }
        //if (action == 'W') { await ns.weaken(target) }
        //else if (action == 'G') { await ns.grow(ns.args[0]) } 
        //else if (action == 'H') { await ns.hack(ns.args[0]) }
        //else { message = 'Something is wrong!  -  Doing NOTHING!' } 
        await ns.sleep(1000);
        ns.clearLog();
    }
}

function FindProxyForURL(url, host) {
 
    // Cerberus
    var cerberus_bastion_proxy = "SOCKS5 127.0.0.1:8080";
    if ( host == "vsphere.ncsa.illinois.edu" )
        return cerberus_bastion_proxy;
    if ( host == "netdot.ncsa.illinois.edu" )
        return cerberus_bastion_proxy;
 
    // ACHE
    var ache_bastion_proxy = "SOCKS5 127.0.0.1:8081";
    if ( host == "ache-vcenter.internal.ncsa.edu" )
        return ache_bastion_proxy;
    if ( host == "ache-git.ncsa.illinois.edu" )
        return ache_bastion_proxy;
 
    // linux.ncsa - see https://wiki.ncsa.illinois.edu/x/IQB6AQ
    var linux_proxy = "SOCKS5 127.0.0.1:8082";
 
    // go through proxy for NCSA and campus sites
    if (
        isPlainHostName(host) ||
        dnsDomainIs(host, ".illinois.edu") ||
        dnsDomainIs(host, ".uillinois.edu") ||
        dnsDomainIs(host, ".uiuc.edu") ||
        dnsDomainIs(host, ".ncsa.edu")
    ) return linux_proxy;
     
    // go through proxy if DNS does not resolve locally
    if ( isResolvable(host) ) {
        return "DIRECT";
    } else {
        return linux_proxy;
    }
 
    // No match
    return "DIRECT";
}

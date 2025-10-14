// Classic 90s JavaScript - Fantasy Fantasy League
// Copyright 1999-2025 - All Rights Reserved

// Navigation hover effects with classic status messages
document.addEventListener('DOMContentLoaded', function() {
    console.log("Fantasy Fantasy League v1.0 - Initialized!");
    console.log("System Status: All magical systems operational");
    
    // Classic browser detection
    var browserInfo = getBrowserInfo();
    console.log("Browser detected: " + browserInfo);
});

function getBrowserInfo() {
    var browser = "Unknown Browser";
    if (navigator.userAgent.indexOf("Chrome") > -1) browser = "Chrome";
    else if (navigator.userAgent.indexOf("Firefox") > -1) browser = "Firefox";
    else if (navigator.userAgent.indexOf("Safari") > -1) browser = "Safari";
    else if (navigator.userAgent.indexOf("Edge") > -1) browser = "Edge";
    else if (navigator.userAgent.indexOf("MSIE") > -1) browser = "Internet Explorer";
    
    return browser;
}

// Classic visitor counter (fake but nostalgic!)
function updateVisitorCount() {
    var count = localStorage.getItem('visitorCount') || 12345;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    
    console.log("Visitor #" + count + " has entered the realm!");
}

updateVisitorCount();
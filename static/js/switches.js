var switchQuality = document.getElementById('switch-quality');
var switchBurnValue = document.getElementById('switch-burnValue');
var switchTag = document.getElementById('switch-tag');
                
switchBurnValue.addEventListener('change', function () {
    toggleColumnVisibility('th-burnValue', 'td-burnValue');
});

switchTag.addEventListener('change', function () {
    toggleColumnVisibility('th-tag', 'td-tag');
});

switchQuality.addEventListener('change', function () {
    toggleColumnVisibility('th-quality', 'td-quality');
});
                
function toggleColumnVisibility(thId, tdClass) {
    var th = document.getElementById(thId);
    var tdList = document.getElementsByClassName(tdClass);
                
    if (th && tdList) {
        var isSwitchOn = document.getElementById('switch-' + thId.split('-')[1]).checked;
                
        th.style.display = isSwitchOn ? 'table-cell' : 'none';
                
        for (var i = 0; i < tdList.length; i++) {
            tdList[i].style.display = isSwitchOn ? 'table-cell' : 'none';
        }
    }
}
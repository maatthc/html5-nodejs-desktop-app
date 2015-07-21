window.dash = window.dash || {};
dash.saveSetting = function(uid, settings) {
    // upsert
    localStorage.setItem('settings', JSON.stringify(settings));
        return 1;
};

Quartz.registerComponent('splash-screen', {
	QZDOM: function(){
		return `<splash-screen class="translucid">
			<div class="bg"></div>

			<div class="music-wrapper">
				<div class="equalizer-icon"><div></div><div></div><div></div><div></div></div>
				<span class="song">WikiLeaks and the Need for Free Speech</span> <span class="artist">&ndash; Dan Bull</span>
			</div>

			<div class="splash-name">
				<span class="thin">parti</span><span class="bold">pirate</span><span class="thin">.org</span>
			</div>

			<div class="splash-text">
				On arrive très vite.<br>
				00:00:00
			</div>


		</splash-screen>`;
	},
	_active: false,
	_settings: {
		'translucid': false,
		'music': true,
		'text': 'On arrive très vite.',
		'countdown': 0, //todo date
		'name': '<span class="thin">parti</span><span class="bold">pirate</span><span class="thin">.org</span>'
	},
	QZinit: function(){
		this.QZ.info('initialized');

		this.toggleSplash(true);
		this.QZ.interval('flip', 4*1000, function(){
			this.toggleSplash(!this._active);
		});

		this.QZ.on('settings', function(data){
			this._settings = data;
			this.updateDisplay();
		});

		this.QZ.send('get-settings');
		this.updateDisplay();
	},
	updateDisplay: function(){
		var domElm = document.querySelector('splash-screen');
		if (this._settings.translucid)
			domElm.classList.add('translucid');
		else
			domElm.classList.remove('translucid');

		if (this._settings.music){
			domElm.querySelector('.music-wrapper').classList.add('visible');
		}
		else {
			domElm.querySelector('.music-wrapper').classList.remove('visible');
		}
		// TODO start or stop music if splash is active and depending on settings and current playing state

		domElm.querySelector('.splash-text').innerHTML = `${this._settings.text}<br>00:00:00`;
		domElm.querySelector('.splash-name').innerHTML = this._settings.name;
	},
	toggleSplash: function(active){
		this._active = active;

		if (active){
			document.querySelector('splash-screen').classList.add('active');
		} else {
			document.querySelector('splash-screen').classList.remove('active');
		}

		this.QZ.broadcastEvent('splash', {'active': active});
	},
});



/*


*/
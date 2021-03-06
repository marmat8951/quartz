from . import _QZComponent

class SplashScreen(_QZComponent.QZComponent):
	"""docstring for SplashScreen"""
	def __init__(self):
		super(SplashScreen, self).__init__(QZCOMPONENT['name'])

		# Initial state
		self.QZset_state({
			"active": False,
			"translucid": False,
			"music": False,
			"text": 'On arrive très vite.',
			"countdown": "",
			"name": '<span class="thin">parti</span><span class="bold">pirate</span><span class="thin">.org</span>'
		})

		# Handlers
		def fn(data):
			# A bit hackish but we don't want to push the state change to every client for the toggle, because they get a toggle event already.
			self.QZget_state()['active'] = data['active']

			self.QZsend('toggle', {'active': data['active']})
		self.QZon('toggle_request', fn)
		

QZCOMPONENT = {
	"name": "splash-screen",
	"class": SplashScreen
}

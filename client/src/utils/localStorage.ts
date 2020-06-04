
class LS {
	private key: string;
	constructor() {
		this.key = 'access_token'
	}
	getToken () {
		return window.localStorage.getItem(this.key)
	}
	setToken(token:string) {
		window.localStorage.setItem(this.key, token)
	}
	removeToken () {
		window.localStorage.removeItem(this.key)
	}
	static get ls () {
		return new LS()
	}
}
export default LS.ls

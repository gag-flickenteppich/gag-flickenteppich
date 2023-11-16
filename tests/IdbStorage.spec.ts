import { describe, expect, test, mock } from 'bun:test'
import { IdbStorage } from '../src/Storage'

/*


idbStorage
	.openDatabase()
	.then(() => idbStorage.writeData({ name: 'John', age: 25 }))
	.then((key) => {
		console.log(`Data written with key: ${key}`)
		return idbStorage.readData(key)
	})
	.then((data) => {
		console.log('Read data:', data)
	})
	.catch((error) => {
		console.error(error)
	})
	*/

describe('IdbStorage', () => {
    test('creation throws no error', () => {
        const constructorCall = () =>
            new IdbStorage('YourDatabaseName', 'YourObjectStoreName')
        expect(constructorCall).not.toThrow()
    })
})

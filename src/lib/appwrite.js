import { Client, Account, Databases } from 'appwrite'

export const client = new Client()

client
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject('67ae4e950016966e8638')

export const account = new Account(client)
export const databases = new Databases(client)

export const DATABASE_ID = '67ae4f1b0004f790e7b5'
export const COLLECTION_ID = '67ae5007000bd8263a35'

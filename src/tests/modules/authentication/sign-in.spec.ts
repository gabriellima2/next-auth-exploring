import { test, expect } from '@playwright/test'

test.describe('Sign In', () => {
	test.describe('Validation', () => {
		test('should thrown an error when submitting with empty fields', async ({ page }) => {
			await page.goto('/')

			await page.getByLabel('Email').fill('')
			await page.getByLabel('Password').fill('')
			await page.getByRole('button', { name: 'Login' }).click()

			await expect(page.getByText('The email field is required')).toBeVisible()
			await expect(page.getByText('The password field is required')).toBeVisible()
		})
		test('should thrown an error when submitting with invalid fields', async ({ page }) => {
			await page.goto('/')

			await page.getByLabel('Email').fill('some_invalid_email@com')
			await page.getByLabel('Password').fill('pwd')
			await page.getByRole('button', { name: 'Login' }).click()

			await expect(page.getByText('Please, type a valid email')).toBeVisible()
			await expect(page.getByText('Password must contain at least 6 characters')).toBeVisible()
		})
	})
	test.describe('Redirect', () => {
		test('should redirect to home page when logged in as admin', async ({ page }) => {
			const credentials = {
				name: 'System Admin',
				email: 'admin@domain.com',
				password: '000000',
			}

			await page.goto('/')

			await page.getByLabel('Email').fill(credentials.email)
			await page.getByLabel('Password').fill(credentials.password)
			await page.getByRole('button', { name: 'Login' }).click()
			await page.waitForLoadState('networkidle')

			await expect(page.getByText(`Hello ${credentials.name}!`)).toBeVisible()
		})
		test('should redirect to home page when logged in as user', async ({ page }) => {
			const credentials = {
				name: 'Common User',
				email: 'user@domain.com',
				password: '000000',
			}

			await page.goto('/')

			await page.getByLabel('Email').fill(credentials.email)
			await page.getByLabel('Password').fill(credentials.password)
			await page.getByRole('button', { name: 'Login' }).click()
			await page.waitForLoadState('networkidle')

			await expect(page.getByText(`Hello ${credentials.name}!`)).toBeVisible()
		})
	})
	test.describe('Logout', () => {
		test('should redirect to sign-in page when logout', async ({ page }) => {
			const credentials = {
				name: 'Common User',
				email: 'user@domain.com',
				password: '000000',
			}

			await page.goto('/')

			await page.getByLabel('Email').fill(credentials.email)
			await page.getByLabel('Password').fill(credentials.password)
			await page.getByRole('button', { name: 'Login' }).click()
			await page.waitForLoadState('networkidle')

			await page.getByRole('button', { name: 'Logout' }).click()
			await page.waitForLoadState('networkidle')

			await expect(page.getByText('Welcome Back!')).toBeVisible()
		})
	})
})

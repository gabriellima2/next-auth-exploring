import { test, expect } from '@playwright/test';

test.describe('Sign In', () => {
	test.describe('Validation', () => {
		test('should thrown an error when submitting with empty fields', async ({ page }) => {
			await page.goto('/');

			await page.getByLabel('Email').fill('')
			await page.getByLabel('Password').fill('')
			await page.getByRole('button', { name: 'Login' }).click()

			await expect(page.getByText('The email field is required')).toBeVisible()
			await expect(page.getByText('The password field is required')).toBeVisible()
		});
		test('should thrown an error when submitting with invalid fields', async ({ page }) => {
			await page.goto('/');

			await page.getByLabel('Email').fill('some_invalid_email@com')
			await page.getByLabel('Password').fill('pwd')
			await page.getByRole('button', { name: 'Login' }).click()

			await expect(page.getByText('Please, type a valid email')).toBeVisible()
			await expect(page.getByText('Password must contain at least 6 characters')).toBeVisible()
		});
	})
})

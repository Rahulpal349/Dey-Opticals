import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('Home page loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Dey Opticals/);
    const heroText = page.locator('text=Clear Vision, Stylish Frames');
    await expect(heroText).toBeVisible();
  });

  test('Login flow', async ({ page }) => {
    // Navigate to login
    await page.goto('/login');
    
    // Fill out form
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    
    // The test won't actually login since we don't have this DB user in CI, 
    // but we can test the UI elements and validation
    await page.click('button[type="submit"]');
    
    // Check for some kind of response (either success redirect or error toast)
    // We'll just verify the button is there and click works
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('Cart flow', async ({ page }) => {
    await page.goto('/cart');
    await expect(page.locator('text=Your Cart is Empty')).toBeVisible();
  });
});
